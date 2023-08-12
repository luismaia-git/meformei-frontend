import { Container } from "./styles";
import { Divider, HStack, VStack, useTheme } from "native-base";
import { H5 } from "../../shared/text";
import { DisciplineByPeriod } from "Discipline";
import { useNavigation } from "@react-navigation/native";
import { ProgressDisciplinesCard } from "../ProgressDisciplinesCard";

interface ProgressDisciplinesByPeriodProps {
  data: DisciplineByPeriod;
}

export function ProgressDisciplinesByPeriod({
  data,
}: ProgressDisciplinesByPeriodProps) {
  const theme = useTheme();
  const navigation = useNavigation<any>();

  return (
    <Container>
      <VStack space={3}>
        <HStack alignItems="center" space={3}>
          <H5 style={{ paddingVertical: 8 }} color={theme.colors.trueGray[400]}>
            {data.period}
            {data.period.toLowerCase() !== "período atual" && " PERÍODO"}
          </H5>
          <Divider />
        </HStack>
        {data.disciplines.map((d, i) => {
          const props = { data: d };
          return (
            <ProgressDisciplinesCard
              onPress={() =>
                navigation.navigate("Discipline", {
                  screen: "DisciplineDetails",
                  params: d,
                })
              }
              key={`${d.cod}_${i}`}
              {...props}
            />
          );
        })}
      </VStack>
    </Container>
  );
}
