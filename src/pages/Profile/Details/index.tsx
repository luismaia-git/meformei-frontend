import { Divider, HStack, VStack, useTheme as useThemeNative } from 'native-base';
import { CustomizedStatusBar } from '../../../components/layout/CustomizedStatusBar';
import { Header } from '../../../components/layout/Header';
import { H5, Subtitle } from '../../../components/shared/text';
import { BorderedContent, ScrollContainer } from '../../Discipline/styles';
import { ScrollContent } from './styles';
import { RouteProp, useRoute } from '@react-navigation/native';
import { ProfileParamList } from '../../../types/types';
import { useTheme } from "../../../hooks/useTheme";
import { useUser } from "../../../hooks/useUser";

export function ProfileDetails() {
  const { colors } = useThemeNative();

  const { user } = useUser();

  const column = [
    { name: "Nome", value: user!.user.name },
    { name: "Sobrenome", value: user!.user.lastname },
    { name: "UserName", value: user!.user.username},
    { name: "Email", value: user!.user.email },
    { name: "Cidade", value: user!.user.city },
    { name: "Estado", value: user!.user.state },
  ];

  return (
    <ScrollContainer>
      <CustomizedStatusBar />
      <Header
        backButton
      />
      <BorderedContent>
        <VStack space={6}>
          <VStack>
            <H5 color={colors.trueGray[400]}>
              #{user!.user.name}
            </H5>
            <Subtitle  size={26}>
              {user!.user.lastname}
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
    </ScrollContainer>
  );
}
