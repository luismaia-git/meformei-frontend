import { useNavigation } from "@react-navigation/native";
import { DisciplineByPeriod } from "Discipline";
import { Divider, FlatList, HStack, VStack, View } from "native-base";
import { useEffect, useState } from "react";
import { ListRenderItemInfo, Platform } from "react-native";
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
import { useUser } from "../../../hooks/useUser";
import { useDisciplines } from "../../../servicesHooks/useDisciplines";
import { DisciplineProp } from "../../../types/types";
import { Container, Content, ScrollContainer } from "../styles";
import { useCourseHistory } from "../../../servicesHooks/useCourseHistory";
import { CourseHistoryByPeriod } from "CourseHistory";

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
      courseHistory?.disciplineHistory.map((d) => {
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

// const data: DisciplineByPeriod[] = [
//   {
//     period: 3,
//     disciplines: [
//       {
//         name: "Engenharia de Software",
//         workload: 64,
//         cod: "CB0534",
//         isOptional: false,
//         menu: "1. Gerenciamento de projeto, 2. Estimação de custos, 3. Análise e especificação de requisitos, 4. Especificações formais, 5. Interface com o usuário, 6. Modelagem de dados, 7. Técnicas e modelagens para projeto e implementação: arquitetura de projeto, projeto estruturado, projeto orientado a objetos, 8. Gerenciamento de versões e configurações, 9. Verificação: testes, revisões e inspeções, 10. Validação e certificação de qualidade, 11. Manutenção, 12. Documentação.",
//         bibliography: [
//           "SOMMERVILLE, I. Engenharia de Software. 9. ed. São Paulo: Pearson Education, 2011. 568p. ISBN: 9788579361081",
//           "PRESSMAN, Roger S. Engenharia de software: uma abordagem profissional. 7. ed. Porto Alegre: McGraw Hill, 2011. 771 p. ISBN: 9788563308337",
//           "PÁDUA FILHO, W. Engenharia de Software: Fundamentos, Métodos e Padrões. 3. ed. Rio de Janeiro: LTC, 2009. 1248 p. ISBN 9788521616504.",
//         ],
//         prerequisites: [
//           "CB0534",
//           "CB0534",
//         ],
//         curriculumId: "exampleid",
//         description: "bla bla bla",
//         id: "exampleid",
//         start: 0,
//         end: 0,
//         daysWeek: [],
//       },
//       {
//         name: "Lógica para ciência da Computação",
//         prerequisites: [],
//         workload: 96,
//         menu: "teste",
//         cod: "CB0534",
//         isOptional: false,
//         bibliography: [],
//         curriculumId: "exampleid",
//         description: "bla bla bla",
//         id: "exampleid",
//         start: 0,
//         end: 0,
//         daysWeek: [],
//       },
//       {
//         name: "Computação Gráfica II",
//         prerequisites: [],
//         workload: 64,
//         cod: "CB0534",
//         isOptional: true,
//         menu: "teste",
//         bibliography: [],
//         curriculumId: "exampleid",
//         description: "bla bla bla",
//         id: "exampleid",
//         start: 0,
//         end: 0,
//         daysWeek: [],
//       },
//       {
//         name: "Aprendizagem de Máquina",
//         prerequisites: [],
//         workload: 64,
//         cod: "CB0534",
//         isOptional: true,
//         menu: "teste",
//         bibliography: [],
//         curriculumId: "exampleid",
//         description: "bla bla bla",
//         id: "exampleid",
//         start: 0,
//         end: 0,
//         daysWeek: [],
//       },
//     ],
//   },
// ];