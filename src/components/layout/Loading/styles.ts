import { Dimensions, Platform } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View<{ isOpacity?: boolean }>`
  flex: 1;
  background: ${(props) =>
    props.isOpacity ? "rgba(0, 19, 32, 0.5)" : props.theme.colors.background};
  top: 0;
  height: ${Dimensions.get("window").height}px;
  width: ${Dimensions.get("window").width}px;
  position: absolute;
  justify-content: center;
  align-items: center;
`;
