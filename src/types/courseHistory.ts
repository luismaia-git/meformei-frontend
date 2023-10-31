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
        disciplineHistory?: CourseHistoryByPeriod[];
    }

    interface disciplineResponse {
        id: string;
        name: string;
        cod: string;
        menu: string;
        curriculumId: string;
        description: string;
        isOptional: boolean;
        semester: number;
        bibliography: string[];
        prerequisites: string[];
        workload: number;
    }

    interface CourseHistoryResponse {
        createdAt: string;
        daysWeek: string[];
        discipline: disciplineResponse;
        endTime: string;
        hours: number;
        id: string;
        semester: number;
        startTime: string;
        status: string;
        studentId: string;
      }

      interface courseHistoryBodyRequest {
        disciplineId?: string,
        status?: string,
        semester?: number,
        startTime?: string,
        endTime?: string,
        hours?: number,
        daysWeek?: string[]
      }

      interface CourseHistoryRegisterBodyRequest {
        disciplines?: courseHistoryBodyRequest[],
      }
}