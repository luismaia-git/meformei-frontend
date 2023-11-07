import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { CourseHistory, CourseHistoryByPeriod, CourseHistoryRegisterBodyRequest, CourseHistoryResponse, Discipline, GetDisciplinesResponse, courseHistoryBodyRequest, disciplineResponse } from "CourseHistory";

import { patchCourseHistoryResponse, students } from "../service/students";
import { useUser } from "./useUser";
import { curriculums } from "../service/curriculums";
import { parseCourseHistoryToRegisterBody, parseDisciplinesResponseToCourseHistoryRegisterBodyRequest } from "../utils/parsers";

export interface ICourseHistoryContext {
  loading: boolean,
  error: string[];
  courseHistory?: CourseHistory,
  curriculumDisciplines?: CourseHistoryRegisterBodyRequest,
  fetchCourseHistory: () => void,
  deleteCourseHistory: (courseHistoryId: string) => Promise<void>,
  patchCourseHistory: (courseHistoryId: string, data: any, toFormationPlanList: (goBack: boolean) => void) => Promise<void>,
  postCourseHistory: (semester: number, data: CourseHistoryRegisterBodyRequest, toFormationPlanList: (goBack: boolean) => void) => Promise<void>,
  getDisciplines: () => Promise<disciplineResponse[]>,
  getDisciplinesfromCurriculum: () => Promise<disciplineResponse[]>,
}

const CourseHistoryContext = createContext<ICourseHistoryContext>({} as ICourseHistoryContext);

export function useCourseHistory() {
  return useContext(CourseHistoryContext);
}

