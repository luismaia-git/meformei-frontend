import { Container, Content } from "../styles";
import { useTheme } from "../../../hooks/useTheme";
import { CustomizedStatusBar } from "../../../components/layout/CustomizedStatusBar";
import { Header, ProgressDiscipline } from "../../../components/layout";
import { ButtonHomeCard } from "../../../components/layout/ButtonHomeCard";

export function DisciplineHomeAdmin() {
  const { theme } = useTheme();

  const options = [
    {
      name: "Visualizar",
      linkTo: "ListDisciplineAdmin",
      root: "DisciplineAdmin",
    },
    {
      name: "Cadastrar",
      linkTo: "AddDisciplineAdmin",
      root: "DisciplineAdmin",
    },
  ];

  function renderCard(
    item: {
      name: string;
      linkTo: string;
      root: string;
    },
    i: number
  ) {
    return (
      <ButtonHomeCard key={`${item.name}_${i}`} {...item} hasIcon={false} />
    );
  }

  return (
    <Container>
      <CustomizedStatusBar backgroundColor={theme.colors.primary[500]} />
      <Header
        props={{
          justifyContent: "center",
          backgroundColor: theme.colors.primary[500],
        }}
        colorIcon={theme.colors.text}
        colorText={theme.colors.white}
        title="Disciplinas"
      />
      <Content space={3}>
        {options.map(renderCard)}
      </Content>
    </Container>
  );
}
