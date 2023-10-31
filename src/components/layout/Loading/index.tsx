import { ActivityIndicator, Button, Text, View } from "react-native";
import { useTheme } from "../../../hooks/useTheme";
import { CustomizedStatusBar } from "../CustomizedStatusBar";
import { Container, Container2 } from "./styles";
import { useEffect } from "react";

interface LoadingProps {
  opacity?: boolean;
}
export function Loading({ opacity = true }: LoadingProps) {
  const { theme } = useTheme();

  // useEffect(() => {
  //   () => {setTimeout(() => {
  //     console.log("Function has waited for 5 seconds.");
  //     // Place the code you want to execute after the 5-second delay here.
  //   }, 10000);}
  // }, []);

  return (
    <Container2>
      <CustomizedStatusBar backgroundColor={theme.colors.red[500]} />
        <ActivityIndicator
          size="large"
          color={opacity ? theme.colors.white : '#FF0000'}
        />
    </Container2>
  );
}
