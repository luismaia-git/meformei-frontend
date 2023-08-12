import { View } from "react-native";
import { H5, Subtitle, Title } from "../../shared/text";
import { Container } from "./styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ProgressBar } from "../ProgressBar";
import { useTheme } from "styled-components";
import { useTheme as useThemeNativeBase } from "native-base";

export function ProgressDiscipline() {
  const theme = useTheme();
  const { colors } = useThemeNativeBase();
  const progressByType = [
    {
      name: "Concluído",
      value: 0.8,
      color: colors.green[500],
      parcial: 1119,
      total: 3008,
    },
    {
      name: "Em Andamento",
      value: 0.04,
      color: colors.yellow[400],
      parcial: 24,
      total: 192,
    },

    {
      name: "A Fazer",
      value: 0.1,
      color: colors.cyan[500],
      parcial: 24,
      total: 192,
    },
    {
      name: "Horas não planejadas",
      value: 0.04,
      color: colors.coolGray[400],
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
          marginVertical: 10,
        }}
      >
        <Subtitle align="left" color={theme.colors.text} size={14}>
          Carga Horária: 1400/3200h
        </Subtitle>
      </View>

      <ProgressBar data={progressByType} legend hasTotal={false}/>
    </Container>
  );
}
