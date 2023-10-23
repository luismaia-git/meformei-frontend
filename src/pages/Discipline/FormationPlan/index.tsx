import { useNavigation } from "@react-navigation/native";
import { CourseHistoryByPeriod } from "CourseHistory";
import { HStack, VStack, View } from "native-base";
import { useEffect, useState } from "react";
import {
  CreateButton,
  FilterSelect,
  Header,
  Loading,
  SearchInput,
  SwipedDisciplinesByPeriod
} from "../../../components/layout";
import { CustomizedStatusBar } from "../../../components/layout/CustomizedStatusBar";
import { H5 } from "../../../components/shared/text";
import { useTheme } from "../../../hooks/useTheme";

import { useCourseHistory } from "../../../hooks/useCourseHistory";
import { DisciplineProp } from "../../../types/types";
import { Content, ScrollContainer } from "../styles";

// type StatusTypeWithTodo =  "TODO" | StatusType  
export function FormationPlan() {
  const { theme } = useTheme();
  const navigation = useNavigation<DisciplineProp>();
  const [status, setStatus] = useState<string>("ANY")
  const [termo, setTermo] = useState("");

  const [filteredList, setFilteredList] = useState<CourseHistoryByPeriod[]>([]);

  const { loading, courseHistory } = useCourseHistory();

  useEffect(() => {
    setFilteredList(
      courseHistory?.disciplineHistory?.map((d) => {
        return {
          ...d,
          disciplines: d.disciplines.filter(
            (dc) =>
              (status == "ANY" || dc.status == status) &&
              (termo.length == 0 ||
                dc.name.toLowerCase().includes(termo.toLowerCase()) ||
                dc.cod.toLowerCase().includes(termo.toLowerCase()))
          ),
        };
      })
        .filter((d) => d.disciplines.length > 0) ?? []);
  }, [courseHistory, termo, status]);

  const HeaderElement = () => {
    return (
      <VStack space={3} paddingBottom={4}>
        <Header
          isSpaced={false}
          backButton
          colorIcon={theme.colors.text}
          colorText={theme.colors.text}
          title="Plano de Formação"
        />
        <SearchInput
          flex={0}
          config={{ defaultValue: termo, onChangeText: setTermo }}
          onClear={setTermo}
          title="disciplina"
        />
        <HStack space={2}>
          <FilterSelect

            config={{
              selectedValue: status,
              onValueChange: (value: string) => {
                setStatus(value)
              },
              placeholder: "Selecione um filtro",
              defaultValue: "ANY",
            }}
            values={[
              { label: "Todas", value: "ANY" },
              { label: "Em andamento", value: "INPROGRESS" },
              { label: "A Fazer", value: "TODO" },
              { label: "Concluídas", value: "DONE" },
              { label: "Trancadas", value: "WITHDRAWAL" },
              { label: "Reprovadas", value: "FAILED" },
            ]}
          />

          <CreateButton
            onPress={() => navigation.navigate("DisciplineRegister")} // ver 
          />
        </HStack>
      </VStack>
    );
  };

  function renderCard(
    item: CourseHistoryByPeriod,
    i: number
  ) {
    return (
      <SwipedDisciplinesByPeriod
        data={item} // fazer mapeamento aqui
        key={`${item.period}_${i}`}
        {...item}
      />
    );
  }

  return (
    <ScrollContainer>
      {loading ? (
        <Loading opacity={false} />
      ) : (
        <>
          <CustomizedStatusBar backgroundColor={theme.colors.background} />
          <Content>
            <HeaderElement />
            {/* Integração: so mudar o data para filteredList */}
            {filteredList?.length > 0 ?
              (<VStack space={2}>
                {filteredList?.map(renderCard)}
              </VStack>
              ) : (
                <View justifyContent="center" alignItems="center" marginTop={20}>
                  <H5>Nenhum resultado foi encontrado</H5>
                </View>
              )}
          </Content>
        </>)
      }
    </ScrollContainer>
  );
}

