import { View } from "react-native";
import { H5, Subtitle, Title } from "../../shared/text";
import { Container } from "./styles";
import { ProgressBar } from "../ProgressBar";
import { useTheme } from "styled-components";
import { useTheme as useThemeNativeBase } from "native-base";

export function ProgressCourse() {
  const theme = useTheme();
  const { colors } = useThemeNativeBase();
  const progressByType = [
    {
      name: "Disciplinas",
      value: 0.6,
      color: colors.primary[500],
      parcial: 1119,
      total: 3008,
    },
    {
      name: "Horas complementares",
      value: 0.12,
      color: colors.yellow[400],
      parcial: 24,
      total: 192,
    },
  ];

  return (
    <Container>
      <H5 size={14} color={theme.colors.primary[500]}>
        Progresso
      </H5>
      <View
        style={{
          flexDirection: "row",
          alignItems: "baseline",
          justifyContent: "space-between",
        }}
      >
        <Title color={theme.colors.text} size={30}>
          72%
        </Title>
        <Subtitle color={theme.colors.text} size={14}>
          Carga Horária: 1400/3200h
        </Subtitle>
      </View>

      <ProgressBar data={progressByType} legend />
    </Container>
  );
}
