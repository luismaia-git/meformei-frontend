import styled from "styled-components/native";
import { VirtualizedScrollView } from "../../../components/layout";

export const Container = styled(VirtualizedScrollView)`
  flex: 1;
  background: ${(props) => props.theme.colors.background};
`;