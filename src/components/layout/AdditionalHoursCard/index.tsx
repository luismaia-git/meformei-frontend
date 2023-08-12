import { View } from "react-native";
import { Container } from "./styles";
import { useTheme } from "styled-components";
import { HStack, Icon } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { H5 } from "../../shared/text";
import { Swipeable, TouchableHighlight } from "react-native-gesture-handler";
import { DeleteButton } from "../DeleteButton";
import { AdditionalHour } from "AdditionalHours";
import { EditButton } from "../EditButton";

interface AdditionalHoursCardProps {
  data: AdditionalHour;
  item_key: number;
  rowRefs: Map<number, Swipeable>;
  onSwipeableWillOpen: () => void;
  handleRight: () => void;
  handleLeft: () => void;
  onPress: () => void;
}

export function AdditionalHoursCard({
  data,
  item_key,
  rowRefs,
  onSwipeableWillOpen,
  handleRight,
  handleLeft,
  onPress,
}: AdditionalHoursCardProps) {
  const theme = useTheme();

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
      onSwipeableWillOpen={onSwipeableWillOpen}
    >
      <TouchableHighlight
        style={{ borderRadius: 10, margin: 0 }}
        activeOpacity={0.9}
        onPress={onPress}
      >
        <Container alignItems="center" justifyContent="space-between">
          <HStack alignItems="center" space={2}>
            <Icon
              as={FontAwesome}
              name={
                data.situation === "Deferido"
                  ? "check"
                  : data.situation === "Indeferido"
                  ? "remove"
                  : "question"
              }
              size={5}
              color={
                data.situation === "Deferido"
                  ? theme.colors.primary[500]
                  : data.situation === "Indeferido"
                  ? theme.colors.red[500]
                  : theme.colors.gray[500]
              }
            />
            <View style={{ width: "75%" }}>
              <H5 numberOfLines={1}>{data.activity_title}</H5>
            </View>
          </HStack>
          <H5>{data.amount_hours}hs</H5>
        </Container>
      </TouchableHighlight>
    </Swipeable>
  );
}
