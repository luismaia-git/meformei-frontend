import { NativeBaseProvider, extendTheme } from "native-base";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { CourseHistoryContextProvider } from "./src/hooks/useCourseHistory";
import { CustomizedThemeProvider } from "./src/hooks/useTheme";
import { UserContextProvider } from "./src/hooks/useUser";
import { PageManager } from "./src/pages";
import themes from "./src/styles/themes";

export default function App() {
  const customTheme = extendTheme({
    colors: { primary: themes["light"].colors.primary },
    config: {
      useSystemColorMode: false,
    },
  });

  return (
    <UserContextProvider>
      <CourseHistoryContextProvider>
        <CustomizedThemeProvider>
          <NativeBaseProvider theme={customTheme}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <PageManager />
            </GestureHandlerRootView>
          </NativeBaseProvider>
        </CustomizedThemeProvider>
      </CourseHistoryContextProvider>
    </UserContextProvider>
  );
}
