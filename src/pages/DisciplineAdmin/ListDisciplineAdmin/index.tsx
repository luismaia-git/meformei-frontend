import { Container, Content } from "../styles";
import { useTheme } from "../../../hooks/useTheme";
import { CustomizedStatusBar } from "../../../components/layout/CustomizedStatusBar";
import {
  DisciplinesByPeriod,
  CreateButton,
  FilterSelect,
  Header,
  SearchInput,
  SwipedDisciplinesByPeriod,
} from "../../../components/layout";
import { FlatList, HStack, VStack, View } from "native-base";
import { ListRenderItemInfo, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { DisciplineByPeriod } from "Discipline";
import { DisciplineAdminProp } from "../../../types/types"

export function ListDisciplineAdmin() {
  const { theme } = useTheme();
  const navigation = useNavigation<any>();

  const HeaderElement = () => {
    return (
      <VStack space={3} paddingBottom={4}>
        <Header
          isSpaced={false}
          backButton
          colorIcon={theme.colors.text}
          colorText={theme.colors.white}
        />
        <SearchInput title="disciplinas" />
        <HStack space={2}>

          <FilterSelect
            config={{
              placeholder: "Selecione um filtro",
              defaultValue: "Obrigatória",
            }}
            values={[
              { label: "Optativa", value: "Optativa" },
              { label: "Obrigatória", value: "Obrigatória" },
            ]}
          />
          <CreateButton
            onPress={() => navigation.navigate("DisciplineAdmin", { screen: "DisciplineRegisterAdmin"})}
          />
        </HStack>
      </VStack>
    );
  };

  function renderCard(itens: ListRenderItemInfo<DisciplineByPeriod>) {
    const { item } = itens;

    return (
      <SwipedDisciplinesByPeriod
        data={item}
        key={`${item.period}_${itens.index}`}
        {...item}
      />
    );
  }

  const data: DisciplineByPeriod[] = [
    {
      period: "1",
      disciplines: [
        {
          name: "Cálculo Diferencial e Integral I",
          prerequisites: [],
          workload: 96,
          cod: "CB0534",
          isOptional: false,

          bibliography: [],
        },
        {
          name: "Seminário em Computação",
          prerequisites: [],
          workload: 32,
          cod: "CB0534",
          isOptional: false,

          bibliography: [],
        },
        {
          name: "Matemática Discreta",
          prerequisites: [],
          workload: 96,
          cod: "CB0534",
          isOptional: false,

          bibliography: [],
        },
        {
          name: "Fundamentos de Programação",
          prerequisites: [],
          workload: 64,
          cod: "CB0534",
          isOptional: false,

          bibliography: [],
        },
      ],
    },
    {
      period: "2",
      disciplines: [
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

          bibliography: [],
        },
        {
          name: "Cálculo Diferencial e Integral II ",
          prerequisites: [
            {
              name: "Cálculo Diferencial e Integral I",
              prerequisites: [],
              workload: 96,
              cod: "CB0534",
              isOptional: false,

              bibliography: [],
            },
          ],
          workload: 96,
          cod: "CB0535",
          isOptional: false,
          bibliography: [],
        },
        {
          name: "Álgebra Linear",
          prerequisites: [],
          workload: 64,
          cod: "CB0534",
          isOptional: false,
          bibliography: [],
        },
        {
          name: "Estrutura de Dados",
          prerequisites: [
            {
              name: "Matemática Discreta",
              prerequisites: [],
              workload: 96,
              cod: "CB0534",
              isOptional: false,
              bibliography: [],
            },
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
          cod: "CK0209",
          isOptional: false,
          menu: "Introdução, Listas Lineares, Árvores, Árvores balanceadas, Listas de prioridades, Tabelas de dispersão.",
          bibliography: [
            "CORMEN, T.; LEISERSON, C.; RIVEST, R.; STEIN, C. Algoritmos - Teoria e Prática. 3o edição, Editora Campus, 2012. ISBN-13: 978-8535236996",
            "MARKENZON, L.; SZWARCFITER, J. Estruturas de Dados e Seus Algoritmos, LTC, 3a Edição, 2010. ISBN-13: 978-8521610144",
            "SEDGEWICK, R.; WAYNE, K. Algorithms. Addison-Wesley Professional; 4th edition, 2011. ISBN-13: 978-0321573513.",
          ],
        },
        {
          name: "Transmissão de Dados",
          prerequisites: [],
          workload: 64,
          cod: "CK0170",
          isOptional: false,
          bibliography: [],
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
