import { TouchableHighlight } from "react-native";
import { Container } from "./styles";
import { useTheme } from "styled-components";
import { Icon, View } from "native-base";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { H5 } from "../../shared/text";

export function AdminContactCard() {
  const theme = useTheme();

  return (
    <TouchableHighlight
      style={{ borderRadius: 10, marginBottom: 8 }}
      activeOpacity={0.9}
    >
      <Container space={5}>
        <Icon
          as={Ionicons}
          name="ios-warning-outline"
          size={45}
          color={theme.colors.orange[500]}
        />
        <H5 style={{ flex: 1, flexWrap: "wrap" }}>
          Não encontrou alguma disciplina? Contate o administrador do seu curso
          e solicite o cadastro.
        </H5>
      </Container>
    </TouchableHighlight>
  );
}
