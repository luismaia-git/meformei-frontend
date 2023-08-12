import styled from "styled-components/native";
import { VirtualizedScrollView } from "../../components/layout";

export const Container = styled(VirtualizedScrollView)`
  background: ${(theme) => theme.theme.colors.primary[500]};
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
`;
