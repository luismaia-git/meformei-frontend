import { Input, FormControl, Icon, IInputProps, VStack } from "native-base";
import { Ionicons } from "@expo/vector-icons";

import { H5 } from "../../../shared/text";
import { useState } from "react";
import { useTheme } from "styled-components";

const { Label } = FormControl;

interface InputPasswordProps {
  label: string;
  config?: IInputProps;
  touched?: boolean;
  isValid?: boolean;
  errors?: string;
}

export function InputPassword({
  label,
  config,
  touched,
  isValid,
  errors,
}: InputPasswordProps) {
  const [showPassword, setShowPassword] = useState(false);
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
        fontSize={14}
        variant="underlined"
        color={theme.colors.text}
        {...config}
        type={!showPassword ? "password" : "text"}
        InputRightElement={
          <Icon
            onPress={() => setShowPassword(!showPassword)}
            as={Ionicons}
            name={!showPassword ? "eye" : "eye-off"}
            size={5}
            ml="2"
            color={theme.colors.text}
          />
        }
      />
      {errors && touched && (
        <H5 color="red" style={{ paddingTop: 10 }}>
          {errors}
        </H5>
      )}
    </VStack>
  );
}
