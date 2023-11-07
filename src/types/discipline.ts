declare module "Discipline" {
  type Status = "Aprovada" | "Reprovada" | "Trancada";

  export type StatusType = 'DONE' | 'INPROGRESS' | 'FAILED' | 'WITHDRAWAL';

  export type DayOfWeekType = 'DOM' | 'SEG' | 'TER' | 'QUA' | 'QUI' | 'SEX' | 'SAB';

  interface DisciplineData {
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

  interface DisciplineByPeriod {
    period: number;
    disciplines: DisciplineData[];
  }
  
  interface DisciplineWithPeriod {
    period: number;
    discipline: DisciplineData;
  }

  interface Hour {
    start: number;
    end: number;
  }

  interface Classe {
    discipline_name: string;
    hour: Hour;
    isCurrent: boolean;
  }
}