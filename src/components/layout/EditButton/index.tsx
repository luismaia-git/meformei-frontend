import { Icon } from "native-base";
import { H5 } from "../../shared/text";
import { Container, IconStyle } from "./styles";
import { Feather } from "@expo/vector-icons";
import { Animated } from "react-native";

export function EditButton(
  progress: Animated.AnimatedInterpolation<string | number>,
  dragX: Animated.AnimatedInterpolation<string | number>
) {
  const scale = dragX.interpolate({
    inputRange: [0, 50],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  return (
    <Container>
      <IconStyle style={{ transform: [{ scale }] }}>
        <Icon as={Feather} name="edit" size="4" color="#ffffff" />
        <H5 color="#ffffff" size={10}>
          EDITAR
        </H5>
      </IconStyle>
    </Container>
  );
}