export function CourseHistoryContextProvider({ children }: { children: ReactNode }) {
  const [courseHistory, setCourseHistory] = useState<CourseHistory>();
  const [filteredList, setFilteredList] = useState<CourseHistoryByPeriod[]>([]);
  const [curriculumDisciplines, setCurriculumDisciplines] = useState<CourseHistoryRegisterBodyRequest>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string[]>([]);

  const { user } = useUser();

  useEffect(() => {
    if (user) {
      setLoading(true);
      console.log("--------------------------------- useCourseHistory, userEffect")
      students
        .getCourseHistory({
          studentRegistration: user!.user?.studentId
        })
        .then((res) => {
          res.disciplineHistory?.sort((a, b) => a.period - b.period); setCourseHistory(res)
          getDisciplinesfromCurriculum().catch((err) => setError(err))
        })
        .catch((err) => setError(err))
        .finally(() => setLoading(false));
    }

  }, [user]);

  function fetchCourseHistory() {

    setLoading(true);
    console.log("useCourseHistory, fetchCourseHistory")
    students
      .getCourseHistory({
        studentRegistration: user!.user?.studentId
      })
      .then((res) => setCourseHistory(res))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));

  }

  async function deleteCourseHistory(courseHistoryId: string) {
    console.log("useCourseHistory, deleteCourseHistory")
    setLoading(true);

    try {
      await students.deleteCourseHistory({
        studentRegistration: user!.user?.studentId,
        courseHistoryId: courseHistoryId,
      })

      const updatedCourseHistory = { ...courseHistory };

      if (updatedCourseHistory.disciplineHistory && Array.isArray(updatedCourseHistory.disciplineHistory)) {

        const periodIndex = updatedCourseHistory.disciplineHistory.findIndex(
          (period) => period.disciplines.some((discipline) => discipline.courseHistoryId === courseHistoryId)
        );

        if (periodIndex !== -1) {

          updatedCourseHistory.disciplineHistory[periodIndex].disciplines = updatedCourseHistory.disciplineHistory[periodIndex].disciplines.filter(
            (discipline) => discipline.courseHistoryId !== courseHistoryId
          );

          setCourseHistory(updatedCourseHistory);
        }
      }


    } catch (error: any) {
      error.response
        ? setError(error.response.data.message)
        : setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function patchCourseHistory(courseHistoryId: string, data: any, toFormationPlanList: (goBack: boolean) => void) {
    console.log("useCourseHistory, patchCourseHistory")
    console.log("data: ", data)
    setLoading(true);
    try {
      const response = await students.patchCourseHistory({
        studentRegistration: user!.user?.studentId,
        courseHistoryId: courseHistoryId,
        data: data
      })
      const updatedCourseHistory = { ...courseHistory }
      const updatedDiscipline: Discipline = parseResponseToCourseHistory(response)
      const courseHistoryFinal = updateCourseHistory(updatedCourseHistory, response, updatedDiscipline, courseHistoryId);

      setCourseHistory(courseHistoryFinal)
      toFormationPlanList(true);
    } catch (error: any) {
      error.response
        ? setError(error.response.data.message)
        : setError(error.message);
      console.log("error: ", error)
    } finally {
      setLoading(false);
    }
  }

  async function postCourseHistory(semester: number, data: any, toFormationPlanList: (goBack: boolean) => void) {
    setLoading(true);
    toFormationPlanList(false);
    try {
      console.log("data: ", data)
      const response = await students.postCourseHistory({
        studentRegistration: user!.user?.studentId,
        semester: semester,
        data: data
      })
      var updatedCourseHistory = { ...courseHistory }
      
      if (updatedCourseHistory && updatedCourseHistory.disciplineHistory) {
        updatedCourseHistory.disciplineHistory = updatedCourseHistory.disciplineHistory.map((d) => {
          if (d.period == semester) {
            if (response && response.disciplineHistory && response.disciplineHistory[0]) {
              d.disciplines.push(...response.disciplineHistory[0].disciplines!);
            }
          }
          return d;
        });
      }
      // updatedCourseHistory = updatedCourseHistory!.disciplineHistory!.map((d) => { if(d.period == semester) d.disciplines.push(...response!.disciplineHistory![0].disciplines!) })}
      setCourseHistory(updatedCourseHistory)
      // updatedCourseHistory.disciplineHistory?.map((d) => { console.log("period: ", d.period); d.disciplines.map((d) => console.log("discipline: ", d.name)) })
      toFormationPlanList(true);
    } catch (error: any) {
      error.response
        ? setError(error.response.data.message)
        : setError(error.message);
      console.log("error: ", error)
    } finally {
      setLoading(false);
    }
  }

  async function getDisciplines() {
    setLoading(true);
    try {
      if (user?.user.curriculumId) {
        const response = await curriculums.getDisciplines({
          curriculumId: user?.user.curriculumId
        })
        return response.disciplines
      } else {
        throw new Error("Usuário não possui currículo cadastrado")
      }
    } catch (error: any) {
      error.response
        ? setError(error.response.data.message)
        : setError(error.message);
      console.log("error: ", error)
      return [] as disciplineResponse[]
    } finally {
      setLoading(false);
    }
  }

  async function getDisciplinesfromCurriculum() {
    setLoading(true);
    try {
      if (user?.user.curriculumId) {
        const response = await curriculums.getDisciplines({
          curriculumId: user?.user.curriculumId
        })

        const curriculumDisciplines = parseDisciplinesResponseToCourseHistoryRegisterBodyRequest(response)
        setCurriculumDisciplines(curriculumDisciplines)
        return response.disciplines
      } else {
        throw new Error("Usuário não possui currículo cadastrado")
      }
    } catch (error: any) {
      error.response
        ? setError(error.response.data.message)
        : setError(error.message);
      console.log("error: ", error)
      return [] as disciplineResponse[]
    } finally {
      setLoading(false);
    }
  }

  /** Funções Auxiliares */
  function parseResponseToCourseHistory(response: patchCourseHistoryResponse) {
    console.log("duramte");
    console.log("huuuuuummm: ", response.message);

    if (!response.disciplineHistory.discipline || response.disciplineHistory.discipline === undefined) {
      console.log("é nulo");
    } else {
      console.log("não é nulo");
    }

    console.log("hum: ", response.disciplineHistory);
    console.log(" period: " + response.disciplineHistory.semester);

    const updatedDiscipline = {
      id: response.disciplineHistory.discipline.id,
      courseHistoryId: response.disciplineHistory.id,
      name: response.disciplineHistory.discipline.name,
      cod: response.disciplineHistory.discipline.cod,
      menu: response.disciplineHistory.discipline.menu,
      curriculumId: response.disciplineHistory.discipline.curriculumId,
      description: response.disciplineHistory.discipline.description,
      isOptional: response.disciplineHistory.discipline.isOptional,
      prerequisites: response.disciplineHistory.discipline.prerequisites,
      workload: response.disciplineHistory.discipline.workload,
      start: response.disciplineHistory.startTime,
      end: response.disciplineHistory.endTime,
      daysWeek: response.disciplineHistory.daysWeek,
      bibliography: response.disciplineHistory.discipline.bibliography,
      status: response.disciplineHistory.status,
    } as Discipline;

    return updatedDiscipline;
  }

  function updateCourseHistory(updatedCourseHistory: CourseHistory, response: patchCourseHistoryResponse, updatedDiscipline: Discipline, courseHistoryId: string) {
    if (updatedCourseHistory.disciplineHistory && Array.isArray(updatedCourseHistory.disciplineHistory)) {
      updatedCourseHistory.disciplineHistory?.sort((a, b) => a.period - b.period);

      //  remove as disciplinas do período antigo
      // removeOldCourseHistory(updatedCourseHistory, data, courseHistoryId);

      console.log("ANTEEES updatedCourseHistory.disciplineHistory: ", updatedCourseHistory.disciplineHistory.map((d) => { if (d.period == response.disciplineHistory.semester) { console.log("period:", d.period); console.log("disciplinas: ", d.disciplines) }; }))

      updatedCourseHistory.disciplineHistory[response.disciplineHistory.semester - 1].disciplines = updatedCourseHistory.disciplineHistory[response.disciplineHistory.semester - 1].disciplines.filter(
        (discipline) => discipline.courseHistoryId !== courseHistoryId
      );

      const isPeriodChanged = response.disciplineHistory.semester != null
      const isPeriodInArray = updatedCourseHistory.disciplineHistory.some((d) => d.period === response.disciplineHistory.semester);

      if (isPeriodChanged && !isPeriodInArray) {
        // In a new period
        updatedCourseHistory.disciplineHistory.push({
          period: response.disciplineHistory.semester,
          disciplines: [updatedDiscipline],
        });
        updatedCourseHistory.disciplineHistory?.sort((a, b) => a.period - b.period);
      } else {
        // In an existing period
        updatedCourseHistory.disciplineHistory?.map((d) => { d.period == response.disciplineHistory.semester ? d.disciplines.push(updatedDiscipline) : d.disciplines })
      }
      // updatedCourseHistory.disciplineHistory?.map((d) => { console.log("period: ", d.period); d.disciplines.map((d) => console.log("discipline: ", d.name)) })
      console.log("ATUALIZADOOOOOOO: ")
      updatedCourseHistory.disciplineHistory?.map((d) => { console.log("period: ", d.period); d.disciplines.map((d) => console.log("discipline: ", d.name)) })
      return updatedCourseHistory;
    }
  }

  const providerValue = useMemo(() => ({ loading, error, curriculumDisciplines, courseHistory, fetchCourseHistory, deleteCourseHistory, patchCourseHistory, postCourseHistory, getDisciplines, getDisciplinesfromCurriculum }), [loading, error, courseHistory, filteredList]);
  return (
    <CourseHistoryContext.Provider value={providerValue}>
      {children}
    </CourseHistoryContext.Provider>
  );
}
