import styled from "styled-components/native";

export const Container = styled.View`
    
`;

export const BarGroup = styled.View`
  background: ${(theme) => theme.theme.isDark ? theme.theme.colors.primary[900] : theme.theme.colors.gray[50]};
  flex-direction: row;
  border-radius: 100px;
  height: 20px;
  margin: 5px 0;
`;

export const Bar = styled.View<{value: number, color: string, zIndex: number}>`
    background: ${(props) => props.color};
    height: 20px;
    width: ${(props) => props.value * 100}%;
    border-radius: 100px;
    position: absolute;
    z-index: ${(props) => props.zIndex};
`

export const LegendBarGroup = styled.View`
    gap: 10px;
    margin: 5px 0;
`

export const LegendBar = styled.View`
     background: ${(theme) => theme.theme.isDark ? theme.theme.colors.primary[900] : theme.theme.colors.gray[50]};
     border-radius: 100px;
     flex-direction: row;
     gap: 10px;
     align-items: center;
     padding: 5px 8px;
     justify-content: space-between;
`

export const Circle = styled.View<{color: string}>`
    width: 15px;
    height: 15px;
    background-color: ${props => props.color};
    border-radius: 100px;
`
