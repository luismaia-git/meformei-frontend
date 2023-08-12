import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Button, Icon } from "native-base";
import { Dimensions } from "react-native";
import { useTheme } from "styled-components";
import { UserLoginNavigationProp } from "../../../../types/types";
import { H5, Subtitle, Title } from "../../../shared/text";
import { CustomizedStatusBar } from "../../CustomizedStatusBar";
import { Container, IconContent, TextContent } from "./styles";

export function FailedRegister() {
  const navigation = useNavigation<UserLoginNavigationProp>();
  const theme = useTheme();

  // const { params } =
  //   useRoute<RouteProp<UserLoginNavigatorParamList, "GeneralInfo">>();

  return (
    <Container>
      <CustomizedStatusBar backgroundColor={theme.colors.red[500]} />

      <IconContent style={{ height: Dimensions.get("window").height / 2.5 }}>
        <Icon
          as={AntDesign}
          name="closecircle"
          size="120"
          color={theme.colors.background}
        />
      </IconContent>
      <TextContent style={{ height: Dimensions.get("window").height / 1 }}>
        <Title color={theme.colors.red[500]}>Ops!</Title>
        <Subtitle
          align="center"
          style={{ paddingTop: 20 }}
          size={14}
          color={theme.colors.text}
        >
          Seu cadastro não pôde ser finalizado. Usuário já existe.
        </Subtitle>
        <Button
          onPress={() => navigation.navigate("Login")}
          borderRadius={10}
          backgroundColor={theme.colors.red[500]}
          width={100}
          marginTop={5}
        >
          <H5 color={theme.colors.white}>Voltar</H5>
        </Button>
      </TextContent>
    </Container>
  );
}
