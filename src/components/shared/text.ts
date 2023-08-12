import styled from "styled-components/native";

export const Title = styled.Text<{
  color?: string;
  size?: number;
  align?: string;
}>`
  font-family: "Nunito-ExtraBold";
  font-size: ${(props) => (props.size ? props.size : 30)}px;
  color: ${(props) =>
    props.color ? props.color : props.theme.colors.primary[500]};
  text-align: ${(props) => (props.align ? props.align : "left")};
`;

export const Subtitle = styled.Text<{
  color?: string;
  size?: number;
  align?: string;
}>`
  font-family: "Nunito-Bold";
  font-size: ${(props) => (props.size ? props.size : 18)}px;
  color: ${(props) =>
    props.color ? props.color : props.theme.colors.primary[500]};
  text-align: ${(props) => (props.align ? props.align : "left")};
`;

type WeightType = "bold" | "regular";

export const H5 = styled.Text<{
  color?: string;
  size?: number;
  weight?: WeightType;
  align?: string;
}>`
  font-family: ${(props) =>
    props.weight
      ? props.weight === "regular"
        ? "Nunito-Regular"
        : "Nunito-Bold"
      : "Nunito-Bold"};
  font-size: ${(props) => (props.size ? props.size : 14)}px;
  color: ${(props) => (props.color ? props.color : props.theme.colors.text)};
  text-align: ${(props) => (props.align ? props.align : "left")}; 
  flex-wrap: wrap;
`;
