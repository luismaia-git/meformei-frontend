import { useNavigation } from "@react-navigation/native";
import { DisciplineByPeriod, DisciplineData, DisciplineWithPeriod } from "Discipline";
import { Divider, HStack, VStack, useTheme } from "native-base";
import { useCourseHistory } from "../../../hooks/useCourseHistory";
import { useUser } from "../../../hooks/useUser";
import { DisciplineProp } from "../../../types/types";
import { H5 } from "../../shared/text";
import { SwipedDisciplineCard } from "../SwipedDisciplineCard";
import { Container } from "./styles";
import { Loading } from "../Loading";

interface SwipedDisciplinesByPeriodProps {
  data: DisciplineByPeriod;
}

export function SwipedDisciplinesByPeriod({
  data,
}: SwipedDisciplinesByPeriodProps) {
  const { user } = useUser()
  const theme = useTheme();
  const navigation = useNavigation<DisciplineProp>();
  const { deleteCourseHistory, loading } = useCourseHistory();

  let rowRefs = new Map();

  const swipeOpen = (index: number) => {
    [...rowRefs.entries()].forEach(([key, ref]) => {
      if (key !== index && ref) ref.close();
    });
  };

  const swipeClose = (index: number) => {
    [...rowRefs.entries()].forEach(([key, ref]) => {
      if (key === index && ref) ref.close();
    });
  };

  const onPressLeft = (d: DisciplineWithPeriod, index: any) => {
    navigation.navigate("DisciplineEdit", d)
    if(swipeClose) { swipeClose(index) }
  };

  const onPressRight = (d: DisciplineData) => {
    deleteCourseHistory(d.courseHistoryId)
  };

  return (
    <Container>
      {loading ? <Loading />
        : <VStack space={3}>
          <HStack alignItems="center" space={3}>
            <H5 style={{ paddingVertical: 8 }} color={theme.colors.trueGray[400]}>
              {data?.period}
              {data?.period !== user?.user.currentSemester && " PERÍODO"}
              {/* {data?.period}
              {data?.period?.toLowerCase() !== "período atual" && " PERÍODO"} */}
            </H5>
            <Divider />
          </HStack>
          {data?.disciplines?.map((d, i) => {
            const disciplineWithPeriod : DisciplineWithPeriod = { discipline: d, period: data.period };
            return (
              <SwipedDisciplineCard
                onPress={() => navigation.navigate("DisciplineDetails", d)}
                onPressLeft={() => {onPressLeft(disciplineWithPeriod, i)}}
                onPressRight={() => onPressRight(d)}
                onSwipeableWillOpen={swipeOpen}
                item_key={i}
                rowRefs={rowRefs}
                key={`${d?.cod}_${i}`}
                data={d}
              />
            );
          })}
        </VStack>}
    </Container>
  );
}
