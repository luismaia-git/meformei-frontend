import { DisciplineByPeriod, DisciplineData } from "Discipline";
import api from "./config/api";
import { callService } from "./config/service";
import { ProfileTO, User, UserPatchRequest } from "User";
import { Student } from "../types/types";
import { CourseHistory } from "CourseHistory";

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

    return {
        getDiscipline,
    };
};

export const curriculums = service();