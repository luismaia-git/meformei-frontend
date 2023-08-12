import styled from "styled-components/native";
import { View, VStack, ScrollView} from "native-base";

export const Container = styled(View)`
  flex: 1;
  background: ${(props) => props.theme.colors.background};
`;

export const Content = styled(VStack)`
  padding: 20px;
`;

export const ScrollContainer = styled(ScrollView)`
  background: ${(props) => props.theme.colors.background};
`;

export const BorderedContent = styled(View)`
  flex: 1;
  background: ${(props) =>
    props.theme.isDark ? props.theme.colors.black : props.theme.colors.white};
  padding: 50px 40px;
  z-index: 1;

  border-top-right-radius: 50px;
  border-top-left-radius: 50px;
`;

export const ContentForm = styled.View`
  flex: 2;
  background: ${(theme) => theme.theme.colors.background};
  padding: 50px 40px;  
  z-index: 1;
  
  
  border-top-right-radius: 50px;
  border-top-left-radius: 50px;
`;

export const DateGroup = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

