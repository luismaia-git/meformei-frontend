import { HStack, View } from "native-base";
import { Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";

export const Container = styled(TouchableOpacity)`
  min-height: 50px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  border: 1px;
  border-color: ${(props) => props.theme.colors.primary[500]};
  border-radius: 10px;
  padding: 10px;
`;

export const Content = styled.View`
  flex: 1;
  background: ${(props) => props.theme.colors.background};
  padding: 20px;
`;

export const DisciplineItem = styled(HStack)`
  background-color: ${(props) =>
    !props.theme.isDark ? props.theme.colors.white : props.theme.colors.black};
  padding: 12px 10px;
  border-radius: 10px;
  margin-bottom: 5px;
  align-items: center;
`;

export const DisciplineTitle = styled(View)`
  max-width: ${Dimensions.get("screen").width * 0.7}px;
`;

export const InputSelectedItem = styled(View)`
  background: ${(props) => props.theme.isDark ? props.theme.colors.primary[800] : props.theme.colors.background};
  padding: 5px 12px;
  border-radius: 10px;
  max-width: ${Dimensions.get("screen").width * 0.7}px;
`;
