import styled from "styled-components/native";

export const Container = styled.ScrollView`
  background: ${(theme) => theme.theme.colors.primary[500]};
`;

export const ContentForm = styled.View`
  flex: 1;
  background: ${(theme) => theme.theme.colors.background};
  justify-content: center;
  z-index: 1;

  border-top-right-radius: 50px;
  border-top-left-radius: 50px;
  
  padding: 50px 40px;  
`;

export const ContainerLogo = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  z-index: 2;
  background: ${(theme) => theme.theme.colors.primary[500]};
  padding: 20px 0;
`;
