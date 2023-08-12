import { Container, Content } from "./styles";
import { useTheme } from "../../hooks/useTheme";
import { CustomizedStatusBar } from "../../components/layout/CustomizedStatusBar";
import {
  Header,
  ProgressDisciplinesByPeriod,
  SearchInput,
} from "../../components/layout";
import { FlatList, VStack, View } from "native-base";
import { ListRenderItemInfo, Platform } from "react-native";
import { DisciplineByPeriod } from "Discipline";

export function ProgressDetail() {
  const { theme } = useTheme();

  const HeaderElement = () => {
    return (
      <VStack space={3} marginBottom={4}>
        <Header
          isSpaced={false}
          backButton
          colorIcon={theme.colors.text}
          colorText={theme.colors.text}
          title="Progresso Detalhado"
        />
        <SearchInput title="disciplina" />
      </VStack>
    );
  };

  function renderCard(itens: ListRenderItemInfo<DisciplineByPeriod>) {
    const { item } = itens;

    return (
      <ProgressDisciplinesByPeriod
        data={item}
        key={`${item.period}_${itens.index}`}
        {...item}
      />
    );
  }

  const data: DisciplineByPeriod[] = [
    {
      period: "7",
      disciplines: [
        {
          name: "Engenharia de Software",
          prerequisites: [
            {
              name: "Programação",
              prerequisites: [
                {
                  name: "Fundamentos de Programação",
                  prerequisites: [],
                  workload: 64,
                  cod: "CB0534",
                  isOptional: false,

                  bibliography: [],
                },
              ],
              workload: 64,
              cod: "CB0534",
              isOptional: false,
              status: "Aprovado",
              bibliography: [],
            },
          ],
          workload: 64,
          cod: "CB0534",
          isOptional: false,
          status: "Aprovado",
          menu: "1. Gerenciamento de projeto, 2. Estimação de custos, 3. Análise e especificação de requisitos, 4. Especificações formais, 5. Interface com o usuário, 6. Modelagem de dados, 7. Técnicas e modelagens para projeto e implementação: arquitetura de projeto, projeto estruturado, projeto orientado a objetos, 8. Gerenciamento de versões e configurações, 9. Verificação: testes, revisões e inspeções, 10. Validação e certificação de qualidade, 11. Manutenção, 12. Documentação.",
          bibliography: [
            "SOMMERVILLE, I. Engenharia de Software. 9. ed. São Paulo: Pearson Education, 2011. 568p. ISBN: 9788579361081",
            "PRESSMAN, Roger S. Engenharia de software: uma abordagem profissional. 7. ed. Porto Alegre: McGraw Hill, 2011. 771 p. ISBN: 9788563308337",
            "PÁDUA FILHO, W. Engenharia de Software: Fundamentos, Métodos e Padrões. 3. ed. Rio de Janeiro: LTC, 2009. 1248 p. ISBN 9788521616504.",
          ],
        },
        {
          name: "Lógica para ciência da Computação",
          prerequisites: [],
          workload: 96,
          cod: "CB0534",
          isOptional: false,
          bibliography: [],
          status: "Reprovado",
        },
        {
          name: "Computação Gráfica II",
          prerequisites: [],
          workload: 64,
          cod: "CB0534",
          isOptional: true,
          bibliography: [],
          status: "Trancado",
        },
        {
          name: "Aprendizagem de Máquina",
          prerequisites: [],
          workload: 64,
          cod: "CB0534",
          isOptional: true,
          bibliography: [],
          status: "Aprovado",
        },
      ],
    },
  ];

  return (
    <Container>
      <CustomizedStatusBar backgroundColor={theme.colors.background} />
      <Content>
        <FlatList
          contentContainerStyle={{
            paddingBottom: Platform.OS === "ios" ? 70 : 0,
          }}
          data={data}
          renderItem={renderCard}
          ListHeaderComponent={HeaderElement}
          keyExtractor={(item, i) => `${item.period}_${i}`}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        />
      </Content>
    </Container>
  );
}
