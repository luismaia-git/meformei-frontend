import { useEffect, useMemo, useState } from "react";
import { useUser } from "../hooks/useUser";
import { GetCourseHistoryParams, students } from "../service/students";
import { CourseHistory } from "CourseHistory";

export function useCourseHistory() {
  const [courseHistory, setCourseHistory] = useState<CourseHistory>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string[]>();

  const { user } = useUser();

  useEffect(() => {
    getCourseHistory({ studentRegistration: user!.user?.registration });
  }, [user]);

  function getCourseHistory(data: GetCourseHistoryParams) {
    setLoading(true);
    students
      .getCourseHistory({
        studentRegistration: user!.user?.registration
      })
      .then((res) => setCourseHistory(res))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }



  return useMemo(() => ({ loading, error, courseHistory, getCourseHistory }), [loading, error, courseHistory, getCourseHistory]);
}
