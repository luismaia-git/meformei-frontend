import { Input, FormControl, VStack } from "native-base";
import { H5 } from "../../../shared/text";
import { IInputProps } from "native-base/lib/typescript/components/primitives/Input/types";
import { useTheme } from "styled-components";

const { Label } = FormControl;

interface InputNumberProps {
  label: string;
  config?: IInputProps;
  touched?: boolean;
  isValid?: boolean;
  errors?: string;
}

export function InputNumber({
  label,
  config,
  touched,
  isValid,
  errors,
}: InputNumberProps) {
  const theme = useTheme();

  return (
    <VStack>
      <Label>
        <H5 color={theme.colors.primary[500]} size={14}>
          {label}
        </H5>
      </Label>
      <Input
        fontFamily="Nunito-Regular"
        color={theme.colors.text}
        fontSize={14}
        variant="underlined"
        keyboardType="numeric"
        {...config}
      />
      {errors && touched && (
        <H5 color="red" style={{ paddingTop: 10 }}>
          {errors}
        </H5>
      )}
    </VStack>
  );
}
