import { DisciplineByPeriod, DisciplineData } from "Discipline";
import { Courses, CoursesResponse, Universities } from "University";
import { Student } from "User";
import api from "./config/api";
import { callService } from "./config/service";

type UniversitiesProps = {
  state?: string;
  city?: string;
};

const service = () => {
  const resource = "universities";

  async function getUniversities({ state, city }: UniversitiesProps) {
    const path = `${resource}/city/${city}`;

    const response = await callService(() => api.get<Universities>(path));

    return response.data;
  }

  
  async function getCourse(idUniversity: string) {
    const path = `${resource}/${idUniversity}/courses`;
    const response = await callService(() => api.get<CoursesResponse>(path));
    return response.data;
  }

  async function getCourses(idUniversity: string) {
    const path = `${resource}/${idUniversity}/courses`;
    const response = await callService(() => api.get<Courses>(path));
    return response.data;
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
    getUniversities,
    getCourse,
    getCourses,
    getDisciplinesByCod,
  };
};

export const university = service();
