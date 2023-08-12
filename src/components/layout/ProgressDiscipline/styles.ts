import styled from "styled-components/native";

export const Container = styled.View`
  background: ${(props) =>
    props.theme.isDark ? props.theme.colors.black : props.theme.colors.white};
  padding: 15px;
  border-radius: 10px;
`;
