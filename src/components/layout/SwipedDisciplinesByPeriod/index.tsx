import { useNavigation } from "@react-navigation/native";
import { DisciplineByPeriod } from "Discipline";
import { Divider, HStack, VStack, useTheme } from "native-base";
import { useUser } from "../../../hooks/useUser";
import { DisciplineProp } from "../../../types/types";
import { H5 } from "../../shared/text";
import { SwipedDisciplineCard } from "../SwipedDisciplineCard";
import { Container } from "./styles";

interface SwipedDisciplinesByPeriodProps {
  data: DisciplineByPeriod;
}

export function SwipedDisciplinesByPeriod({
  data,
}: SwipedDisciplinesByPeriodProps) {
  const {user} = useUser()
  const theme = useTheme();
  const navigation = useNavigation<DisciplineProp>();

  let rowRefs = new Map();

  const swipeOpen = (index: number) => {
    [...rowRefs.entries()].forEach(([key, ref]) => {
      if (key !== index && ref) ref.close();
    });
  };

  const handleRight = (index: number) => {}; // implementar essa funcão ( quando arrasta pra direita )

  const handleLeft = (index: number) => { // implementar essa funcão ( quando arrasta pra esquerda )
    return <></>
  };

  return (
    <Container>
        <VStack space={3}>
          <HStack alignItems="center" space={3}>
            <H5 style={{ paddingVertical: 8 }} color={theme.colors.trueGray[400]}>
            {data?.period}
            {data?.period  !== user?.user.currentSemester && " PERÍODO"}
              {/* {data?.period}
              {data?.period?.toLowerCase() !== "período atual" && " PERÍODO"} */}
            </H5>
            <Divider /> 
          </HStack>
          {data?.disciplines?.map((d, i) => {
            const props = { data: d };
            return (
              <SwipedDisciplineCard
                onPress={() => navigation.navigate("DisciplineDetails", d)}
                handleLeft={handleLeft}
                handleRight={handleRight}
                onSwipeableWillOpen={swipeOpen}
                item_key={i}
                rowRefs={rowRefs}
                key={`${d?.cod}_${i}`}
                {...props}
              />
            );
          })}
        </VStack>
    </Container>
  );
}
