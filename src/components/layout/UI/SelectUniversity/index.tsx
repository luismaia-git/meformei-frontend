import { ISelectProps } from "native-base";
import { useUniversity } from "../../../../servicesHooks/useUniversities";
import { InputSelect } from "../InputSelect";

interface SelectUniversityProps {
  config?: ISelectProps;
  state: string;
  city: string;
}

export function SelectUniversity({
  config,
  state,
  city,
}: SelectUniversityProps) {
  const { data } = useUniversity(state, city);
 
  const dataFormatted = data
    ? data.map((d) => {
        return { label: d.name, value: d.id };
      })
    : [];
  return (
    <InputSelect
      config={{ ...config, isDisabled: data ? false : true }}
      values={dataFormatted}
      label="Universidade"
    />
  );
}
