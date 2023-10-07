
import { ScrollView } from "native-base";
import styled from "styled-components/native";

export const ScrollContent = styled(ScrollView)`
  background: ${(props) => props.theme.colors.background};
`;
