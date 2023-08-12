import { useColorMode } from "native-base";
import { GlobalStyle } from "../styles/themes/global";
import { ThemeProvider } from "styled-components";
import Routes from "../routes";
import { useFonts } from "expo-font";
import { useCallback, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useTheme } from "../hooks/useTheme";

SplashScreen.preventAutoHideAsync();

export function PageManager() {
  const { theme, colorMode } = useTheme();

  const { setColorMode } = useColorMode();

  useEffect(() => {
    setColorMode(colorMode);
  }, [colorMode]);

  const [fontsLoaded] = useFonts({
    "Nunito-Bold": require("../assets/fonts/Nunito-Bold.ttf"),
    "Nunito-Regular": require("../assets/fonts/Nunito-Regular.ttf"),
    "Nunito-ExtraBold": require("../assets/fonts/Nunito-ExtraBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GlobalStyle onLayout={onLayoutRootView}>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </GlobalStyle>
  );
}
