import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { CourseHistory, CourseHistoryByPeriod, CourseHistoryOperationType, CourseHistoryRegisterBodyRequest, Discipline, ProgressDataRegister, disciplineResponse } from "CourseHistory";

import { patchCourseHistoryResponse, students } from "../service/students";
import { useUser } from "./useUser";
import { curriculums } from "../service/curriculums";
import { parseCourseHistoryToRegisterBody, parseDisciplinesResponseToCourseHistoryRegisterBodyRequest } from "../utils/parsers";
import { university } from "../service/universities";
import { set } from "react-native-reanimated";
import { showMessage } from "react-native-flash-message";

export interface ICourseHistoryContext {
  loading: boolean,
  error: string[];
  curriculumDisciplines?: CourseHistoryRegisterBodyRequest,
  courseHistory?: CourseHistory,
  additionalHours: number,
  doneWorkload: number,
  inProgressWorkload: number,
  toDoWorkload: number,
  universityAdditionalHours: number,
  universityWorkload: number,
  universityWorkloadWithoutAdditionalHours: number,
  percentageUniversityWorkloadWhithoutAdditionalHours: number,
  percentageUniversityAdditionalHours: number,
  percentageToDoWorkload: number,
  percentageDoneWorkload: number,
  percentageInProgressWorkload: number,
  percentageAdditionalHours: number,
  percentageUnplannedWorkload: number,
  unplannedWorkload: number,
  fetchCourseHistory: () => void,
  deleteCourseHistory: (courseHistoryId: string, workload: number, status: string) => Promise<void>,
  patchCourseHistory: (courseHistoryId: string, data: any, progressData: ProgressData, toFormationPlanList: (goBack: boolean) => void) => Promise<void>,
  postCourseHistory: (semester: number, data: CourseHistoryRegisterBodyRequest, progressData: ProgressDataRegister ,toFormationPlanList: (goBack: boolean) => void) => Promise<void>,
  getDisciplines: () => Promise<disciplineResponse[]>,
  getDisciplinesfromCurriculum: () => Promise<disciplineResponse[]>,
}


interface ProgressData {
  oldStatus: string;
  workload: number;
}

export type postCourseHistoryResponse = {
  disciplineHistory: CourseHistoryByPeriod[];
  message: string;
}


const CourseHistoryContext = createContext<ICourseHistoryContext>({} as ICourseHistoryContext);

export function useCourseHistory() {
  return useContext(CourseHistoryContext);
}

