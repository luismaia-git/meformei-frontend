import {  VStack, View } from "native-base";
import styled from "styled-components/native";

export const Container = styled(View)`
  flex: 1;
  background: ${(props) => props.theme.colors.background};
`;

export const Content = styled(VStack)`
  padding: 20px;
`;

