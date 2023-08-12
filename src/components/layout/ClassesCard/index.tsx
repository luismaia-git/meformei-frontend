import { View } from "react-native";
import { Container } from "./styles";
import { Classe } from "Discipline";
import { H5 } from "../../shared/text";
import { useTheme } from "styled-components";
import { HStack } from "native-base";
import { zeroLeftMask } from "../../../utils/masks";

export function ClassesCard({
  discipline_name,
  hour,
  isCurrent,
}: Classe) {
  const theme = useTheme();

  const start = zeroLeftMask(hour.start);
  const end = zeroLeftMask(hour.end);

  return (
    <Container current_class={isCurrent}>
      <HStack alignItems="center" justifyContent="space-between">
        <View style={{ width: "65%" }}>
          <H5
            numberOfLines={1}
            color={isCurrent ? theme.colors.black : undefined}
          >
            {discipline_name}
          </H5>
        </View>
        <View>
          <H5 color={isCurrent ? theme.colors.black : undefined} size={14}>
            {start}:00-{end}:00
          </H5>
        </View>
      </HStack>
    </Container>
  );
}
