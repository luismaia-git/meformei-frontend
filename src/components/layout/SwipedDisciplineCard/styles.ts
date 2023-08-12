import { HStack } from "native-base";
import styled from "styled-components/native";

export const Container = styled(HStack)`
  background: ${(props) => props.theme.isDark ? props.theme.colors.black : props.theme.colors.white};
  border-radius: 10px;
  padding: 15px;
`;
 