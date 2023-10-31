import { DisciplineByPeriod } from "Discipline";
import api from "./config/api";
import { callService } from "./config/service";
import { ProfileTO, User, UserPatchRequest } from "User";
import { Student } from "../types/types";
import { CourseHistory, CourseHistoryByPeriod, CourseHistoryResponse } from "CourseHistory";

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

export type GetCourseHistoryParams = {
  studentRegistration: string;
};

export type deleteCourseHistoryParams = {
  studentRegistration: string;
  courseHistoryId: string;
};

export type deleteCourseHistoryResponse = {
  courseHistoryResponse: CourseHistoryResponse;
  message: string;
}

export type patchCourseHistoryParams = {
  studentRegistration: string;
  courseHistoryId: string;
  data: courseHistoryRequest;
}

export type patchCourseHistoryResponse = {
  disciplineHistory: CourseHistoryResponse;
  message: string;
}


export type courseHistoryRequest = {
  disciplineId?: string
  status?: string
  semester?: number
  startTime?: string
  endTime?: string
  hours?: number
  daysWeek?: string[]
}

export type CourseHistoryParams = {
  studentRegistration: string;
  courseHistoryId: string;
};

export type postCourseHistoryParams = {
  studentRegistration: string;
  semester: string;
  data: courseHistoryRequest;
}

export type postCourseHistoryResponse = {
  disciplineHistory: CourseHistoryByPeriod[];
  message: string;
}


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
  }: GetCourseHistoryParams) {
    const path = `${resource}/${studentRegistration}/courseHistory`;
    //console.log("path:", path);
    const response = await callService(() =>
      api.get<CourseHistory>(path)
    );
    //console.log("response.data:", response.data);
    return response.data;
  }

  async function deleteCourseHistory({
    studentRegistration,
    courseHistoryId,
  }: deleteCourseHistoryParams) {
    console.log("deleteCourseHistory");
    const path = `${resource}/${studentRegistration}/courseHistory/${courseHistoryId}`;
    //console.log("path:", path);
    const response = await callService(() =>
      api.delete<deleteCourseHistoryResponse>(path)
    );
    //console.log("response.data:", response.data);
    return response.data;
  }

async function patchCourseHistory({ courseHistoryId, studentRegistration, data }: patchCourseHistoryParams) {
    const path = `${resource}/${studentRegistration}/courseHistory/${courseHistoryId}`;
    console.log("path: ", path)
    console.log("data: ", data)
    const response = await callService(() =>
      api.patch<patchCourseHistoryResponse>(path, data)
    );
    console.log("response.data:", response.data.disciplineHistory)
    return response.data;
}

async function postCourseHistory({studentRegistration, semester,  data }: postCourseHistoryParams) {
  const path = `${resource}/${studentRegistration}/courseHistory/${semester}`;
  const response = await callService(() =>
    api.patch<postCourseHistoryResponse>(path, data)
  );
  console.log("response.data:", response.data.disciplineHistory)
  return response.data;
}

  return {
    getDisciplinesPeriodByStatus,
    getCourseHistory,
    patchStudent,
    deleteCourseHistory,
    patchCourseHistory,
    postCourseHistory
  };
};

export const students = service();
