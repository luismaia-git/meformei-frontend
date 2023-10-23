import { Icon } from "native-base";
import { H5 } from "../../shared/text";
import { Container, IconStyle } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { Animated } from "react-native";
import { RectButton } from "react-native-gesture-handler";

export function DeleteButton(
  progress: Animated.AnimatedInterpolation<string | number>,
  dragX: Animated.AnimatedInterpolation<string | number>,
  onPress: () => void
) {
  const scale = dragX.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <Container 
      onPress={onPress}
    >
      <IconStyle style={{ transform: [{ scale }] }}>
        <Icon
          as={MaterialIcons}
          name="delete-outline"
          size="4"
          color="#ffffff"
        />
        <H5 color="#ffffff" size={10}>
          Exclui
        </H5>
      </IconStyle>
    </Container>
  );
}
