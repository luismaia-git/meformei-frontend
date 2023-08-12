import { View } from "native-base";
import { Platform, StatusBar } from "react-native";
import { useTheme } from "../../../hooks/useTheme";

interface CustomizedStatusBar {
  backgroundColor?: string;
}

export function CustomizedStatusBar({ backgroundColor }: CustomizedStatusBar) {
  const height = Platform.OS === "ios" ? 12 : 0;
  const theme = useTheme();
  const bg = backgroundColor ? backgroundColor : theme.theme.colors.background;
  return (
    <View height={height} background={bg}>
      <StatusBar
        backgroundColor={bg}
        barStyle={theme.isDark ? "light-content" : "dark-content"}
      />
    </View>
  );
}
