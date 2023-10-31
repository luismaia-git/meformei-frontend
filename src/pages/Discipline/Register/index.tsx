import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { VStack, View, Button, HStack } from "native-base";
import { BorderedContent, Container } from "../styles";
import { Header, SelectMultiple } from "../../../components/layout";
import { useTheme } from "styled-components";
import { InputSelect } from "../../../components/layout/UI";
import { KeyboardAvoidingView, Platform } from "react-native";
import { H5 } from "../../../components/shared/text";
import { CustomizedStatusBar } from "../../../components/layout/CustomizedStatusBar";
import * as yup from "yup";
import { Formik } from "formik";
import { useCourseHistory } from "../../../hooks/useCourseHistory";
import { useEffect, useState } from "react";
import { disciplineResponse } from "CourseHistory";
import { curriculums } from "../../../service/curriculums";

export function DisciplineRegister() {
  const theme = useTheme();
  const { loading, getDisciplines } = useCourseHistory()
  const navigation = useNavigation<any>();
  const [disciplines, setDisciplines] = useState<disciplineResponse[]>([]);
  useEffect(() => {
    console.log("useEffect DisciplineRegister")
    const res = getDisciplines('3')
  }, []);

  let DisciplineRegisterValidationSchema = yup.object().shape({

  });

  const toFormationPlanList = (goBack: boolean) => {
    if (goBack) navigation.goBack()
  }

  async function submit(values: any) {
    // const data = { status: values.status} as courseHistoryRequest
    // const isPeriodDifferent = Number(values.period) != params.period
    // if(isPeriodDifferent) data.semester = Number(values.period)
    // patchCourseHistory(params.discipline.courseHistoryId, data, toFormationPlanList);
    console.log("submit")
    console.log(values)
  }

  return (
    <Container>
      <CustomizedStatusBar />
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: theme.colors.background }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={{ padding: 20 }}>
          <Header
            isSpaced={false}
            backButton
            colorIcon={theme.colors.text}
            colorText={theme.colors.text}
            title="Adicionar Disciplina"
          />
        </View>
        <Formik
        initialValues={{
          status: "",
          period: "",
        }}
          validateOnMount={true}
          onSubmit={(values) => submit(values)}
          validationSchema={DisciplineRegisterValidationSchema}
        >
          {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
            <BorderedContent>
              <VStack space={6} mt="5" paddingBottom={30}>
                label={"Disciplina(s)"}
                <SelectMultiple
                  data={[
                    {
                      id: 0,
                      name: "Aprendizado e Manutenção de Máquinas de Vencer",
                      cod: "CK0215",
                    },
                    {
                      id: 1,
                      name: "Processamento de Imagens",
                      cod: "CK0215",
                    },
                    {
                      id: 2,
                      name: "Teoria da Computação",
                      cod: "CK0215",
                    },
                    {
                      id: 3,
                      name: "Construção e Análise de Algoritmos",
                      cod: "CK0215",
                    },
                    {
                      id: 4,
                      name: "Circuitos Digitais",
                      cod: "CK0215",
                    },
                    {
                      id: 5,
                      name: "Programação",
                      cod: "CK0215",
                    },
                    {
                      id: 6,
                      name: "Engenharia de Software",
                      cod: "CK0215",
                    },
                    {
                      id: 7,
                      name: "Computação Gráfica",
                      cod: "CK0215",
                    },
                    {
                      id: 8,
                      name: "Lógica para Ciência da computação",
                      cod: "CK0215",
                    },
                    {
                      id: 9,
                      name: "Seminário em Computação",
                      cod: "CK0215",
                    },
                    {
                      id: 10,
                      name: "Informática e Sociedade",
                      cod: "CK0215",
                    },
                  ]}
                  onChange={() => console.log()}
                  placeholder="Selecione a disciplina"
                />

                <InputSelect
                  config={{ placeholder: "Selecione o status da disciplina" }}
                  values={[
                    { label: "Em andamento", value: "INPROGRESS" },
                    { label: "A Fazer", value: "TODO" },
                    { label: "Concluída", value: "DONE" },
                    { label: "Trancada", value: "WITHDRAWAL" },
                    { label: "Reprovada", value: "FAILED" },
                  ]}
                  defaultValue="INPROGRESS"
                  label="Status"
                />
                <InputSelect
                  config={{ placeholder: "Selecione o período da disciplina" }}
                  values={[
                    { label: "Período 1", value: "1" },
                    { label: "Período 2", value: "2" },
                    { label: "Período 3", value: "3" },
                    { label: "Período 4", value: "4" },
                    { label: "Período 5", value: "5" },
                    { label: "Período 6", value: "6" },
                    { label: "Período 7", value: "7" },
                    { label: "Período 8", value: "8" },
                  ]}
                  defaultValue="1"
                  label="Período"
                />

                <HStack space={3}>
                  <Button flex={1} marginTop={30} mt="5" isLoading={loading} onPress={() =>
                    handleSubmit()
                  }>
                    <H5 color={theme.colors.white}>Adicionar</H5>
                  </Button>
                  <Button flex={1} variant="outline" marginTop={30} mt="5" onPress={ () => navigation.goBack() }>
                    <H5 color={theme.colors.text}>Cancelar</H5>
                  </Button>
                </HStack>
              </VStack>
            </BorderedContent>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </Container>
  );
}
