import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background: ${(theme) => theme.theme.colors.primary[500]};
`;

export const IconContent = styled.View`
  flex: 2;
  background: ${(theme) => theme.theme.colors.primary[500]};
  align-items: center;
  justify-content: center;
`

export const TextContent = styled.View`
  flex: 2;
  padding: 50px 30px;
  background: ${(theme) => theme.theme.colors.background};
  align-items: center;
`