import { Radio, FormControl, IRadioProps, HStack, VStack } from "native-base";
import { H5 } from "../../../shared/text";
import { useTheme } from "styled-components";

const { Label } = FormControl;

interface InputRadioProps {
  label: string;
  defaultValue?: string;
  values: string[];
  config?: IRadioProps;
  touched?: boolean;
  isValid?: boolean;
  errors?: string;
  orientation?: "vertical" | "horizontal";
}

export function InputRadio({
  label,
  orientation,
  defaultValue,
  values,
  config,
  touched,
  isValid,
  errors,
}: InputRadioProps) {
  const theme = useTheme();

  const radioMap = () => {
    return values.map((value, index) => {
      return (
        <Radio size="sm" key={index} value={value} my={1}>
          <H5 color={theme.colors.text} size={14}>
            {value}
          </H5>
        </Radio>
      );
    });
  };

  return (
    <VStack>
      <Label>
        <H5 color={theme.colors.primary[500]} size={14}>
          {label}
        </H5>
      </Label>
      <Radio.Group
        defaultValue={defaultValue}
        {...config}
        name="groupRadio"
        accessibilityLabel="favorite colorscheme"
      >
        {orientation === "vertical" ? (
          <VStack space={2}>{radioMap()}</VStack>
        ) : (
          <HStack space={2}>{radioMap()}</HStack>
        )}
      </Radio.Group>
    </VStack>
  );
}
