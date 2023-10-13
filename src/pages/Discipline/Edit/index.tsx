import { VStack, View, Button, HStack } from "native-base";
import { BorderedContent, Container } from "../styles";
import { Header, SelectMultiple } from "../../../components/layout";
import { useTheme } from "styled-components";
import { InputSelect, InputText } from "../../../components/layout/UI";
import { KeyboardAvoidingView, Platform } from "react-native";
import { H5, Subtitle } from "../../../components/shared/text";
import { CustomizedStatusBar } from "../../../components/layout/CustomizedStatusBar";
import { useUser } from "../../../hooks/useUser";
import { RouteProp, useRoute } from "@react-navigation/native";
import { DisciplineParamList } from "../../../types/types";

export function DisciplineEdit() {
  const theme = useTheme();
  const { user } = useUser();
  const { params } =
    useRoute<RouteProp<DisciplineParamList, "DisciplineEdit">>();

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

        <BorderedContent>
          <VStack space={6} mt="5" paddingBottom={30}>

          <H5 color={theme.colors.trueGray[400]}>#{params.discipline.cod}</H5>
          <Subtitle color={theme.colors.text} size={19}>
            {params.discipline.name}
          </Subtitle>
          
          <InputSelect
              config={{ placeholder: "Selecione o status da disciplina" }}
              values={[
                { label: "Em andamento", value: "Em andamento" },
                { label: "Concluída", value: "Concluída" },
                { label: "A Fazer", value: "A Fazer" },
              ]}
              defaultValue="Em andamento"
              label="Status"
            />
            <InputSelect
              config={{ placeholder: "Selecione o período da disciplina" }}
              values={[
                { label: "Período atual", value: "Período atual" },
                { label: "Período 1", value: "Período 1" },
                { label: "Período 2", value: "Período 2" },
              ]}
              defaultValue="Período atual"
              label="Período"
            />


            <HStack space={3}>
              <Button flex={1} marginTop={30} mt="5">
                <H5 color={theme.colors.white}>Confirmar</H5>
              </Button>
              <Button flex={1} variant="outline" marginTop={30} mt="5">
                <H5 color={theme.colors.text}>Cancelar</H5>
              </Button>
            </HStack>
          </VStack>
        </BorderedContent>
      </KeyboardAvoidingView>
    </Container>
  );
}

