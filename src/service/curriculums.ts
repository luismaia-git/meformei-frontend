import { DisciplineByPeriod, DisciplineData } from "Discipline";
import api from "./config/api";
import { callService } from "./config/service";
import { ProfileTO, User, UserPatchRequest } from "User";
import { Student } from "../types/types";
import { CourseHistory, disciplineResponse } from "CourseHistory";

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

export type GetDisciplinesResponse = {
    disciplines: disciplineResponse[];
}


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
        const path = `${resource}/${curriculumId}/curriculumId/disciplines`;
        const response = await callService(() =>
            api.get<GetDisciplinesResponse>(path)
        );
        return response.data;
    }

    return {
        getDiscipline,
        getDisciplines
    };
};

export const curriculums = service();