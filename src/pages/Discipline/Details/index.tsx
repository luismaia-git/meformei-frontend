import { Entypo } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import {
  Divider,
  HStack,
  Icon,
  VStack,
  useTheme as useThemeNative,
} from "native-base";
import { Header } from "../../../components/layout";
import { CustomizedStatusBar } from "../../../components/layout/CustomizedStatusBar";
import { H5, Subtitle } from "../../../components/shared/text";
import { useTheme } from "../../../hooks/useTheme";
import { DisciplineParamList, DisciplineProp } from "../../../types/types";
import {
  BorderedContent,
  ScrollContainer
} from "../styles";

export function DisciplineDetails() {
  const { colors } = useThemeNative();
  const { theme } = useTheme();
  const { params } =
    useRoute<RouteProp<DisciplineParamList, "DisciplineDetails">>();
  const navigation = useNavigation<DisciplineProp>();

  const values = [
    { title: "CARGA HORÁRIA", value: `${params.workload}h` },
    {
      title: "EMENTA",
      value: params.menu ?? "NENHUM",
    },
  ];

  return (
    <ScrollContainer
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <CustomizedStatusBar />
      <Header
        backButton
        colorIcon={theme.colors.text}
        colorText={theme.colors.white}
      />
      <BorderedContent>
        <VStack space={6}>
          <VStack>
            <H5 color={colors.trueGray[400]}>#{params.cod}</H5>
            <Subtitle color={theme.colors.text} size={26}>
              {params.name}
            </Subtitle>
          </VStack>

          {values.map((v, i) => {
            return (
              <VStack key={i} space={2}>
                <HStack alignItems="center" space={3}>
                  <H5 size={16}>{v.title}</H5>
                  <Divider flex={1} />
                </HStack>
                <H5 weight="regular" size={16}>
                  {v.value}
                </H5>
              </VStack>
            );
          })}

          <VStack space={2}>
            <HStack alignItems="center" space={3}>
              <H5 size={16}>BIBLIOGRAFIAS BÁSICAS</H5>
              <Divider flex={1} />
            </HStack>

            {params.bibliography.length < 1 ? (
              <H5 weight="regular" size={16}>
                NENHUM
              </H5>
            ) : (
              params.bibliography.map((b, i) => {
                return (
                  <H5 key={i} size={16} weight="regular">
                    {b}
                  </H5>
                );
              })
            )}
          </VStack>

          <VStack space={2}>
            <HStack alignItems="center" space={3}>
              <H5 size={16}>PRÉ-REQUISITOS</H5>
              <Divider flex={1} />
            </HStack>

            {params.prerequisites.length < 1 ? (
              <H5 weight="regular" size={16}>
                NENHUM
              </H5>
            ) : (
              params.prerequisites.map((pr, i) => {
                return (
                  <HStack key={i} alignItems="center" space={2}>
                    <Icon as={Entypo} name="chevron-right" />
                    <H5 size={16} weight="regular">
                      {pr}
                    </H5>
                  </HStack>
                );
              })
            )}
          </VStack>
        </VStack>
      </BorderedContent>
    </ScrollContainer>
  );
}
