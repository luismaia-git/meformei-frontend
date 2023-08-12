import { View } from "react-native";
import { H5 } from "../../shared/text";
import {
  Bar,
  BarGroup,
  Circle,
  Container,
  LegendBar,
  LegendBarGroup,
} from "./styles";
import { useTheme } from "styled-components";
import { useMemo } from "react";

interface DataBar {
  name: string;
  value: number;
  color: string;
  parcial: number;
  total: number;
}

interface ProgressBarProps {
  data: DataBar[];
  legend?: boolean;
  hasTotal?: boolean;
}

export function ProgressBar({
  data,
  legend = false,
  hasTotal = true,
}: ProgressBarProps) {
  const theme = useTheme();

  const fortatted_data = useMemo(() => {
    return data.reduce((acc: DataBar[], acur, i) => {
      const obj =
        i == 0 ? acur : { ...acur, value: acur.value + acc[i - 1].value };
      acc.push(obj);
      return acc;
    }, []);
  }, [data]);

  return (
    <Container>
      <BarGroup>
        {fortatted_data.map((p, i) => {
          return (
            <Bar key={p.name} value={p.value} color={p.color} zIndex={-i} />
          );
        })}
      </BarGroup>

      {legend && (
        <LegendBarGroup>
          {data.map((p) => {
            return (
              <LegendBar key={p.name}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <Circle color={p.color} />
                  <H5
                    color={
                      theme.isDark
                        ? theme.colors.white
                        : theme.colors.primary[900]
                    }
                  >
                    {p.name}
                  </H5>
                </View>
                <H5
                  align="right"
                  color={
                    theme.isDark
                      ? theme.colors.white
                      : theme.colors.primary[900]
                  }
                >
                  {p.parcial}
                  {!hasTotal && `h`}
                  {hasTotal && `/${p.total}`}
                </H5>
              </LegendBar>
            );
          })}
        </LegendBarGroup>
      )}
    </Container>
  );
}
