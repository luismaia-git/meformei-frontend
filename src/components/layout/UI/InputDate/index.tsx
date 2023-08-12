import { FormControl, IInputProps, Icon, Input, VStack } from "native-base";
import { H5 } from "../../../shared/text";
import { useTheme } from "styled-components";

import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { dateMask } from "../../../../utils/masks";

const { Label } = FormControl;

interface InputDateProps {
  label: string;
  config?: IInputProps;
  touched?: boolean;
  isValid?: boolean;
  errors?: string;
}

export function InputDate({
  label,
  config,
  touched,
  isValid,
  errors,
}: InputDateProps) {
  const theme = useTheme();

  const [values, setValues] = useState({ number: "" });

  const inputChange = (value: string) => {
    setValues({
      number: value,
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
        fontSize={14}
        variant="underlined"
        color={theme.colors.text}
        value={dateMask(values.number)}
        onChangeText={inputChange}
        {...config}
        InputRightElement={
          <Icon
            as={FontAwesome}
            name="calendar"
            size={4}
            ml="2"
            color={theme.colors.text}
          />
        }
      />
    </VStack>
  );
}
