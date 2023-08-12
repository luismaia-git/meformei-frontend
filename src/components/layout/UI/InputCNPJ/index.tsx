import { Input, FormControl, VStack } from "native-base";
import { H5 } from "../../../shared/text";
import { IInputProps } from "native-base/lib/typescript/components/primitives/Input/types";
import { useTheme } from "styled-components";
import { useState } from "react";
import { cnpjMask } from "../../../../utils/masks";

const { Label } = FormControl;

interface InputCNPJProps {
  label: string;
  config?: IInputProps;
  touched?: boolean;
  isValid?: boolean;
  errors?: string;
}

export function InputCNPJ({
  label,
  config,
  touched,
  isValid,
  errors,
}: InputCNPJProps) {
  const theme = useTheme();

  const [values, setValues] = useState({ cnpj: "" });

  const inputChange = (value: string) => {
    setValues({
      cnpj: value,
    });
  };

  return (
    <VStack>
      <Label>
        <H5 color={theme.colors.primary[500]} size={14}>
          {label}
        </H5>
      </Label>
      <Input
        fontFamily="Nunito-Regular"
        value={cnpjMask(values.cnpj)}
        color={theme.colors.text}
        fontSize={14}
        variant="underlined"
        {...config}
        onChangeText={inputChange}
      />
    </VStack>
  );
}
