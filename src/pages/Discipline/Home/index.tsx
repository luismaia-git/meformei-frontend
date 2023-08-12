import { Container, Content } from "../styles";
import { useTheme } from "../../../hooks/useTheme";
import { CustomizedStatusBar } from "../../../components/layout/CustomizedStatusBar";
import { Header, ProgressDiscipline } from "../../../components/layout";
import { ButtonHomeCard } from "../../../components/layout/ButtonHomeCard";

export function DisciplineHome() {
  const { theme } = useTheme();

  const options = [
    {
      name: "Meu plano de formação",
      linkTo: "FormationPlan",
      root: "Discipline",
    },
    {
      name: "Ver disciplinas disponíveis",
      linkTo: "ListAvailable",
      root: "Discipline",
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
        <ProgressDiscipline />
      </Content>
    </Container>
  );
}
