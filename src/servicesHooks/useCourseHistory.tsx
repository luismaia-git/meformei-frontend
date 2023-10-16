import { useEffect, useMemo, useState } from "react";
import { useUser } from "../hooks/useUser";
import { GetDisciplinesPeriodByStatusParams, GetDisciplinesPeriodTodoParams, students } from "../service/students";
import { university } from "../service/universities";
import { CourseHistory } from "CourseHistory";

export function useCourseHistory() {
  const [courseHistory, setCourseHistory] = useState<CourseHistory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string[]>();

  const { user } = useUser();

  useEffect(() => {
    setLoading(true);
    university
      .getDisciplines(user?.user.curriculumId)
      .then((res) => setData(res))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [user]);

  function getDisciplinesPeriodByStatus(data: GetDisciplinesPeriodByStatusParams) {
    setLoading(true);
    students.getDisciplinesPeriodByStatus(data)
    .then((res) => setDisciplines(res))
    .catch((err) => setError(err))
    .finally(() => setLoading(false));
  }

  function getDisciplinesPeriodTodo(data: { curriculumId: string } & GetDisciplinesPeriodTodoParams) {
    setLoading(true);
    students.getDisciplinesPeriodTodo(data)
    .then((res) => setDisciplines(res))
    .catch((err) => setError(err))
    .finally(() => setLoading(false));
  }



  return useMemo(() => ({ loading, error, data, getDisciplinesPeriodByStatus, getDisciplinesPeriodTodo, disciplines }), [loading, error, data, disciplines]);
}
