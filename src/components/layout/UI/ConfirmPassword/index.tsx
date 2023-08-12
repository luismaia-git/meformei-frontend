import {
  Input,
  FormControl,
  Icon,
  View,
  VStack,
  IInputProps,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";

import { H5 } from "../../../shared/text";
import { useState } from "react";
import { useTheme } from "styled-components";

const { Label } = FormControl;

interface Password {
  touched?: boolean;
  isValid?: boolean;
  errors?: string;
  config?: IInputProps;
}

interface ConfirmPassWordProps {
  password?: Password;
  confirmPassword?: Password;
}

export function ConfirmPassword({
  password,
  confirmPassword,
}: ConfirmPassWordProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <VStack>
      <FormControl>
        <InputPassword
          config={password?.config}
          show={showPassword}
          setShow={setShowPassword}
          label="Senha"
          touched={password?.touched}
          isValid={password?.isValid}
          errors={password?.errors}
        />
      </FormControl>
      <FormControl paddingTop={3}>
        <InputPassword
          config={confirmPassword?.config}
          show={showPassword}
          setShow={setShowPassword}
          label="Confirmação de senha"
          touched={confirmPassword?.touched}
          isValid={confirmPassword?.isValid}
          errors={confirmPassword?.errors}
        />
      </FormControl>
    </VStack>
  );
}

interface InputPasswordProps {
  show: boolean;
  setShow: (value: boolean) => void;
  label: string;
  config?: IInputProps;
  touched?: boolean;
  isValid?: boolean;
  errors?: string;
}

export function InputPassword({
  show,
  setShow,
  label,
  config,
  isValid,
  touched,
  errors,
}: InputPasswordProps) {
  const theme = useTheme();

  return (
    <View>
      <Label>
        <H5 color={theme.colors.primary[500]} size={14}>
          {label}
        </H5>
      </Label>
      <Input
        fontSize={14}
        fontFamily="Nunito-Regular"
        variant="underlined"
        type={!show ? "password" : "text"}
        {...config}
        color={theme.colors.text}
        InputRightElement={
          <Icon
            onPress={() => setShow(!show)}
            as={Ionicons}
            name={!show ? "eye" : "eye-off"}
            size={5}
            ml="2"
            color={theme.colors.text}
          />
        }
      />

      {errors && touched && <H5 color="red">{errors}</H5>}
    </View>
  );
}
