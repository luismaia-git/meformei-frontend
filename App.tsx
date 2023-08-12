import { GestureHandlerRootView } from "react-native-gesture-handler";
import { CustomizedThemeProvider } from "./src/hooks/useTheme";
import { PageManager } from "./src/pages";
import { NativeBaseProvider, extendTheme } from "native-base";
import themes from "./src/styles/themes";
import { UserContextProvider } from "./src/hooks/useUser";

export default function App() {
  const customTheme = extendTheme({
    colors: { primary: themes["light"].colors.primary },
    config: {
      useSystemColorMode: false,
    },
  });

  return (
    <UserContextProvider>
      <CustomizedThemeProvider>
        <NativeBaseProvider theme={customTheme}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <PageManager />
          </GestureHandlerRootView>
        </NativeBaseProvider>
      </CustomizedThemeProvider>
    </UserContextProvider>
  );
}
