import styled from "styled-components/native";

export const Container = styled.ScrollView`
  background: ${(props) => props.theme.colors.background};
`;

export const TopContent = styled.View`
  flex: 1;
  background: ${(theme) => theme.theme.colors.primary[500]};
  align-items: flex-start;
  justify-content: center;
  padding: 40px 20px;
`;

export const Content = styled.View`
  flex: 5;
  background: ${(theme) => theme.theme.colors.background};
  padding: 20px;
  gap: 10px;
`;
