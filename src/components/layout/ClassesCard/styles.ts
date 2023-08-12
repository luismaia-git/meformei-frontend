import { View } from "native-base";
import styled from "styled-components/native";

export const Container = styled(View)<{ current_class: boolean }>`
  background: ${(props) =>
    props.current_class
      ? props.theme.colors.yellow[300]
      : props.theme.isDark
      ? props.theme.colors.black
      : props.theme.colors.white};
  border-radius: 10px;
  padding: 15px;
`;
