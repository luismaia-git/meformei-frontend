declare module "CourseHistory" {
    export type StatusType = 'DONE' | 'INPROGRESS' | 'FAILED' | 'WITHDRAWAL';

    export type DayOfWeekType = 'DOM' | 'SEG' | 'TER' | 'QUA' | 'QUI' | 'SEX' | 'SAB';

    interface DisciplineToFront {
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

    interface ToFront {
        period: number;
        disciplines: DisciplineToFront[];
    }
    
    interface CourseHistoryToFrontResponse {
        disciplineHistory: ToFront[];
    }

}