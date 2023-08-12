import { View } from "native-base";
import { Dimensions } from "react-native";
import styled from "styled-components/native";

export const Container = styled(View)``;

export const WeekButtom = styled.TouchableOpacity<{ isSelected: boolean }>`
  border: 1px;
  border-color: ${(props) =>
    props.isSelected
      ? props.theme.colors.primary[500]
      : props.theme.colors.trueGray[400]};
  height: ${Dimensions.get("window").width / 5 - 20}px;
  align-items: center;
  justify-content: center;
  width: ${Dimensions.get("window").width / 5 - 20}px;
  border-radius: 10px;
`;
