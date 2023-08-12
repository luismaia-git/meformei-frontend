import { useTheme } from "styled-components";
import { H5 } from "../../shared/text";
import { Container } from "./styles";
import { ClassesCard } from "../ClassesCard";
import { useEffect, useState } from "react";
import { Classe } from "Discipline";
import { zeroLeftMask } from "../../../utils/masks";

export function TodayClasses() {
  const theme = useTheme();

  const week = [
    "Domingo",
    "Segunda-Feira",
    "Terça-Feira",
    "Quarta-Feira",
    "Quinta-Feira",
    "Sexta-Feira",
    "Sábado",
  ];

  const today_date = new Date();
  const today_label = `${zeroLeftMask(today_date.getDate())}/${zeroLeftMask(
    today_date.getMonth() + 1
  )}`;
  const today_day = week[today_date.getDay()];

  const [data, setData] = useState([
    {
      discipline_name: "Lógica para Ciência da Computação",
      hour: { start: 8, end: 10 },
      isCurrent: false,
    },
    {
      discipline_name: "Aprendizagem de Máquina",
      hour: { start: 14, end: 16 },
      isCurrent: false,
    },
    {
      discipline_name: "Computação Gráfica II",
      hour: { start: 16, end: 18 },
      isCurrent: false,
    },
  ]);

  useEffect(() => {
    const verify_hour = () => {
      const current_time = new Date();
      const current_hour = current_time.getHours();
      const hourData = data.map((d) => {
        return {
          ...d,
          isCurrent:
            current_hour >= d.hour.start && current_hour <= d.hour.end - 1,
        };
      });
      setData(hourData);
    };

    const interval = setInterval(verify_hour, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  function renderClasses(item: Classe, i: number) {
    return <ClassesCard key={`${item.discipline_name}_${i}`} {...item} />;
  }

  return (
    <Container>
      <H5>
        Aulas de Hoje ({today_label}):{" "}
        <H5 color={theme.colors.primary[500]}>{today_day}</H5>
      </H5>
      {data.map(renderClasses)}
    </Container>
  );
}
