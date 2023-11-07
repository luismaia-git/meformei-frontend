import { DisciplineByPeriod } from "Discipline";
import { useEffect, useMemo, useState } from "react";
import { useUser } from "../hooks/useUser";
import { curriculums } from "../service/curriculums";
import { GetDisciplinesPeriodByStatusParams, students } from "../service/students";
import { CourseHistoryRegisterBodyRequest } from "CourseHistory";
import { parseCourseHistoryToRegisterBody } from "../utils/parsers";

export function useDisciplines() {
  const [data, setData] = useState<DisciplineByPeriod[]>([]);
  const [curriculumDisciplines, setCurriculumDisciplines] = useState<CourseHistoryRegisterBodyRequest>();
  const [disciplines, setDisciplines] = useState<DisciplineByPeriod[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string[]>();

  const { user } = useUser();

  useEffect(() => {
    setLoading(true);
    curriculums
      .getDisciplinesToStudent(user?.user.curriculumId)
      .then((res) => {
        setData(res)
        console.log("ANTEEES")
        if(res!= undefined) {
          console.log("antes: ", curriculumDisciplines?.disciplines?.length)
          setCurriculumDisciplines(parseCourseHistoryToRegisterBody(res))
        }
          console.log("alterado: ", curriculumDisciplines?.disciplines?.length)
          console.log("DEPOISSSS")
      })
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

  return useMemo(() => ({ loading, error, data, getDisciplinesPeriodByStatus, disciplines, curriculumDisciplines }), [loading, error, data, disciplines]);
}
