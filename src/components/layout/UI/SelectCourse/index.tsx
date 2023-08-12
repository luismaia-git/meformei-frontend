import { ISelectProps } from "native-base";
import { InputSelect } from "../InputSelect";
import { useCourses } from "../../../../servicesHooks/useCourses";

interface SelectCourseProps {
  config?: ISelectProps;
  id: string;
}

export function SelectCourse({ config, id }: SelectCourseProps) {
  const { data } = useCourses(id);
  const dataFormatted = data
    ? data.courses.map((d) => {
        return { label: d.course.name, value: d.course.curriculumId };
      })
    : [];
  return (
    <InputSelect
      config={{ ...config, isDisabled: data ? false : true }}
      values={dataFormatted}
      label="Curso"
    />
  );
}
