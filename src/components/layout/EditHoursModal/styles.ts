import { HStack, VStack, View } from "native-base";
import styled from "styled-components/native";

export const Container = styled.View``;

export const ContainerModal = styled(View)`
  flex: 1;
  background: ${(props) => props.theme.colors.background};
`;

export const BorderedContent = styled(VStack)`
  flex: 1;
  background: ${(props) =>
    props.theme.isDark ? props.theme.colors.black : props.theme.colors.white};
  padding: 50px 40px;
  z-index: 1;

  border-top-right-radius: 50px;
  border-top-left-radius: 50px;
`;

export const Header = styled(HStack)`
  padding: 20px;
  
  justify-content: space-between;
  align-items: center;
`