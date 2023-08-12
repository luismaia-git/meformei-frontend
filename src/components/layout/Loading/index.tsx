import { ActivityIndicator } from "react-native";
import { useTheme } from "../../../hooks/useTheme";
import { CustomizedStatusBar } from "../CustomizedStatusBar";
import { Container } from "./styles";

interface LoadingProps {
  opacity?: boolean;
}
export function Loading({ opacity = true }: LoadingProps) {
  const { theme } = useTheme();
  return (
    <Container isOpacity={opacity}>
      <CustomizedStatusBar backgroundColor={theme.colors.red[500]} />
      <ActivityIndicator
        size="large"
        color={opacity ? theme.colors.white : theme.colors.text}
      />
    </Container>
  );
}