export function CourseHistoryContextProvider({ children }: { children: ReactNode }) {
  const [courseHistory, setCourseHistory] = useState<CourseHistory>();
  const [filteredList, setFilteredList] = useState<CourseHistoryByPeriod[]>([]);
  const [curriculumDisciplines, setCurriculumDisciplines] = useState<CourseHistoryRegisterBodyRequest>();
  const [universityWorkload, setUniversityWorkload] = useState<number>(0);
  const [universityWorkloadWithoutAdditionalHours, setUniversityWorkloadWithoutAdditionalHours] = useState<number>(0);
  const [universityAdditionalHours, setUniversityAdditionalHours] = useState<number>(0);
  const [universityOptionalWorkload, setUniversityOptionalWorkload] = useState<number>(0);
  const [universityRequiredWorkload, setUniversityRequiredWorkload] = useState<number>(0);
  const [doneWorkload, setDoneWorkload] = useState<number>(0);
  const [inProgressWorkload, setInProgressWorkload] = useState<number>(0);
  const [unplannedWorkload, setUnplannedWorkload] = useState<number>(0);
  const [toDoWorkload, setToDoWorkload] = useState<number>(0);
  const [optionalWorkload, setOptionalWorkload] = useState<number>(0);
  const [additionalHours, setAdditionalHours] = useState<number>(0);
  const [percentageUniversityWorkloadWhithoutAdditionalHours, setPercentageUniversityWorkloadWhithoutAdditionalHours] = useState<number>(0);
  const [percentageUniversityAdditionalHours, setPercentageUniversityAdditionalHours] = useState<number>(0);
  const [percentageDoneWorkload, setPercentageDoneWorkload] = useState<number>(0);
  const [percentageInProgressWorkload, setPercentageInProgressWorkload] = useState<number>(0);
  const [percentageToDoWorkload, setPercentageToDoWorkload] = useState<number>(0);
  const [percentageAdditionalHours, setPercentageAdditionalHours] = useState<number>(0);
  const [percentageUnplannedWorkload, setPercentageUnplannedWorkload] = useState<number>(0);
  const [haveUniversityWorkload, setHaveUniversityWorkload] = useState<boolean>(false);
  const [isProgressChanged, setIsProgressChanged] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string[]>([]);

  const { user } = useUser();

  useEffect(() => {
    if (user) {
      setHaveUniversityWorkload(false)
      let doneWorkload2 = 0;
      let inProgressWorkload2 = 0;
      let todoWorkload2 = 0;
      let universityWorkloadWithoutAdditionalHours2 = 0;
      let universityWorkload2 = 0;
      let universityRequiredWorkload2 = 0;
      let universityOptionalWorkload2 = 0;
      let universityAdditionalHours2 = 0;
      let additionalHours2 = 0;
      let unplannedWorkload2 = 0;
      let percentageUniversityWorkloadWhithoutAdditionalHours2 = 0;
      let percentageUniversityAdditionalHours2 = 0;
      let percentageDoneWorkload2 = 0;
      let percentageInProgressWorkload2 = 0;
      let percentageToDoWorkload2 = 0;
      let percentageAdditionalHours2 = 0;
      setLoading(true);
      console.log("--------------------------------- useCourseHistory, userEffect")
      students
        .getCourseHistory({
          studentRegistration: user!.user?.studentId
        })
        .then((res) => {
          res.disciplineHistory?.sort((a, b) => a.period - b.period); setCourseHistory(res)

          console.debug(doneWorkload)
          courseHistory!.disciplineHistory!.map((d) => {
            d.disciplines.map((d) => {
              if (d.workload) {
                if (d.status === "DONE") {
                  doneWorkload2 = doneWorkload2 + d.workload;

                } else if (d.status === "INPROGRESS") {
                  inProgressWorkload2 = inProgressWorkload2 + d.workload
                }
              }
            })
          })
          setDoneWorkload(doneWorkload2)
          setInProgressWorkload(inProgressWorkload2)

          console.log("haveUniversityWorkload: ", haveUniversityWorkload)
          if (!haveUniversityWorkload) {
            university
              .getCourse(user!.user?.university.id)
              .then((res) => {
                setHaveUniversityWorkload(true)
                universityRequiredWorkload2 = res.courses[0].requiredHours
                universityOptionalWorkload2 = res.courses[0].optionalHours
                universityAdditionalHours2 = res.courses[0].extraCurricularHours
                universityWorkloadWithoutAdditionalHours2 = universityRequiredWorkload2 + universityOptionalWorkload2
                universityWorkload2 = universityWorkloadWithoutAdditionalHours2 + universityAdditionalHours2

                setUniversityRequiredWorkload(universityRequiredWorkload2)
                setUniversityOptionalWorkload(universityOptionalWorkload2)
                setUniversityAdditionalHours(universityAdditionalHours2)
                setUniversityWorkloadWithoutAdditionalHours(universityWorkloadWithoutAdditionalHours2)
                setUniversityWorkload(universityWorkload2)
              })
              .catch((err) => setError(err))
          }

          if (doneWorkload2 > 0 || inProgressWorkload2 > 0) {
            let aux = 0
            console.log("doneWorkload2: ", doneWorkload2)
            console.log("inProgressWorkload2: ", inProgressWorkload2)
            console.log("universityWorkloadWithoutAdditionalHours2: ", universityWorkloadWithoutAdditionalHours)
            universityWorkloadWithoutAdditionalHours2 = universityWorkloadWithoutAdditionalHours
            aux = universityWorkloadWithoutAdditionalHours2 - doneWorkload2
            // console.log("aux: ", aux)
            // console.log("inProgressWorkload2: ", inProgressWorkload2)
            todoWorkload2 = aux - inProgressWorkload2
            console.log("subtraido: ", todoWorkload2)
            setToDoWorkload(todoWorkload2)
          } else {
            todoWorkload2 = universityWorkloadWithoutAdditionalHours
            setToDoWorkload(todoWorkload2)
          }

          //horas complementares vai ficar fixo por enquanto
          console.log("uuuuuuuniversityAdditionalHours2: ", universityAdditionalHours)
          unplannedWorkload2 = universityAdditionalHours
          additionalHours2 = 0
          setAdditionalHours(additionalHours2)
          setUnplannedWorkload(unplannedWorkload2)

          percentageUniversityWorkloadWhithoutAdditionalHours2 = 100 / universityWorkloadWithoutAdditionalHours;
          percentageUniversityAdditionalHours2 = 100 / universityWorkload

          percentageDoneWorkload2 = parseFloat((doneWorkload2 * percentageUniversityWorkloadWhithoutAdditionalHours2 / 100).toFixed(2));
          percentageInProgressWorkload2 = parseFloat((inProgressWorkload2 * percentageUniversityWorkloadWhithoutAdditionalHours2 / 100).toFixed(2));
          percentageToDoWorkload2 = parseFloat((todoWorkload2 * percentageUniversityWorkloadWhithoutAdditionalHours2 / 100).toFixed(2));
          percentageAdditionalHours2 = parseFloat((additionalHours2 * percentageUniversityAdditionalHours2 / 100).toFixed(2));
          console.log("unplannedWorkload2", unplannedWorkload2)
          console.log("percentageUniversityAdditionalHours2: ", percentageUniversityAdditionalHours2)
          let percentageUnplannedWorkload2 = parseFloat((unplannedWorkload2 * unplannedWorkload2 / 100).toFixed(2));
          console.log("percentageAdditionalHours2: ", percentageAdditionalHours2)

          setPercentageUniversityWorkloadWhithoutAdditionalHours(parseFloat((percentageUniversityWorkloadWhithoutAdditionalHours2).toFixed(2)))
          setPercentageUniversityAdditionalHours(parseFloat((percentageUniversityAdditionalHours2).toFixed(2)))
          setPercentageDoneWorkload(percentageDoneWorkload2)
          setPercentageInProgressWorkload(percentageInProgressWorkload2)
          setPercentageToDoWorkload(percentageToDoWorkload2)
          setPercentageAdditionalHours(percentageAdditionalHours2)
          setPercentageUnplannedWorkload(percentageUnplannedWorkload2)
        })
        .catch((err) => setError(err))
        .finally(() => {
          setLoading(false)
        });
    }

  }, [user]);

  useEffect(() => {
    let percentageDoneWorkload2 = 0;
    let percentageInProgressWorkload2 = 0;
    let percentageToDoWorkload2 = 0;
    let percentageAdditionalHours2 = 0;

    percentageDoneWorkload2 = parseFloat((doneWorkload * percentageUniversityWorkloadWhithoutAdditionalHours / 100).toFixed(2));
    percentageInProgressWorkload2 = parseFloat((inProgressWorkload * percentageUniversityWorkloadWhithoutAdditionalHours / 100).toFixed(2));
    percentageToDoWorkload2 = parseFloat((toDoWorkload * percentageUniversityWorkloadWhithoutAdditionalHours / 100).toFixed(2));
    percentageAdditionalHours2 = parseFloat((additionalHours * percentageUniversityAdditionalHours / 100).toFixed(2));
    console.log("additionalHours: ", percentageAdditionalHours2)

    setPercentageDoneWorkload(percentageDoneWorkload2)
    setPercentageInProgressWorkload(percentageInProgressWorkload2)
    setPercentageToDoWorkload(percentageToDoWorkload2)
    setPercentageAdditionalHours(percentageAdditionalHours2)

  }, [toDoWorkload, doneWorkload, inProgressWorkload, additionalHours])


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

  async function deleteCourseHistory(courseHistoryId: string, workload: number, status: string) {
    console.log("useCourseHistory, deleteCourseHistory")
    setLoading(true);

    try {
      if (workload <= 0) { throw new Error("Não é possível remover uma disciplina com carga horária 0") }
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
          // REMOVE 1
          updateProgressWorkload1(1, workload, status)
          showMessage({
            message: "Disciplina removida com sucesso",
            type: "success",
            duration: 3000,
            icon: "success",
          });
        }
      }
    } catch (error: any) {
      error.response
        ? setError(error.response.data.message)
        : setError(error.message);
      showMessage({
        message: error,
        type: "danger",
        duration: 3000,
        icon: "danger",
      });
    } finally {
      setLoading(false);
    }
  }

  function updateProgressWorkload1(courseHistoryOperation: number, workload: number, status: string, oldStatus?: string) {
    let courseHistoryWorkload2 = 0;
    courseHistoryWorkload2 = workload
    let doneWorkload2 = 0;
    let inprogressWorkload2 = 0;
    let todoWorkload2 = toDoWorkload;
    // ADD 0 REMOVE 1 UPDATE 2
    // update 2

    switch (courseHistoryOperation) {
      case 2:

        if (oldStatus && oldStatus === "DONE") {
          doneWorkload2 = doneWorkload - courseHistoryWorkload2
          if(status === "INPROGRESS") {
            inprogressWorkload2 = inProgressWorkload + courseHistoryWorkload2
          } else {
            todoWorkload2 = toDoWorkload + courseHistoryWorkload2
          }
        } else if (oldStatus && oldStatus === "INPROGRESS") {
          inprogressWorkload2 = inProgressWorkload - courseHistoryWorkload2
          if(status === "DONE") {
            doneWorkload2 = doneWorkload + courseHistoryWorkload2
          } else {
            todoWorkload2 = toDoWorkload + courseHistoryWorkload2
          }
        } else {
          todoWorkload2 = toDoWorkload + courseHistoryWorkload2
          if(status === "DONE") {
            doneWorkload2 = doneWorkload + courseHistoryWorkload2
          } else if(status === "INPROGRESS") {
            inprogressWorkload2 = inProgressWorkload + courseHistoryWorkload2
          }
        }
        break;
        // ADD
      case 0:
        if(status === "DONE")  {
          doneWorkload2 = doneWorkload + courseHistoryWorkload2
          todoWorkload2 = toDoWorkload - courseHistoryWorkload2
        } else if(status === "INPROGRESS") {
          inprogressWorkload2 = inProgressWorkload + courseHistoryWorkload2
          todoWorkload2 = toDoWorkload - courseHistoryWorkload2
        }
        break;
        // REMOVE
      case 1:
        if(status === "DONE")  {
          doneWorkload2 = doneWorkload - courseHistoryWorkload2
          todoWorkload2 = toDoWorkload + courseHistoryWorkload2
        } else if(status === "INPROGRESS") {
          inprogressWorkload2 = inProgressWorkload - courseHistoryWorkload2
          todoWorkload2 = toDoWorkload + courseHistoryWorkload2
        }
        break;
      }
      setDoneWorkload(doneWorkload2)
      setInProgressWorkload(inprogressWorkload2)
      setToDoWorkload(todoWorkload2)
      setIsProgressChanged(true)
  }

  async function patchCourseHistory(courseHistoryId: string, data: any, progressData: ProgressData, toFormationPlanList: (goBack: boolean) => void) {
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
      if (progressData.oldStatus != "" && progressData.oldStatus != undefined) {
        // UPDATE 2
        updateProgressWorkload1(2, progressData.workload, progressData.oldStatus, data.status)
        // updateProgressWorkload(progressData.workload, progressData.oldStatus, -1)
        // updateProgressWorkload(progressData.workload, data.status, 1)

      } else {
        throw new Error("Não foi possível editar disciplina")
      }
      showMessage({
        message: "Disciplina editada com sucesso",
        type: "success",
        duration: 3000,
        icon: "success",
      });
    } catch (error: any) {
      error.response
        ? setError(error.response.data.message)
        : setError(error.message);
      showMessage({
        message: "Não foi possível editar disciplina",
        type: "danger",
        duration: 3000,
        icon: "danger",
      });
      console.log("error: ", error)
    } finally {
      setLoading(false);
    }
  }

  async function postCourseHistory(semester: number, data: CourseHistoryRegisterBodyRequest, progressData: ProgressDataRegister, toFormationPlanList: (goBack: boolean) => void) {
    setLoading(true);
    toFormationPlanList(false);
    try {
      console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
      console.log("data: ", data)
      const response = await students.postCourseHistory({
        studentRegistration: user!.user?.studentId,
        semester: semester,
        data: data
      })
      console.log("depoiiiiiis depoiiiiiiis")
      var updatedCourseHistory = { ...courseHistory }
      console.log("courseHitory number: ", updateCourseHistory?.length)
      console.log("antes do progress")

      console.log("progresssUpdate0: ", progressData)


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
      updatedCourseHistory.disciplineHistory?.map((d) => { console.log("period: ", d.period); d.disciplines.map((d) => console.log("discipline: ", d.name)) })
      // updatedCourseHistory = updatedCourseHistory!.disciplineHistory!.map((d) => { if(d.period == semester) d.disciplines.push(...response!.disciplineHistory![0].disciplines!) })}
      setCourseHistory(updatedCourseHistory)
      console.log("-------------------------------- depois do setCoursehISTORY")
      console.log("progressData1: ", progressData)
      console.log("progressData2: ", progressData!.disciplineProgress)
      console.log("progressData3: ", progressData!.disciplineProgress[0].status)
      console.log("progressData4: ", progressData!.disciplineProgress.length)
      // progressData!.disciplineProgress.map((d) => { updateProgressWorkload(d.workload, d.status, 1) })
      console.log("progressData: ", progressData)
      // updatedCourseHistory.disciplineHistory?.map((d) => { console.log("period: ", d.period); d.disciplines.map((d) => console.log("discipline: ", d.name)) })
      response.disciplineHistory[0].disciplines?.map((d) => { updateProgressWorkload1(0, d.workload, d.status) })

      toFormationPlanList(true);
      showMessage({
        message: "Disciplina cadastrada com sucesso",
        type: "success",
        duration: 3000,
        icon: "success",
      });
      // console.warn("Cadastrada com sucesso")
    } catch (error: any) {
      error.response
        ? setError(error.response.data.message)
        : setError(error.message);
      console.log("error: ", error)
      showMessage({
        message: "Não foi possível cadastrar disciplina",
        type: "danger",
        duration: 3000,
        icon: "danger",
      });
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

        // var sumWorkload = 0;
        // curriculumDisciplines!.disciplines!.map((d) => {if (d.hours && d.status) setCompletedWorkload(sumWorkload + d.hours)})

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

  const providerValue = useMemo(
    () => ({
      loading,
      error,
      curriculumDisciplines,
      courseHistory,
      additionalHours,
      doneWorkload,
      inProgressWorkload,
      toDoWorkload,
      universityAdditionalHours,
      universityWorkload,
      universityWorkloadWithoutAdditionalHours,
      percentageUniversityWorkloadWhithoutAdditionalHours,
      percentageUniversityAdditionalHours,
      percentageToDoWorkload,
      percentageDoneWorkload,
      percentageInProgressWorkload,
      percentageAdditionalHours,
      percentageUnplannedWorkload,
      unplannedWorkload,
      fetchCourseHistory,
      deleteCourseHistory,
      patchCourseHistory,
      postCourseHistory,
      getDisciplines,
      getDisciplinesfromCurriculum
    }), [loading, error, courseHistory, filteredList]);
  return (
    <CourseHistoryContext.Provider value={providerValue}>
      {children}
    </CourseHistoryContext.Provider>
  );
}
