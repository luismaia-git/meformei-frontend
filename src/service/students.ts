import { DisciplineByPeriod } from "Discipline";
import api from "./config/api";
import { callService } from "./config/service";
import { ProfileTO, User, UserPatchRequest } from "User";

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

  async function patchStudent(value: UserPatchRequest) {
    const path = `${resource}/${value.registration}}`;
    const response = await callService(() =>
      api.patch<{ user: User }>(path, value)
    );
    return response.data.user;
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

  async function getDisciplinesPeriodTodo({
    studentRegistration,
    curriculumId,
  }: { curriculumId: string } & GetDisciplinesPeriodTodoParams) {
    const path = `${resource}/${studentRegistration}/disciplines/todo`;
    const response = await callService(() =>
      api.post<{ disciplines: DisciplineByPeriod[] }>(path, {
        curriculumId,
      })
    );
    return response.data.disciplines;
  }

  return {
    getDisciplinesPeriodByStatus,
    getDisciplinesPeriodTodo,
    patchStudent,
  };
};

export const students = service();
