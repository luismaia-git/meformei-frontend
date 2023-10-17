import { Divider, HStack, Icon, VStack, useTheme as useThemeNative } from 'native-base';
import { CustomizedStatusBar } from '../../../components/layout/CustomizedStatusBar';
import { Header } from '../../../components/layout/Header';
import { H5, Subtitle } from '../../../components/shared/text';
import { ScrollContainer } from '../../Discipline/styles';
import { BorderedContent } from '../styles';
import { ScrollContent } from './styles';
import { RouteProp, useRoute } from '@react-navigation/native';
import { ProfileParamList } from '../../../types/types';
import { useTheme } from "../../../hooks/useTheme";
import { useUser } from "../../../hooks/useUser";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { ProfileEdit } from '../Edit';
import { ProfileEditTO } from 'User';

export function ProfileDetails() {
  const { colors } = useThemeNative();
  const navigation = useNavigation<any>();
  const { theme } = useTheme();

  const { user } = useUser();

  const column = [
    { name: "Nome", value: user!.user.name },
    { name: "Sobrenome", value: user!.user.lastname },
    { name: "UserName", value: user!.user.username },
    { name: "Email", value: user!.user.email },
    { name: "Cidade", value: user!.user.city },
    { name: "Estado", value: user!.user.state },
  ];

  const profileEditTO : ProfileEditTO = {
    name: user!.user.name,
    lastname: user!.user.lastname,
    username: user!.user.username,
    email: user!.user.email,
    city: user!.user.city,
    state: user!.user.state,
  }



  return (
    <ScrollContainer
    contentContainerStyle={{ flexGrow: 1 }}
    showsVerticalScrollIndicator={false}>
      
      <CustomizedStatusBar />
      <Header
        backButton
        colorIcon={theme.colors.text}
        colorText={theme.colors.text}
        rightButton={() => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Profile", {screen:"ProfileEdit"})}
          >
            <Icon as={Feather} name="edit" size="10" color={theme.colors.text} />
          </TouchableOpacity>
        )}
        title="Perfil"
        // align="left"
      />
      <BorderedContent>
        <VStack space={6}>

          {column.map((v, i) => {
            return (
              <VStack key={i} space={2}>
                <HStack alignItems="center" space={2}>
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
