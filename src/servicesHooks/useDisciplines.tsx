import { DisciplineByPeriod } from "Discipline";
import { useEffect, useMemo, useState } from "react";
import { useUser } from "../hooks/useUser";
import { GetDisciplinesPeriodByStatusParams, GetDisciplinesPeriodTodoParams, students } from "../service/students";
import { university } from "../service/universities";

export function useDisciplines() {
  const [data, setData] = useState<DisciplineByPeriod[]>([]);
  const [disciplines, setDisciplines] = useState<DisciplineByPeriod[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string[]>();

  const { user } = useUser();

  useEffect(() => {
    setLoading(true);
    university
      .getDisciplines(user?.user.university.id, user?.user.curriculumId)
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
