import { TouchableHighlight } from "react-native";
import { Container } from "./styles";
import { VStack, useTheme as useThemeNative } from "native-base";
import { H5, Subtitle } from "../../shared/text";
import { Discipline } from "Discipline";
import { useTheme } from "../../../hooks/useTheme";

interface ProgressDisciplinesCardProps {
  data: Discipline;
  onPress: () => void;
}

export function ProgressDisciplinesCard({
  data,
  onPress,
}: ProgressDisciplinesCardProps) {
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
          <H5 color={colors.trueGray[400]}>
            #{data.isOptional ? "OPTATIVA" : "OBRIGATÓRIA"}
          </H5>
          <Subtitle color={theme.colors.text} size={19}>
            {data.name}
          </Subtitle>
          <H5 color={theme.colors.text}>
            Situação:
            <H5
              color={
                data.status === "Aprovado"
                  ? colors.green[500]
                  : data.status === "Trancado"
                  ? colors.trueGray[400]
                  : colors.red[500]
              }
            >
              {" " + data.status?.toUpperCase()}
            </H5>
          </H5>
        </VStack>
      </Container>
    </TouchableHighlight>
  );
}
