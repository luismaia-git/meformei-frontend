import { DisciplineByPeriod, DisciplineData } from "Discipline";
import api from "./config/api";
import { callService } from "./config/service";
import { ProfileTO, User, UserPatchRequest } from "User";
import { Student } from "../types/types";
import { CourseHistory, GetDisciplinesResponse, disciplineResponse } from "CourseHistory";

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

export type GetDisciplineParams = {
    curriculumId: string;
    disciplineId: string;
};

export type GetDisciplinesParams = {
    curriculumId: string;
};

type ResponseDisciplines = {
    disciplines: DisciplineByPeriod[];
};


const service = () => {
    const resource = "curriculums";

    async function getDiscipline({
        curriculumId,
        disciplineId
    }: GetDisciplineParams) {
        const path = `${resource}/${curriculumId}/curriculumId/${disciplineId}`;
        const response = await callService(() =>
            api.get<DisciplineData>(path)
        );
        return response.data;
    }

    async function getDisciplines({
        curriculumId,
    }: GetDisciplinesParams) {
        const path = `${resource}/${curriculumId}/disciplines`;
        console.log("curriculumId", curriculumId)
        console.log("path", path)
        const response = await callService(() =>
            api.get<GetDisciplinesResponse>(path)
        );
        return response.data;
    }

    async function getDisciplinesToStudent(curriculumId?: string) {
        const path = `${resource}/${curriculumId}/disciplines-to-student`;
        const response = await callService(() =>
            api.get<ResponseDisciplines>(path)
        );
        return response.data.disciplines; //response.data.disciplines;
    }

    return {
        getDiscipline,
        getDisciplines,
        getDisciplinesToStudent
    };
};

export const curriculums = service();