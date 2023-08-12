import { DisciplineData } from "Discipline";
import { VStack, useTheme as useThemeNative } from "native-base";
import { TouchableHighlight } from "react-native";
import { useTheme } from "../../../hooks/useTheme";
import { H5, Subtitle } from "../../shared/text";
import { Container } from "./styles";

interface DisciplineCardProps {
  data: DisciplineData;
  onPress: () => void;
}

export function DisciplineCard({ data, onPress }: DisciplineCardProps) {
  const { colors } = useThemeNative();
  const { theme } = useTheme();

  return (
    <TouchableHighlight
      style={{ borderRadius: 10, margin: 0 }}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <Container>
        <VStack space={1}>
          <H5 color={colors.trueGray[400]}>#{data.cod}</H5>
          <Subtitle color={theme.colors.text} size={19}>
            {data.name}
          </Subtitle>
          <H5 color={theme.colors.text}>Carga horária: {data.workload}h</H5>
          <H5 color={theme.colors.text}>
            Pré-requisitos:{" "}
            {data.prerequisites.length > 0
              ? data.prerequisites.map((pr, i) => (
                  <H5 key={`${pr}_${i}`} color={theme.colors.primary[500]}>
                    {pr}
                    {i !== data.prerequisites.length - 1 && ", "}
                  </H5>
                ))
              : "-"}
          </H5>
        </VStack>
      </Container>
    </TouchableHighlight>
  );
}
