import { VStack, View, Button, HStack } from "native-base";
import { BorderedContent, Container } from "../styles";
import { Header, Loading, SelectMultiple } from "../../../components/layout";
import { useTheme } from "styled-components";
import { InputSelect } from "../../../components/layout/UI";
import { KeyboardAvoidingView, Platform } from "react-native";
import { H5 } from "../../../components/shared/text";
import { CustomizedStatusBar } from "../../../components/layout/CustomizedStatusBar";
import { Formik } from "formik";
import * as yup from "yup";
import { useCourseHistory } from "../../../hooks/useCourseHistory";
import { useNavigation } from "@react-navigation/native";
import { DisciplineProp } from "../../../types/types";
import { useEffect } from "react";
import { useDisciplines } from "../../../servicesHooks/useDisciplines";
import { CourseHistoryRegisterBodyRequest, DisciplineProgress, ProgressDataRegister, courseHistoryBodyRequest } from "CourseHistory";
import { showMessage } from "react-native-flash-message";


export function DisciplineRegister() {
  const theme = useTheme();
  const { loading } = useCourseHistory();
  const { curriculumDisciplines, postCourseHistory, getDisciplinesfromCurriculum } = useCourseHistory();

  const navigation = useNavigation<DisciplineProp>();

  useEffect(() => {
    console.log("DisciplineRegister useEffect")
    // console.log("tam: ", curriculumDisciplines?.disciplines?.length)
    // curriculumDisciplines?.disciplines?.map((d) => { console.log(d.disciplineId) })
    getDisciplinesfromCurriculum()
    console.log("tam: ", curriculumDisciplines?.disciplines?.length)
  }, [])

  let DisciplineRegisterValidationSchema = yup.object().shape({
    disciplines: yup.array().min(1, "Selecione pelo menos uma disciplina."),
    semester: yup.string().required("O período é obrigatório."),
    status: yup.string().required("O status é obrigatório."),
  });

  const toFormationPlanList = (goBack: boolean) => {
    if(goBack) {
      navigation.goBack()
    } 
  }
  
  
  const submit = (values: any) => {
    console.log("submit")
    const data = {
      disciplines: values.disciplines.map((d: courseHistoryBodyRequest) => {return {...d, status: values.status, daysWeek: ["SEG", "QUA"]}}),
    } as CourseHistoryRegisterBodyRequest
     const disciplineProgress : DisciplineProgress[] = values.disciplines.map((d: courseHistoryBodyRequest) => { return { status: values.status, workload: d.hours } })
      const progressData : ProgressDataRegister = { disciplineProgress: disciplineProgress }
    postCourseHistory(Number(values.semester), data, progressData, toFormationPlanList)
  }

  return (
    <Container>
      {loading ? (<Loading></Loading>) : (<><CustomizedStatusBar />
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
              disciplines: [],
            }}
            onSubmit={(values) => submit(values)}
            validateOnMount
            validationSchema={DisciplineRegisterValidationSchema}
          >
            {({ handleChange, handleBlur, handleSubmit, values, isValid, setFieldValue, errors}) => (
              <BorderedContent>
                <VStack space={6} mt="5" paddingBottom={30}>
                  <SelectMultiple
                    label="Disciplina(s)"
                    data={curriculumDisciplines?.disciplines!}
                    onChange={(selected) => setFieldValue('disciplines', selected)}
                    // data={[
                    //   {
                    //     id: 0,
                    //     name: "Aprendizado e Manutenção de Máquinas de Vencer",
                    //     cod: "CK0215",
                    //   },
                    //   {
                    //     id: 1,
                    //     name: "Processamento de Imagens",
                    //     cod: "CK0215",
                    //   },
                    //   {
                    //     id: 2,
                    //     name: "Teoria da Computação",
                    //     cod: "CK0215",
                    //   },
                    //   {
                    //     id: 3,
                    //     name: "Construção e Análise de Algoritmos",
                    //     cod: "CK0215",
                    //   },
                    //   {
                    //     id: 4,
                    //     name: "Circuitos Digitais",
                    //     cod: "CK0215",
                    //   },
                    //   {
                    //     id: 5,
                    //     name: "Programação",
                    //     cod: "CK0215",
                    //   },
                    //   {
                    //     id: 6,
                    //     name: "Engenharia de Software",
                    //     cod: "CK0215",
                    //   },
                    //   {
                    //     id: 7,
                    //     name: "Computação Gráfica",
                    //     cod: "CK0215",
                    //   },
                    //   {
                    //     id: 8,
                    //     name: "Lógica para Ciência da computação",
                    //     cod: "CK0215",
                    //   },
                    //   {
                    //     id: 9,
                    //     name: "Seminário em Computação",
                    //     cod: "CK0215",
                    //   },
                    //   {
                    //     id: 10,
                    //     name: "Informática e Sociedade",
                    //     cod: "CK0215",
                    //   },
                    // ]}
                    placeholder="Selecione a(s) disciplina(s)"
                  />

                  <InputSelect
                    config={{ 
                      placeholder: "Selecione o status da disciplina", 
                      onValueChange: handleChange("status") 
                    }}
                    values={[
                      { label: "Concluída", value: "DONE" },
                      { label: "Em andamento", value: "INPROGRESS" },
                      { label: "Reprovada", value: "FAILED" },
                      { label: "Trancada", value: "WITHDRAWAL" },
                    ]}
                    label="Status"
                    errors={errors.status}
                  />
                  <InputSelect
                    config={{ 
                      placeholder: "Selecione o período da disciplina",
                      onValueChange: handleChange("semester")
                    }}
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

                    label="Período"
                  />

                  <HStack space={3}>
                    <Button 
                      flex={1} 
                      marginTop={30} 
                      mt="5" 
                      isLoading={loading} 
                      isDisabled={!isValid}
                      onPress={() => handleSubmit()}
                    >
                      <H5 color={theme.colors.white}>Adicionar</H5>
                    </Button>
                    <Button flex={1} variant="outline" marginTop={30} mt="5" onPress={() =>
                      navigation.goBack()
                    }>
                      <H5 color={theme.colors.text}>Cancelar</H5>
                    </Button>
                  </HStack>
                </VStack>
              </BorderedContent>
            )}
          </Formik>
        </KeyboardAvoidingView></>)}
    </Container>
  );
}