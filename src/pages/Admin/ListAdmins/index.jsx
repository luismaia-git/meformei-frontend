import { Container, Content } from "../styles";
import { useTheme } from "../../../hooks/useTheme";
import { Text } from 'react-native';
import { CustomizedStatusBar } from "../../../components/layout/CustomizedStatusBar";
import { Header, ProgressDiscipline } from "../../../components/layout";
import { ButtonHomeCard } from "../../../components/layout/ButtonHomeCard";

export function ListAdmins() {
  const { theme } = useTheme();

  const options = [
    {
      name: "Bruna",
      linkTo: "ListAdmins",
      root: "Admin",
    },
  ];

  function renderCard() {
    return (
     <></>
    );
  }

  return (
    <Container>
      <CustomizedStatusBar backgroundColor={theme.colors.primary[500]} />
      <Text>Admins</Text>
    </Container>
  );
}
