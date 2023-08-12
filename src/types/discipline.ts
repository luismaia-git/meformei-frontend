declare module "Discipline" {
  type Status = "Aprovado" | "Reprovado" | "Trancado";

  interface DisciplineData {
    id: string;
    name: string;
    cod: string;
    menu: string;
    curriculumId: string;
    description: string;
    isOptional: boolean;
    bibliography: string[];
    prerequisites: string[];
    workload: number;
  }

  interface DisciplineByPeriod {
    period: number;
    disciplines: DisciplineData[];
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
