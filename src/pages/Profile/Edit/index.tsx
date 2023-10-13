import { Formik } from "formik";
import { Button, HStack, VStack, View } from "native-base";
import { KeyboardAvoidingView, Platform } from "react-native";
import { useTheme } from "styled-components";
import * as yup from "yup";
import { Header } from "../../../components/layout";
import { CustomizedStatusBar } from "../../../components/layout/CustomizedStatusBar";
import { InputSelect, InputText } from "../../../components/layout/UI";
import { H5 } from "../../../components/shared/text";
import { useUser } from "../../../hooks/useUser";
import { BorderedContent, Container } from "../styles";
import { ProfileEditTO, ProfileTO, UserPatchRequest } from "User";
import { ProfilerProps } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../../servicesHooks/useAuth";

export function ProfileEdit() {
  const theme = useTheme();
  const { user, updateUser } = useUser();
  const { patchStudent } = useAuth();
  const navigation = useNavigation<any>();

  let profileEditValidationSchema = yup.object().shape({
    name: yup.string().required("O nome obrigatório."),
    lastname: yup.string().required("O sobrenome obrigatório."),
  });

  const toDetails = (goBack: any) => {
    if (goBack) {
      navigation.goBack();
    }
  };

  async function submit(values: any) {

    const student: UserPatchRequest = {
      ...values,
    };

    await patchStudent(student, toDetails);
  };
  console.log("user:", user);
  return (
    <Container
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}>
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

        <Formik
          initialValues={{
            name: user?.user.name,
            lastname: user?.user.lastname,
            city: user?.user.city,
            state: user?.user.state,
          }}
          validateOnMount={true}
          onSubmit={(values) => submit(values)}
          validationSchema={profileEditValidationSchema}
        >
          {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
            <BorderedContent>
              <VStack space={6} mt="5" paddingBottom={30}>

                <InputText
                  label="Nome"
                  config={{
                    placeholder: "Nome",
                    onChangeText: handleChange("name"),
                    onBlur: handleBlur("name"),
                    value: values.name,
                  }}
                />

                <InputText
                  label="Sobrenome"
                  config={{
                    placeholder: "Sobrenome",
                    onChangeText: handleChange("lastname"),
                    onBlur: handleBlur("lastname"),
                    value: values.lastname,
                  }}
                />

                <InputSelect
                  config={{
                    placeholder: "Estado",
                    onValueChange: handleChange("state"),
                    defaultValue: user!.user.state,
                  }}
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
                  <Button flex={1} marginTop={30} mt="5" onPress={() => handleSubmit()}>
                    <H5 color={theme.colors.white}>Confirmar</H5>
                  </Button>
                  <Button flex={1} variant="outline" marginTop={30} mt="5">
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