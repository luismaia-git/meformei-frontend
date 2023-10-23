import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { CourseHistory, CourseHistoryByPeriod } from "CourseHistory";

import { students } from "../service/students";
import { useUser } from "./useUser";

export interface ICourseHistoryContext {
  loading: boolean,
  error: string[];
  courseHistory?: CourseHistory,
  fetchCourseHistory: () => void,
  deleteCourseHistory: (courseHistoryId: string) => Promise<void>,
}

const CourseHistoryContext = createContext<ICourseHistoryContext>({} as ICourseHistoryContext);

export function useCourseHistory() {
  return useContext(CourseHistoryContext);
}

export function CourseHistoryContextProvider({ children }: { children: ReactNode }) {
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

  async function deleteCourseHistory(courseHistoryId: string) {
    setLoading(true);

    try {
      await students.deleteCourseHistory({
        studentRegistration: user!.user?.studentId,
        courseHistoryId: courseHistoryId,
      });

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
  const providerValue = useMemo(() => ({ loading, error, courseHistory, fetchCourseHistory, deleteCourseHistory }), [loading, error, courseHistory, filteredList]);
  return (
    <CourseHistoryContext.Provider value={providerValue}>
      {children}
    </CourseHistoryContext.Provider>
  );
}
