import { FormControl, HStack } from "native-base";
import { Container, WeekButtom } from "./styles";
import { H5 } from "../../shared/text";
import { useState } from "react";
import { useTheme } from "../../../hooks/useTheme";

const { Label } = FormControl;

interface Week {
  id: number;
  name: string;
  label: string;
}

export function WeekSelected() {
  const week = [
    { id: 0, name: "Segunda", label: "SEG" },
    { id: 1, name: "Terça", label: "TER" },
    { id: 2, name: "Quarta", label: "QUA" },
    { id: 3, name: "Quinta", label: "QUI" },
    { id: 4, name: "Sexta", label: "SEX" },
  ];

  const { theme } = useTheme();

  const [selected, setSelected] = useState<Week[]>([]);

  const toggleSelected = (item: Week) => {
    const listSelected = [...selected];
    const index = listSelected.findIndex((i) => i.id === item.id);
    if (index === -1) listSelected.push(item);
    else listSelected.splice(index, 1);
    setSelected(listSelected);
  };

  const isSelected = (item: Week) => {
    const index = selected.findIndex((i) => i.id === item.id);
    return index !== -1;
  };

  return (
    <Container>
      <Label>
        <H5 color={theme.colors.primary[500]} size={14}>
          Dia(s) da semana:
        </H5>
      </Label>
      <HStack justifyContent="space-between">
        {week.map((w, i) => {
          const isSelect = isSelected(w);
          return (
            <WeekButtom
              isSelected={isSelect}
              key={i}
              onPress={() => toggleSelected(w)}
            >
              <H5
                size={16}
                color={
                  isSelect
                    ? theme.colors.primary[500]
                    : theme.colors.trueGray[400]
                }
              >
                {w.label}
              </H5>
            </WeekButtom>
          );
        })}
      </HStack>
    </Container>
  );
}
