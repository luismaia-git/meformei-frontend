import { Container } from "./styles";
import { VStack, useTheme as useThemeNative } from "native-base";
import { H5, Subtitle } from "../../shared/text";
import { Discipline } from "Discipline";
import { useTheme } from "../../../hooks/useTheme";
import { Swipeable, TouchableHighlight } from "react-native-gesture-handler";
import { EditButton } from "../EditButton";
import { DeleteButton } from "../DeleteButton";

interface SwipedDisciplineCardProps {
  data: Discipline;

  item_key: number;
  rowRefs: Map<number, Swipeable>;
  onSwipeableWillOpen: (index: number) => void;
  handleRight: (index: number) => void;
  handleLeft: (index: number) => void;
  onPress: () => void;
}

export function SwipedDisciplineCard({
  data,
  item_key,
  rowRefs,
  onSwipeableWillOpen,
  handleRight,
  handleLeft,
  onPress,
}: SwipedDisciplineCardProps) {
  const { colors } = useThemeNative();
  const { theme } = useTheme();

  return (
    <Swipeable
      key={item_key}
      ref={(ref) => {
        if (ref && !rowRefs.get(item_key)) {
          rowRefs.set(item_key, ref);
        }
      }}
      renderLeftActions={EditButton}
      renderRightActions={DeleteButton}
      onSwipeableRightOpen={() => handleRight(item_key)}
      onSwipeableLeftOpen={() => handleLeft(item_key)}
      onSwipeableWillOpen={() => onSwipeableWillOpen(item_key)}
    >
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
                    <H5
                      key={`${pr.cod}_${i}`}
                      color={theme.colors.primary[500]}
                    >
                      {pr.name}
                      {i !== data.prerequisites.length - 1 && ", "}
                    </H5>
                  ))
                : "-"}
            </H5>
          </VStack>
        </Container>
      </TouchableHighlight>
    </Swipeable>
  );
}
