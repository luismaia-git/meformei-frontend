import { Dimensions } from "react-native";
import { Container, IconContent, TextContent } from "./styles";
import { H5, Subtitle, Title } from "../../../shared/text";
import { Button, Icon } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { UserLoginNavigationProp } from "../../../../types/types";

export function SucessRegister() {
  const theme = useTheme();
  const navigation = useNavigation<UserLoginNavigationProp>();

  return (
    <Container>
      <IconContent style={{ height: Dimensions.get("window").height / 2.5 }}>
        <Icon
          as={AntDesign}
          name="checkcircle"
          size="120"
          color={theme.colors.background}
        />
      </IconContent>
      <TextContent style={{ height: Dimensions.get("window").height / 1 }}>
        <Title>Tudo certo!</Title>
        <Subtitle
          align="center"
          style={{ paddingTop: 20 }}
          size={14}
          color={theme.colors.text}
        >
          Seu cadastro foi concluído com sucesso! Agora você pode acessar a
          plataforma.
        </Subtitle>
        <Button
          onPress={() => navigation.navigate("Login")}
          borderRadius={10}
          width={100}
          marginTop={5}
        >
          <H5 color={theme.colors.white}>Começar</H5>
        </Button>
      </TextContent>
    </Container>
  );
}
