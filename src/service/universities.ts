import { DisciplineByPeriod, DisciplineData } from "Discipline";
import { Courses, Universities } from "University";
import { Student } from "User";
import { ensureAxiosParamOptions } from "../utils/params";
import api from "./config/api";
import { callService } from "./config/service";

type UniversitiesProps = {
  state?: string;
  city?: string;
};

const service = () => {
  const resource = "universities";

  async function getUniversities({ state, city }: UniversitiesProps) {
    const path = `${resource}`;
    const options = ensureAxiosParamOptions({
      params: {
        state,
        city,
      },
    });
    const response = await callService(() =>
      api.get<Universities>(path, options)
    );

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

  async function getDisciplines(idUniversity?: string, idCourse?: string) {
    const path = `${resource}/${idUniversity}/courses/${idCourse}/disciplines`;
    const response = await callService(() =>
      api.get<ResponseDisciplines>(path)
    );

    return response.data.disciplines;
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
    getCourses,
    getDisciplines,
    getDisciplinesByCod,
  };
};

export const university = service();
