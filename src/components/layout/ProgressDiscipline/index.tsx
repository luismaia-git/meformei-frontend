import { View } from "react-native";
import { H5, Subtitle, Title } from "../../shared/text";
import { Container } from "./styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ProgressBar } from "../ProgressBar";
import { useTheme } from "styled-components";
import { useTheme as useThemeNativeBase } from "native-base";
import { useCourseHistory } from "../../../hooks/useCourseHistory";
import { useEffect } from "react";

export function ProgressDiscipline() {
  const theme = useTheme();
  const { colors } = useThemeNativeBase();
  const { 
    additionalHours, 
    universityWorkload, 
    universityWorkloadWithoutAdditionalHours, 
    doneWorkload, 
    inProgressWorkload, 
    toDoWorkload, 
    universityAdditionalHours, 
    percentageUniversityAdditionalHours, 
    percentageUniversityWorkloadWhithoutAdditionalHours,
    percentageAdditionalHours,
    percentageDoneWorkload,
    percentageInProgressWorkload,
    percentageToDoWorkload,
    percentageUnplannedWorkload,
    unplannedWorkload
    } = useCourseHistory();
  
  // const percentTotal = universityWorkloadWithoutAdditionalHours / 100;
  // const percentDoneAdditionalHours = universityAdditionalHours / 100;

  useEffect(() => {
    console.log("Percentes ---------------------------------------------------------------------------")
    console.log("percentageAdditionalHours: ", percentageAdditionalHours)
    console.log("percentageDoneWorkload: ", percentageDoneWorkload)
    console.log("percentageInProgressWorkload: ", percentageInProgressWorkload)
    console.log("percentageToDoWorkload: ", percentageToDoWorkload)
    console.log("percentageUniversityAdditionalHours: ", percentageUniversityAdditionalHours)
    console.log("percentageUnplannedWorkload: ", percentageUnplannedWorkload)
    console.log("unplannedWorkload: ", unplannedWorkload)
  }, [percentageDoneWorkload, percentageInProgressWorkload, percentageUnplannedWorkload, unplannedWorkload])

  const progressByType = [
    {
      name: "Concluído",
      value: percentageDoneWorkload,
      color: colors.green[500],
      parcial: doneWorkload,
      total: universityWorkloadWithoutAdditionalHours,
    },
    {
      name: "Em Andamento",
      value: percentageInProgressWorkload,
      color: colors.yellow[400],
      parcial: inProgressWorkload,
      total: universityWorkloadWithoutAdditionalHours,
    },

    {
      name: "A Fazer",
      value: percentageToDoWorkload,
      color: colors.cyan[500],
      parcial: toDoWorkload,
      total: universityWorkloadWithoutAdditionalHours,
    },
    {
      name: "Horas não planejadas",
      value: percentageAdditionalHours,
      color: colors.coolGray[400],
      parcial: 0,
      total: unplannedWorkload,
    },
  ];

  return (
    <Container>
      <H5 size={14} color={theme.colors.primary[500]}>
        Progresso
      </H5>
      <View
        style={{
          flexDirection: "row",
          alignItems: "baseline",
          justifyContent: "space-between",
          marginVertical: 10,
        }}
      >
        <Subtitle align="left" color={theme.colors.text} size={14}>
          Carga Horária: {doneWorkload + additionalHours}/{universityWorkload}h
        </Subtitle>
      </View>

      <ProgressBar data={progressByType} legend hasTotal={false}/>
    </Container>
  );
}
