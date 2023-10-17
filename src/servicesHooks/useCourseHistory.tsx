import { useEffect, useMemo, useState } from "react";
import { useUser } from "../hooks/useUser";
import { GetCourseHistoryParams, students } from "../service/students";
import { CourseHistory, CourseHistoryByPeriod } from "CourseHistory";

export function useCourseHistory() {
  const [courseHistory, setCourseHistory] = useState<CourseHistory>();
  const [filteredList, setFilteredList] = useState<CourseHistoryByPeriod[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string[]>([]);

  const { user } = useUser();

  useEffect(() => {
    setLoading(true);
    students
      .getCourseHistory({
        studentRegistration: user!.user?.studentId
      })
      .then((res) => setCourseHistory(res))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [user]);

  function fetchCourseHistory() {
    setLoading(true);
    students
      .getCourseHistory({
        studentRegistration: user!.user?.studentId
      })
      .then((res) => setCourseHistory(res))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }

  function deleteCourseHistory(courseHistoryId: string) {
    setLoading(true);
    console.log("entrou: " + courseHistoryId)
    students
      .deleteCourseHistory({
        studentRegistration: user!.user?.studentId,
        courseHistoryId: courseHistoryId
      })
      .then((res) => {
        console.log("res:", res);
        setCourseHistory(res);
        filteredList.filter((d) => d.disciplines.filter((dc) => dc.courseHistoryId !== courseHistoryId));
      })
      .catch((error) => {
        error.response
          ? setError(error.response.data.message)
          : setError(error.message)
      })
      .finally(() => setLoading(false));
  }



  return useMemo(() => ({ loading, error, courseHistory, fetchCourseHistory, deleteCourseHistory }), [loading, error, courseHistory, fetchCourseHistory, deleteCourseHistory]);
}
