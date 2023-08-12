import { VStack, View, Button, HStack } from "native-base";
import { BorderedContent, Container, DateGroup } from "../styles";
import { Header, VirtualizedScrollView } from "../../../components/layout";
import { useTheme } from "styled-components";
import {
  InputCNPJ,
  InputDate,
  InputNumber,
  InputRadio,
  InputSelect,
  InputText,
} from "../../../components/layout/UI";
import { Dimensions, KeyboardAvoidingView, Platform } from "react-native";
import { H5 } from "../../../components/shared/text";
import { CustomizedStatusBar } from "../../../components/layout/CustomizedStatusBar";

export function AdditionalHoursRegister() {
  const theme = useTheme();
  return (
    <Container>
      <CustomizedStatusBar />
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: theme.colors.background }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <VirtualizedScrollView>
          <View style={{ padding: 20 }}>
            <Header
              isSpaced={false}
              backButton
              colorIcon={theme.colors.text}
              colorText={theme.colors.text}
              title="Adicionar Atividade"
            />
          </View>
          <BorderedContent>
            <VStack space={6} mt="5" paddingBottom={30}>
              <InputRadio
                orientation="vertical"
                label="Situação"
                values={["Sem resposta", "Deferido", "Indeferido"]}
                defaultValue="Sem resposta"
              />
              <InputSelect
                config={{ placeholder: "Selecione o tipo da atividade" }}
                values={[{ label: "Ceará", value: "Ceará" }]}
                label="Tipo de atividade"
              />
              <InputSelect
                config={{ placeholder: "Selecione o tipo da participação" }}
                values={[{ label: "Ceará", value: "Ceará" }]}
                label="Tipo de participação"
              />
              <InputText
                label="Título da atividade"
                config={{ placeholder: "Digite o título da atividade" }}
              />

              <InputRadio
                label="Executada na UFC?"
                values={["Sim", "Não"]}
                defaultValue="Não"
              />

              <InputText
                label="Nome da instituição"
                config={{ placeholder: "Digite o nome da instituição" }}
              />

              <InputSelect
                config={{ placeholder: "Selecione o país da instituição" }}
                values={[{ label: "Ceará", value: "Ceará" }]}
                label="País da instituição"
              />

              <InputCNPJ
                label="CPNJ da instituição"
                config={{ placeholder: "Digite o CNPJ da instituição" }}
              />

              <DateGroup>
                <InputDate
                  config={{
                    placeholder: "DD/MM/AAAA",
                    width: Dimensions.get("window").width / 2 - 50,
                  }}
                  label="Data de início"
                />

                <InputDate
                  config={{
                    placeholder: "DD/MM/AAAA",
                    width: Dimensions.get("window").width / 2 - 50,
                  }}
                  label="Data de fim"
                />
              </DateGroup>

              <InputNumber
                label="Carga horária total"
                config={{ placeholder: "Digite a carga horária total" }}
              />
              <HStack space={3}>
                <Button flex={1} marginTop={30} mt="5">
                  <H5 color={theme.colors.white}>Adicionar</H5>
                </Button>
                <Button flex={1} variant="outline" marginTop={30} mt="5">
                  <H5 color={theme.colors.text}>Cancelar</H5>
                </Button>
              </HStack>
            </VStack>
          </BorderedContent>
        </VirtualizedScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}
