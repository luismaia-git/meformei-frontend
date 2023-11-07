import { CourseHistory, CourseHistoryRegisterBodyRequest, GetDisciplinesResponse, courseHistoryBodyRequest } from "CourseHistory";
import { DisciplineByPeriod } from "Discipline";

export function parseCourseHistoryToRegisterBody(disciplinesByPeriod: DisciplineByPeriod[]): CourseHistoryRegisterBodyRequest {
  const disciplines: courseHistoryBodyRequest[] = [];

  if (disciplinesByPeriod.length > 0) {
    for (const disciplineByPeriod of disciplinesByPeriod) {
    for (const discipline of disciplineByPeriod.disciplines) {
      const courseHistoryRequest: courseHistoryBodyRequest = {
        disciplineId: discipline.id,
        name: discipline.name,
        cod: discipline.cod,
        status: discipline.status,
        startTime: discipline.start,
        endTime: discipline.end,
        hours: discipline.workload,
        daysWeek: discipline.daysWeek,

      }
      disciplines.push(courseHistoryRequest);
    }
    }
  }

  return { disciplines };
}

export function parseDisciplinesResponseToCourseHistoryRegisterBodyRequest(response: GetDisciplinesResponse): CourseHistoryRegisterBodyRequest {
  const disciplines = response.disciplines.map((discipline) => ({
    disciplineId: discipline.id,
    name: discipline.name,
    cod: discipline.cod,
    hours: discipline.workload,
    daysWeek: [],
    startTime: "08:00",
    endTime: "10:00",
    status: "TODO",
  }));

  return {
    disciplines,
  };
}