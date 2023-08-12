import { VStack, View, Button, HStack } from "native-base";
import { BorderedContent, Container } from "../styles";
import { Header, SelectMultiple } from "../../../components/layout";
import { useTheme } from "styled-components";
import { InputSelect } from "../../../components/layout/UI";
import { KeyboardAvoidingView, Platform } from "react-native";
import { H5 } from "../../../components/shared/text";
import { CustomizedStatusBar } from "../../../components/layout/CustomizedStatusBar";

export function DisciplineRegister() {
  const theme = useTheme();
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

        <BorderedContent>
          <VStack space={6} mt="5" paddingBottom={30}>
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
                { label: "Em andamento", value: "Em andamento" },
                { label: "Concluída", value: "Concluída" },
                { label: "A Fazer", value: "A Fazer" },
              ]}
              label="Status"
            />
            <InputSelect
              config={{ placeholder: "Selecione o período da disciplina" }}
              values={[
                { label: "Período atual", value: "Período atual" },
                { label: "Período 1", value: "Período 1" },
                { label: "Período 2", value: "Período 2" },
              ]}
              label="Período"
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
      </KeyboardAvoidingView>
    </Container>
  );
}
