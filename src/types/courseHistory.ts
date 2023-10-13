declare module "CourseHistory" {
    export type StatusType = 'DONE' | 'INPROGRESS' | 'FAILED' | 'WITHDRAWAL';
    interface CourseHistory {
        id: string;

        disciplineId: string;

        status: StatusType;

        createdAt: string;

        semester: number;

        startTime: Date;

        endTime: Date;

        hours: number;

        daysWeek: string[];
    }
}