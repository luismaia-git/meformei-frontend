import { ScrollView, View } from "native-base";
import styled from "styled-components/native";

export const Container = styled(ScrollView)`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

export const Content = styled(View)`
  flex: 1;
  padding: 90px 20px 20px 20px;
  background-color: ${(props) => props.theme.colors.background};

  border-top-right-radius: 50px;
  border-top-left-radius: 50px;
`;

export const TopContent = styled(View)`
  justify-content: flex-start;
  align-items: center;
  z-index: 10;
  background-color: ${(props) => props.theme.colors.primary[500]};
`;
