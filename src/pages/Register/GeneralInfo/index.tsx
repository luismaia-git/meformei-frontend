import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StudentSignup } from "Auth";
import { Formik } from "formik";
import { Button, KeyboardAvoidingView, VStack } from "native-base";
import { Platform } from "react-native";
import { useTheme } from "styled-components";
import * as yup from "yup";
import { Header } from "../../../components/layout";
import { CustomizedStatusBar } from "../../../components/layout/CustomizedStatusBar";
import {
  InputSelect,
  SelectCourse,
  SelectUniversity,
} from "../../../components/layout/UI";
import { H5, Subtitle } from "../../../components/shared/text";
import { useAuth } from "../../../servicesHooks/useAuth";
import {
  UserLoginNavigationProp,
  UserLoginNavigatorParamList,
} from "../../../types/types";
import { Container, ContentForm } from "../styles";

export default function GeneralInfo() {
  const theme = useTheme();
  const navigation = useNavigation<UserLoginNavigationProp>();

  const { params } =
    useRoute<RouteProp<UserLoginNavigatorParamList, "GeneralInfo">>();

  let registerValidationSchema = yup.object().shape({
    state: yup.string().required("O estado obrigatório."),
    city: yup.string().required("A cidade é obrigatória."),
    university: yup.string().required("A universidade é obrigatória."),
    course: yup.string().required("O curso é obrigatório."),
    enrollmentSemester: yup
      .string()
      .required("O período de entrada é obrigatório."),
    enrollmentYear: yup.string().required("O ano de entrada é obrigatório."),
  });

  const { loading, postStudent } = useAuth();

  const currentYear = new Date().getFullYear();

  const toHome = (user: any) => {
    const to = user ? "SucessRegister" : "FailedRegister";
    
    navigation.navigate(to);
    navigation.reset({
      index: 0,
      routes: [{ name: to }],
    });
  };

  async function submit(values: any) {
    // const calculatedSemester =
    //   ((currentYear - Number(values.enrollmentYear)) * 12) / 6 + 1;

    const student: StudentSignup = {
      ...params,
      ...values,
      enrollmentYear: Number(values.enrollmentYear),
      enrollmentSemester: Number(values.enrollmentSemester),
      curriculumId: values.course,
    };

    await postStudent(student, toHome);
  }

  const years = new Array(currentYear - 2015 + 1)
    .fill({
      label: 2015,
      value: 2015,
    })
    .map((v, i) => {
      return { label: String(v.label + i), value: String(v.value + i) };
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
            state: "",
            city: "",
            university: "",
            course: "",
            currentSemester: "",
            enrollmentSemester: "",
            enrollmentYear: "",
          }}
          validateOnMount={true}
          onSubmit={(values) => submit(values)}
          validationSchema={registerValidationSchema}
        >
          {({ handleChange, handleSubmit, values, isValid }) => (
            <ContentForm>
              <Subtitle align="center">Informações gerais</Subtitle>
              <VStack space={3} mt="5" paddingBottom={30}>
                <InputSelect
                  config={{
                    placeholder: "Selecione seu estado",
                    onValueChange: handleChange("state"),
                    selectedValue: values.state,
                  }}
                  values={[{ label: "Ceará", value: "Ceará" }]}
                  label="Estado"
                />

                <InputSelect
                  config={{
                    placeholder: "Selecione seu município",
                    onValueChange: handleChange("city"),
                    selectedValue: values.city,
                  }}
                  values={[{ label: "Fortaleza", value: "Fortaleza" }]}
                  label="Município"
                />

                <SelectUniversity
                  config={{
                    placeholder: "Selecione sua univerdade",
                    onValueChange: handleChange("university"),
                    selectedValue: values.university,
                  }}
                  city={values.city}
                  state={values.state}
                />

                <SelectCourse
                  id={values.university}
                  config={{
                    placeholder: "Selecione seu curso",
                    onValueChange: handleChange("course"),
                    selectedValue: values.course,
                  }}
                />

                <InputSelect
                  config={{
                    placeholder: "Selecione o ano",
                    onValueChange: handleChange("enrollmentYear"),
                    selectedValue: values.enrollmentYear,
                  }}
                  values={years}
                  label="Ano de entrada"
                />

                <InputSelect
                  config={{
                    placeholder: "Seleciona o período",
                    onValueChange: handleChange("enrollmentSemester"),
                    selectedValue: values.enrollmentSemester,
                  }}
                  values={[
                    { label: "1", value: "1" },
                    { label: "2", value: "2" },
                  ]}
                  label="Período de entrada"
                />

                <Button
                  isDisabled={!isValid}
                  marginTop={30}
                  onPress={() => handleSubmit()}
                  isLoading={loading}
                >
                  <H5 color={theme.colors.white}>Criar</H5>
                </Button>
              </VStack>
            </ContentForm>
          )}
        </Formik>
      </Container>
    </KeyboardAvoidingView>
  );
}
