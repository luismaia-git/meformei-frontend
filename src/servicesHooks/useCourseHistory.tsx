import { CourseHistory, CourseHistoryByPeriod } from "CourseHistory";
import { useEffect, useMemo, useState } from "react";
import { useUser } from "../hooks/useUser";
import { students } from "../service/students";

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

  function teste(courseHistoryId: string, updateScreen : (courseHistoryIdDeleted: string) => void) {
    console.log("entrou: " + courseHistory)
    setLoading(true)
    console.log("cont: " + courseHistory?.disciplineHistory[0].disciplines.length)
    students
      .deleteCourseHistory({
        studentRegistration: user!.user?.studentId,
        courseHistoryId: courseHistoryId
      })
      .then((res) => {
        console.log("res aa:", res);
        updateScreen(courseHistoryId);
      })
      .catch((error) => {
        error.response
          ? setError(error.response.data.message)
          : setError(error.message)
        updateScreen(courseHistoryId);
      })
      .finally(() => setLoading(false),);
  }

  function deleteCourseHistory(courseHistoryId: string) {
    setLoading(true);
    console.log("entrou: " + courseHistory)
    students
      .deleteCourseHistory({
        studentRegistration: user!.user?.studentId,
        courseHistoryId: courseHistoryId
      })
      .then((res) => {
        console.log("res aa:", res);
        // setCourseHistory(res);
        setFilteredList(filteredList.filter((d) => d.disciplines.filter((dc) => dc.courseHistoryId !== courseHistoryId)));
        console.log("res:", filteredList.map((d) => d.disciplines.map((dc) => "" +dc.name + "\n")));
      })
      .catch((error) => {
        error.response
          ? setError(error.response.data.message)
          : setError(error.message)
      })
      .finally(() => setLoading(false));
  }
  return useMemo(() => ({ loading, error, courseHistory, fetchCourseHistory, deleteCourseHistory, filteredList, teste }), [loading, error, courseHistory, filteredList]);
}
