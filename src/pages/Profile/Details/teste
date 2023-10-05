import { BorderedContent, ScrollContent } from "../styles";
import { CustomizedStatusBar } from "../../../components/layout/CustomizedStatusBar";
import { Header } from "../../../components/layout";
import { RouteProp, useRoute } from "@react-navigation/native";
import { H5, Subtitle } from "../../../components/shared/text";
import {
  Divider,
  HStack,
  VStack,
  useTheme as useThemeNative,
} from "native-base";

import { AdditionalHoursParamList } from "../../../types/types";
import { useTheme } from "../../../hooks/useTheme";

export function AdditionalHoursDetails() {
  const { colors } = useThemeNative();
  const { theme } = useTheme();

  const { params } =
    useRoute<RouteProp<AdditionalHoursParamList, "AdditionalHoursDetails">>();

  const column = [
    { name: "Tipo de atividade", value: params.activity_type },
    { name: "Tipo de participação", value: params.participation_type },
    { name: "Executada na UFC?", value: params.atUfc ? "Sim" : "Não" },
    { name: "Nome da Instiuição", value: params.institution_name },
    { name: "País da Instituição", value: params.institution_country },
    { name: "CPNJ da Instituição", value: params.institution_cnpj },
    { name: "Carga horária total", value: `${params.amount_hours}h` },
    { name: "Data de Início", value: params.date.start_date },
    { name: "Data de FIM", value: params.date.end_date },
  ];

  return (
    <ScrollContent
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
            <H5 color={colors.trueGray[400]}>
              #{params.situation.toUpperCase()}
            </H5>
            <Subtitle color={theme.colors.text} size={26}>
              {params.activity_title}
            </Subtitle>
          </VStack>

          {column.map((v, i) => {
            return (
              <VStack key={i} space={2}>
                <HStack alignItems="center" space={3}>
                  <H5 size={16}>{v.name.toUpperCase()}</H5>
                  <Divider flex={1} />
                </HStack>
                <H5 weight="regular" size={16}>
                  {v.value}
                </H5>
              </VStack>
            );
          })}
        </VStack>
      </BorderedContent>
    </ScrollContent>
  );
}
