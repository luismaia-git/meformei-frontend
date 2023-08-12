import { FormControl, Icon, Select, VStack } from "native-base";
import { H5 } from "../../../shared/text";
import { Entypo } from "@expo/vector-icons";
import { ISelectProps } from "native-base/lib/typescript/components/primitives/Select";
import { useTheme } from "styled-components";
const { Item } = Select;
const { Label } = FormControl;

interface SelectData {
  label: string;
  value: string;
}

interface InputSelectProps {
  label: string;
  config?: ISelectProps;
  values: SelectData[];
  touched?: boolean;
  errors?: string;
}

export function InputSelect({
  label,
  config,
  values,
  touched,
  errors,
}: InputSelectProps) {
  const theme = useTheme();
  return (
    <VStack>
      <Label>
        <H5 color={theme.colors.primary[500]} size={14}>
          {label}
        </H5>
      </Label>

      <Select
        fontFamily="Nunito-Regular"
        fontSize={14}
        {...config}
        color={theme.colors.text}
        variant="underlined"
        dropdownIcon={<Icon as={Entypo} name="chevron-down" size={4} />}
      >
        {values.map((value) => {
          return <Item key={value.label} {...value} />;
        })}
      </Select>
      {errors && touched && (
        <H5 color="red" style={{ paddingTop: 10 }}>
          {errors}
        </H5>
      )}
    </VStack>
  );
}
