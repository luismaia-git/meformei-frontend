import { Divider, VStack, View, useTheme } from "native-base";
import { Subtitle } from "../../shared/text";
import { Container } from "./styles";
import { useTheme as useThemeHook } from "../../../hooks/useTheme";

interface HourSectionProps {
  day: number;
}

export function HourSection({ day }: HourSectionProps) {
  const { theme } = useThemeHook();
  const { colors } = useTheme();

  const hours = [
    {
      hour: "08:00",
      classes: [
        { name: "Engenharia de Software", color: "#F9D1DA" },
        { name: "Engenharia de Software", color: "#F9D1DA" },
      ],
    },
    { hour: "10:00", classes: [] },
    {
      hour: "14:00",
      classes: [
        { name: "Aprendizado de Máquina", color: "#FFFAC8" },
        { name: "Aprendizado de Máquina", color: "#FFFAC8" },
      ],
    },
    {
      hour: "16:00",
      classes: [
        { name: "Computação Gráfica II", color: "#CBE5C0" },
        { name: "Computação Gráfica II", color: "#CBE5C0" },
      ],
    },
    { hour: "18:00", classes: [] },
    { hour: "20:00", classes: [] },
    { hour: "22:00", classes: [] },
  ];

  return (
    <Container showsVerticalScrollIndicator={false}>
      <VStack space={3} marginY={3}>
        {hours.map((h, i) => {
          return (
            <View key={`${h.hour}_${i}`}>
              <Subtitle
                size={14}
                color={
                  h.classes.length > 0
                    ? theme.colors.text
                    : colors.trueGray[400]
                }
              >
                {h.hour}
              </Subtitle>
              <VStack space={3} marginY={3}>
                {h.classes.map((c, j) => {
                  return (
                    <View
                      key={`${c.name}_${j}`}
                      style={{
                        backgroundColor: c.color,
                        padding: 8,
                        borderRadius: 10,
                      }}
                    >
                      <Subtitle size={14} color={theme.colors.primary[900]}>
                        {c.name}
                      </Subtitle>
                    </View>
                  );
                })}
              </VStack>
              <Divider />
            </View>
          );
        })}
      </VStack>
    </Container>
  );
}
