declare module "progressCourse" {

  interface ProgressDataRegister {
    disciplineProgress: DisciplineProgress[]
  }
  
  interface DisciplineProgress {
    status: string;
    workload: number;
  }

}