import { Student } from "User";
import api from "./config/api";
import { callService } from "./config/service";
import { Courses } from "University";
import { DisciplineByPeriod, DisciplineData } from "Discipline";

type CourseHistoriesProps = {
  studentId?: string;
};

const service = () => {
  const resource = "courseHistories";

  async function getCourseHistories({ studentId }: CourseHistoriesProps) {
    const path = `${resource}/city/${city}`;

    const response = await callService(() => api.get<CourseHistorY[]>(path));

    return response.data;
  }

  async function getCourses(id: string) {
    const path = `${resource}/${id}/courses`;
    const response = await callService(() => api.get<Courses>(path));
    return response.data;
  }

  type ResponseDisciplines = {
    disciplines: DisciplineByPeriod[];
  };

  async function getDisciplines(idCourse?: string) {
    const path = `curriculums/${idCourse}/disciplines-to-student`;
    const response = await callService(() =>
      api.get<ResponseDisciplines>(path)
    );
    return response.data.disciplines; //response.data.disciplines;
  }

  async function getDisciplinesByCod(
    idUniversity?: string,
    idCourse?: string,
    ids?: string[]
  ) {
    const path = `${resource}/${idUniversity}/courses/${idCourse}/disciplines/cod`;
    const response = await callService(() =>
      api.get<{ disciplines: DisciplineData[] }>(path, { data: { cods: ids } })
    );
    return response.data;
  }

  async function postStudent(value: Student) {
    const path = `${resource}/signup/student`;

    const response = await callService(() => api.post(path, value));

    return response;
  }

  return {
    postStudent,
    getCourseHistories,
    getCourses,
    getDisciplines,
    getDisciplinesByCod,
  };
};

export const university = service();
