import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Formik } from "formik";
import { Button, HStack, VStack, View } from "native-base";
import { KeyboardAvoidingView, Platform } from "react-native";
import { useTheme } from "styled-components";
import { Header } from "../../../components/layout";
import { CustomizedStatusBar } from "../../../components/layout/CustomizedStatusBar";
import { InputSelect } from "../../../components/layout/UI";
import { H5, Subtitle } from "../../../components/shared/text";
import { useUser } from "../../../hooks/useUser";
import { DisciplineParamList } from "../../../types/types";
import { BorderedContent, Container } from "../styles";
import * as yup from "yup";
import { useCourseHistory } from "../../../hooks/useCourseHistory";
import { courseHistoryRequest } from "../../../service/students";
import { useState } from "react";

interface ProgressData {
  oldStatus: string;
  workload: number;
} 


export function DisciplineEdit() {
  const theme = useTheme();
  const { user } = useUser();
  const { patchCourseHistory, loading } = useCourseHistory();
  const { params } =
    useRoute<RouteProp<DisciplineParamList, "DisciplineEdit">>();
  console.log(params.discipline.courseHistoryId)
  const navigation = useNavigation<any>();

  let initialValuesForm = {
    status: params.discipline.status,
    period: params.period.toString(),
  }

  let DisciplineEditValidationSchema = yup.object().shape({
    status: yup.string().required("O status é obrigatório."),
    period: yup.string().required("O período é obrigatório."),
  });

  const toFormationPlanList = (goBack: boolean) => {
    if(goBack) navigation.goBack()
  }

  async function submit(values: any) {
    const data = { status: values.status} as courseHistoryRequest
    const isPeriodDifferent = Number(values.period) != params.period
    if(isPeriodDifferent) data.semester = Number(values.period)
    let oldStatus
    const progressData = {} as  ProgressData
    if(params.discipline.status != values.status){
      oldStatus = params.discipline.status
      progressData.oldStatus = params.discipline.status
      progressData.workload = params.discipline.workload
    }
    patchCourseHistory(params.discipline.courseHistoryId, data, progressData, toFormationPlanList);
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
            title="Editar Disciplina"
          />
        </View>

        <Formik
          initialValues={initialValuesForm}
          validateOnMount
          onSubmit={(values) => submit(values)}
          validationSchema={DisciplineEditValidationSchema}
        >
          {({ handleChange, handleBlur, handleSubmit, values, isValid, touched }) => (

            <BorderedContent>
              <VStack space={6} mt="5" paddingBottom={30}>

                <H5 color={theme.colors.trueGray[400]}>#{params.discipline.cod}</H5>
                <Subtitle color={theme.colors.text} size={19}>
                  {params.discipline.name}
                </Subtitle>

                <InputSelect
                  config={{ 
                    placeholder: "Selecione o status da disciplina", 
                    onValueChange: handleChange("status") 
                  }}
                  touched={touched.status}
                  values={[
                    { label: "Concluída", value: "DONE" },
                    { label: "Em andamento", value: "INPROGRESS" },
                    { label: "Reprovada", value: "FAILED" },
                    { label: "Trancada", value: "WITHDRAWAL" },
                  ]}
                  defaultValue={params.discipline.status}
                  /**{ label: params.discipline.status, value: params.discipline.status } */
                  label="Status"
                />
                <InputSelect
                  config={{ placeholder: "Selecione o período da disciplina", onValueChange: handleChange("period") }}
                  touched={touched.period}
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
                  defaultValue={params.period.toString()}
                  label="Período"
                />


                <HStack space={3}>
                  <Button 
                    flex={1} 
                    marginTop={30} 
                    mt="5" 
                    isLoading={loading} 
                    isDisabled={(!isValid || !(initialValuesForm.status !== values.status || initialValuesForm.period !== values.period)) }
                    onPress={() => {console.log("isValid: ", isValid); console.log("status comparacao: ", initialValuesForm.period == values.period) }}
                    >
                    <H5 color={theme.colors.white}>Confirmar</H5>
                  </Button>
                  <Button flex={1} variant="outline" marginTop={30} mt="5" onPress={ () => navigation.goBack() } >
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

