import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useColorScheme } from "react-native";
import themes, { ITheme } from "../styles/themes";
import { colorModeManager } from "../utils/storange";

export interface ICustomizedTheme {
  theme: ITheme;
  colorMode: string;
  setTheme: (theme: ITheme) => void;
  toggleColorMode: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ICustomizedTheme>({} as ICustomizedTheme);

export function CustomizedThemeProvider({ children }: { children: ReactNode }) {
  const deviceTheme = useColorScheme();
  const [theme, setTheme] = useState(themes.light);
  const [colorMode, setColorMode] = useState<string>("light");

  const isDark = useMemo(() => {
    return colorMode === "dark";
  }, [colorMode]);

  const toggleColorMode = async () => {
    const color = colorMode === "light" ? "dark" : "light";
    setTheme(themes[color]);
    setColorMode(color);
    await colorModeManager.set(color);
  };

  useEffect(() => {
    const color = async () => {
      await colorModeManager.get().then((color) => {
        if (!color) {
          if (deviceTheme) {
            setTheme(themes[deviceTheme]);
            setColorMode(deviceTheme);
          }
        } else {
          const c = color === "dark" ? themes.dark : themes.light;
          setTheme(c);
          setColorMode(color);
        }
      });
    };
    color();
  }, []);

  const providerValue = useMemo(
    () => ({ theme, colorMode, setTheme, toggleColorMode, isDark }),
    [theme, colorMode, setTheme, toggleColorMode, isDark]
  );

  return (
    <ThemeContext.Provider value={providerValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
