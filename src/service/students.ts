import { DisciplineByPeriod } from "Discipline";
import api from "./config/api";
import { callService } from "./config/service";
import { ProfileTO, User, UserPatchRequest } from "User";
import { Student } from "../types/types";
import { CourseHistoryToFrontResponse } from "CourseHistory";

export type StatusType =
  | "DONE"
  | "INPROGRESS"
  | "FAILED"
  | "WITHDRAWAL"
  | "TODO";

export type GetDisciplinesPeriodByStatusParams = {
  studentRegistration: string;
  status: string;
};

export type GetDisciplinesPeriodTodoParams = {
  studentRegistration: string;
};


const service = () => {
  const resource = "students";

  async function patchStudent(studentId: string, value: UserPatchRequest) {
    const path = `${resource}/${studentId}`;
    const response = await callService(() =>
      api.patch<{ message: string, student: Student }>(path, value)
    );
    console.log("response.data:", response.data);
    return response.data.student;
  }

  async function getDisciplinesPeriodByStatus({
    status,
    studentRegistration,
  }: GetDisciplinesPeriodByStatusParams) {
    if (
      status !== "DONE" &&
      status !== "INPROGRESS" &&
      status !== "FAILED" &&
      status !== "WITHDRAWAL"
    ) {
      return [];
    }
    const path = `${resource}/${studentRegistration}/disciplines/status/${status}`;
    const response = await callService(() =>
      api.get<{ disciplineHistory: DisciplineByPeriod[] }>(path)
    );
    return response.data.disciplineHistory;
  }

  async function getCourseHistory({
    studentRegistration,
  }: { studentRegistration: string }) {
    const path = `${resource}/${studentRegistration}/courseHistory`;
    const response = await callService(() =>
      api.get<CourseHistoryToFrontResponse>(path)
    );
    return response.data;
  }

  

  return {
    getDisciplinesPeriodByStatus,
    getDisciplinesPeriodTodo,
    patchStudent,
  };
};

export const students = service();
