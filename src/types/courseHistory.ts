declare module "CourseHistory" {
    export type StatusType = 'DONE' | 'INPROGRESS' | 'FAILED' | 'WITHDRAWAL';

    export type DayOfWeekType = 'DOM' | 'SEG' | 'TER' | 'QUA' | 'QUI' | 'SEX' | 'SAB';

    interface Discipline {
        id: string;
        courseHistoryId: string;
        name: string;
        cod: string;
        menu: string;
        curriculumId: string;
        description: string;
        isOptional: boolean;
        prerequisites: string[];
        workload: number;
        start: string;
        end: string;
        daysWeek: DayOfWeekType[];
        bibliography: string[];
        status: StatusType; 
    }

    interface CourseHistoryByPeriod {
        period: number;
        disciplines: Discipline[];
    }
    
    interface CourseHistory {
        disciplineHistory: CourseHistoryByPeriod[];
    }

}