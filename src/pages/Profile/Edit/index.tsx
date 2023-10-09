import { VStack, View, Button, HStack } from "native-base";
import { BorderedContent, Container } from "../styles";
import { Header, SelectMultiple } from "../../../components/layout";
import { useTheme } from "styled-components";
import { InputSelect, InputText } from "../../../components/layout/UI";
import { KeyboardAvoidingView, Platform } from "react-native";
import { H5 } from "../../../components/shared/text";
import { CustomizedStatusBar } from "../../../components/layout/CustomizedStatusBar";
import { useUser } from "../../../hooks/useUser";

export function ProfileEdit() {
  const theme = useTheme();
  const { user, updateUser } = useUser();
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
            title="Editar Perfil"
          />
        </View>

        <BorderedContent>
          <VStack space={6} mt="5" paddingBottom={30}>

            <InputText
              label="Nome"
              defaultValue={user!.user.name}
              config={{ placeholder: "Nome" }}
            />

            <InputText
              label="Sobrenome"
              defaultValue={user!.user.lastname}
              config={{ placeholder: "Sobrenome" }}
            />

            <InputSelect
              config={{ placeholder: "Estado" }}
              values={[
                { label: "AC", value: "AC" },
                { label: "AL", value: "AL" },
                { label: "AP", value: "AP" },
                { label: "AM", value: "AM" },
                { label: "BA", value: "BA" },
                { label: "CE", value: "CE" },
                { label: "DF", value: "DF" },
                { label: "ES", value: "ES" },
                { label: "GO", value: "GO" },
                { label: "MA", value: "MA" },
                { label: "MT", value: "MT" },
                { label: "MS", value: "MS" },
                { label: "MG", value: "MG" },
                { label: "PA", value: "PA" },
                { label: "PB", value: "PB" },
                { label: "PR", value: "PR" },
                { label: "PE", value: "PE" },
                { label: "PI", value: "PI" },
                { label: "RR", value: "RR" },
                { label: "RO", value: "RO" },
                { label: "RJ", value: "RJ" },
                { label: "RN", value: "RN" },
                { label: "RS", value: "RS" },
                { label: "SC", value: "SC" },
                { label: "SP", value: "SP" },
                { label: "SE", value: "SE" },
                { label: "TO", value: "TO" }
              ]}
              label="Estado"
            />

            <InputText
              label="Cidade"
              defaultValue={user!.user.city}
              config={{ placeholder: "Cidade" }}
            />

            <HStack space={3}>
              <Button flex={1} marginTop={30} mt="5"  onPress={ () => }>
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
