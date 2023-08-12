import { Icon } from "native-base";
import { H5 } from "../../shared/text";
import { Container, IconStyle } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { Animated } from "react-native";

export function DeleteButton(
  progress: Animated.AnimatedInterpolation<string | number>,
  dragX: Animated.AnimatedInterpolation<string | number>
) {
  const scale = dragX.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <Container>
      <IconStyle style={{ transform: [{ scale }] }}>
        <Icon
          as={MaterialIcons}
          name="delete-outline"
          size="4"
          color="#ffffff"
        />
        <H5 color="#ffffff" size={10}>
          Exluir
        </H5>
      </IconStyle>
    </Container>
  );
}
