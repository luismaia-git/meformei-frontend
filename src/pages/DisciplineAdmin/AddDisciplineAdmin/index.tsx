import { Container } from "./styles";
import { ContentForm } from "../styles";
import { Header } from "../../../components/layout";
import { Button, VStack } from "native-base";
import {
  InputNumber,
  InputText,
} from "../../../components/layout/UI";
import { H5, Subtitle } from "../../../components/shared/text";
import { useNavigation } from "@react-navigation/native";
import { UserLoginNavigationProp } from "../../../types/types";
import { useTheme } from "styled-components";
import { CustomizedStatusBar } from "../../../components/layout/CustomizedStatusBar";
import { KeyboardAvoidingView } from "react-native";
import { Platform } from "react-native";
import * as yup from "yup";
import { Formik } from "formik";

export default function AddDisciplineAdmin() {
  const theme = useTheme();
  const navigation = useNavigation<UserLoginNavigationProp>();

  let registerValidationSchema = yup.object().shape({
    discipline: yup.string().required("O nome da disciplina é obrigatório."),
    hours: yup.number().required("As horas são obrigatórias."),
    prerequisite: yup.string().required("Os pré-requisitos são obrigatórios."),
    ementa: yup.string().required("A ementa é obrigatória."),
  });

  return (
    <Container>
      <CustomizedStatusBar backgroundColor={theme.colors.background} />
      <Header isSpaced={true}
        backButton
        colorIcon={theme.colors.text}
        colorText={theme.colors.white} />
      <Formik
        initialValues={{
          discipline: "",
          hours: "",
          prerequisite: "",
          ementa: "",
        }}
        validateOnMount={true}
        // onSubmit={(values) => navigation.navigate("GeneralInfo", values)}
        onSubmit={(value) => { }}
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
            <VStack space={3} mt="5" paddingBottom={30}>
              <InputNumber
                label="Nome da disciplina"
                touched={touched.discipline}
                errors={errors.discipline}
                config={{
                  placeholder: "Digite o nome da disciplina",
                  onChangeText: handleChange("discipline"),
                  onBlur: handleBlur("discipline"),
                  value: values.discipline,
                }}
              />

              <InputText
                label="Horas semanais"
                touched={touched.hours}
                errors={errors.hours}
                config={{
                  placeholder: "Digite as horas semanais",
                  onChangeText: handleChange("hours"),
                  onBlur: handleBlur("hours"),
                  value: values.hours,
                }}
              />

              <InputText
                label="Pré-requisitos"
                touched={touched.prerequisite}
                errors={errors.prerequisite}
                config={{
                  placeholder: "Digite os pré-requisitos",
                  onChangeText: handleChange("prerequisite"),
                  onBlur: handleBlur("prerequisite"),
                  value: values.prerequisite,
                }}
              />

              <InputText
                label="Ementa"
                touched={touched.ementa}
                errors={errors.ementa}
                config={{
                  placeholder: "Digite a ementa da disciplina",
                  onChangeText: handleChange("ementa"),
                  onBlur: handleBlur("ementa"),
                  value: values.ementa,
                }}
              />

              <Button
                disabled={!isValid}
                onPress={() => handleSubmit()}
                marginTop={30}
                mt="5"
              >
                <H5 color={theme.colors.white}>Cadastrar</H5>
              </Button>
            </VStack>
          </ContentForm>
        )}
      </Formik>
    </Container>
  );
} 
