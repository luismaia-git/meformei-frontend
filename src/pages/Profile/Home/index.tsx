import { Container, Content, TopContent } from "../styles";
import { useTheme } from "../../../hooks/useTheme";
import { CustomizedStatusBar } from "../../../components/layout/CustomizedStatusBar";
import { Header } from "../../../components/layout";
import { Switch, VStack, View } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { ButtonHomeCard } from "../../../components/layout/ButtonHomeCard";
import { Subtitle } from "../../../components/shared/text";
import { H5 } from "../../../components/shared/text";
import { useUser } from "../../../hooks/useUser";

export function ProfileHome() {
  const { theme, toggleColorMode } = useTheme();
  const { deleteUser, loading } = useUser();

  const options = [
    {
      name: "Editar perfil",
      linkTo: "AdditionalHours",
    },
    {
      name: "Sair",
      onPress: deleteUser,
      root: "Account",
      isLoading: loading,
    },
  ];

  function renderCard(
    item: {
      name: string;
      linkTo?: string;
      root?: string;
      isLoading?: boolean;
    },
    i: number
  ) {
    return (
      <ButtonHomeCard
        isLoading={item.isLoading}
        key={`${item.name}_${i}`}
        {...item}
        hasIcon={false}
      />
    );
  }

  const { user } = useUser();

  return (
    <Container
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <CustomizedStatusBar backgroundColor={theme.colors.primary[500]} />
      <Header
        props={{
          justifyContent: "center",
          backgroundColor: theme.colors.primary[500],
        }}
        colorIcon={theme.colors.text}
        colorText={theme.colors.white}
      />
      <TopContent>
        <View
          backgroundColor={theme.colors.background}
          borderRadius={900}
          width={130}
          top="50%"
        >
          <MaterialCommunityIcons
            name="account-circle"
            size={130}
            color={theme.colors.primary[500]}
          />
        </View>
      </TopContent>

      <Content>
        <VStack space={3}>
          <View marginBottom={5}>
            <Subtitle align="center" color={theme.colors.text} size={25}>
              {user?.user.name} {user?.user.lastname}
            </Subtitle>

            {!user?.isAdmin && (
              <>
                <H5
                  align="center"
                  color={theme.colors.text}
                  size={18}
                  weight="regular"
                >
                  {user?.user.course.name}
                </H5>
                <H5
                  align="center"
                  color={theme.colors.text}
                  size={18}
                  weight="regular"
                >
                  {user?.user.enrollmentYear}.{user?.user.enrollmentSemester} -{" "}
                  {user?.user.currentSemester}° Período
                </H5>
              </>
            )}
          </View>
          {options.map(renderCard)}
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 20,
                padding: 15,
                backgroundColor: theme.isDark
                  ? theme.colors.black
                  : theme.colors.white,
                borderRadius: 10,
              }}
            >
              <H5>Tema escuro</H5>
              <Switch
                isChecked={theme.isDark}
                onToggle={toggleColorMode}
                size="sm"
              />
            </View>
          </View>
        </VStack>
      </Content>
    </Container>
  );
}
