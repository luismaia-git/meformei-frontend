import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import { Button, VStack } from "native-base";
import { KeyboardAvoidingView, Platform } from "react-native";
import { useTheme } from "styled-components";
import * as yup from "yup";
import { Header } from "../../../components/layout";
import { CustomizedStatusBar } from "../../../components/layout/CustomizedStatusBar";
import {
  ConfirmPassword,
  InputNumber,
  InputText,
} from "../../../components/layout/UI";
import { H5, Subtitle } from "../../../components/shared/text";
import { UserLoginNavigationProp } from "../../../types/types";
import { Container, ContentForm } from "../styles";
import { auth } from './../../../service/auth';

export default function AccountInfo() {
  const theme = useTheme();
  const navigation = useNavigation<UserLoginNavigationProp>();
  
  let registerValidationSchema = yup.object().shape({
    registration: yup.number().required("A matrícula é obrigatória.").test('checkRegistrationAvailability', 'Esta matricula de usuário já está em uso.', async function (value) {
      const response = await auth.checkRegistrationAvailability(value);
      return response;
    }),
    name: yup.string().required("O nome é obrigatório."),
    lastname: yup.string().required("O sobrenome é obrigatório."),
    username: yup.string().required("O usuário é obrigatório.").test('checkUsernameAvailability', 'Este nome de usuário já está em uso.', async function (value) {
    
      const response = await auth.checkUsernameAvailability(value);
      return response;
    }),
    email: yup
      .string()
      .email("Por favor, digite um e-mail válido.")
      .required("O e-mail é obrigatório.").test('checkEmailAvailability', 'Este email de usuário já está em uso.', async function (value) {
    
        const response = await auth.checkEmailAvailability(value);
        
        return response;
      }),
    password: yup
      .string()
      .required("A senha é obrigatória.")
      .min(8, "A senha deve ter no mínimo 8 caracteres."),
    passwordConfirmation: yup
      .string()
      .oneOf(
        [yup.ref("password"), undefined],
        "As senhas digitadas não coincidem."
      ),
  });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Container>
        <CustomizedStatusBar />
        <Header
          backButton
          colorIcon={
            theme.isDark ? theme.colors.white : theme.colors.primary[500]
          }
        />
        <Formik
          initialValues={{
            registration: "",
            name: "",
            lastname: "",
            username: "",
            email: "",
            password: "",
            passwordConfirmation: "",
          }}
          validateOnMount={true}
          onSubmit={(values) => navigation.navigate("GeneralInfo", values)}
          validationSchema={registerValidationSchema}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            touched,
            errors,
            isValid,
          }) => (
            <ContentForm>
              <Subtitle align="center">Crie uma nova conta</Subtitle>
              <VStack space={3} mt="5" paddingBottom={30}>
                <InputNumber
                  label="Matrícula"
                  touched={touched.registration}
                  errors={errors.registration}
                  config={{
                    placeholder: "Digite seu nome",
                    onChangeText: handleChange("registration"),
                    onBlur: handleBlur("registration"),
                    value: values.registration,
                  }}
                />

                <InputText
                  label="Nome"
                  touched={touched.name}
                  errors={errors.name}
                  config={{
                    placeholder: "Digite seu nome",
                    onChangeText: handleChange("name"),
                    onBlur: handleBlur("name"),
                    value: values.name,
                  }}
                />

                <InputText
                  label="Sobrenome"
                  touched={touched.lastname}
                  errors={errors.lastname}
                  config={{
                    placeholder: "Digite seu sobrenome",
                    onChangeText: handleChange("lastname"),
                    onBlur: handleBlur("lastname"),
                    value: values.lastname,
                  }}
                />

                <InputText
                  label="Email"
                  touched={touched.email}
                  errors={errors.email}
                  config={{
                    placeholder: "Digite seu nome",
                    keyboardType: "email-address",
                    onChangeText: handleChange("email"),
                    onBlur: handleBlur("email"),
                    value: values.email,
                  }}
                />

                <InputText
                  label="Usuário"
                  touched={touched.username}
                  errors={errors.username}
                  config={{
                    placeholder: "Digite seu usuário",
                    onChangeText: handleChange("username"),
                    onBlur: handleBlur("username"),
                    value: values.username,
                  }}
                />

                <ConfirmPassword
                  password={{
                    config: {
                      onChangeText: handleChange("password"),
                      onBlur: handleBlur("password"),
                      value: values.password,
                      placeholder: "Digite sua senha",
                    },
                    touched: touched.password,
                    errors: errors.password,
                  }}
                  confirmPassword={{
                    config: {
                      onChangeText: handleChange("passwordConfirmation"),
                      onBlur: handleBlur("passwordConfirmation"),
                      value: values.passwordConfirmation,
                      placeholder: "Confirme sua senha",
                    },
                    touched: touched.passwordConfirmation,
                    errors: errors.passwordConfirmation,
                  }}
                />

                <Button
                  isDisabled={!isValid}
                  marginTop={30}
                  onPress={() => handleSubmit()}
                >
                  <H5 color={theme.colors.white}>Próximo</H5>
                </Button>
              </VStack>
            </ContentForm>
          )}
        </Formik>
      </Container>
    </KeyboardAvoidingView>
  );
}
