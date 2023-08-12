import { Container, Content, TopContent } from "./styles";
import { ButtonHomeCard } from "../../components/layout/ButtonHomeCard";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { IIconProps } from "native-base";
import { useTheme } from "../../hooks/useTheme";
import { CustomizedStatusBar } from "../../components/layout/CustomizedStatusBar";
import { UserInfoAdmin } from "../../components/layout/UserInfoAdmin";

export function HomeAdmin() {
  const options = [
    {
        name: "Mensagens",
        icon: MaterialCommunityIcons,
        nameIcon: "message-outline",
        root: "Periods",
        linkTo: "PeriodsHome",
      },
    {
        name: "Cursos",
        icon: MaterialCommunityIcons,
        nameIcon: "book-open-outline",
        root: "Periods",
        linkTo: "PeriodsHome",
      },
  ];

  function renderCard(
    item: {
      name: string;
      icon: IIconProps;
      nameIcon: string;
      linkTo: string;
      root: string;
    },
    i: number
  ) {
    return <ButtonHomeCard key={`${item.name}_${i}`} {...item} />;
  }

  const { theme } = useTheme();

  return (
    <Container
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <CustomizedStatusBar backgroundColor={theme.colors.primary[500]} />
      <TopContent>
        <UserInfoAdmin />
      </TopContent>
      <Content>{options.map(renderCard)}</Content>
    </Container>
  );
}
