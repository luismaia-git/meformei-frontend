declare module "Discipline" {
  type Status = "Aprovado" | "Reprovado" | "Trancado";

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


  // interface DisciplineData {
  //   id: string;
  //   name: string;
  //   cod: string;
  //   menu: string;
  //   curriculumId: string;
  //   description: string;
  //   isOptional: boolean;
  //   prerequisites: string[];
  //   workload: number;
  //   start?: number,
  //   end?: number,
  //   daysWeek?: string[]
  //   bibliography: string[];
  // }

  interface DisciplineByPeriod {
    period: number;
    disciplines: DisciplineData[];
  }
  
  interface DisciplineWithPeriod {
    period: number;
    discipline: DisciplineData;
  }

  // interface DisciplineByPeriod {
  //   disciplines: Discipline[];
  // }

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
