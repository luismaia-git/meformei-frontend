import { View } from "native-base";
import styled from "styled-components/native";

export const Container = styled(View)`
  flex: 1;
  background: ${(props) => props.theme.colors.background};
`;

export const DisciplineItem = styled(View)`
  background-color: ${(props) =>
    !props.theme.isDark ? props.theme.colors.white : props.theme.colors.black};
  padding: 13px 10px;
  border-radius: 10px;
  margin-bottom: 5px;
`;
