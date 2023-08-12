import { Container } from "../styles";
import { useTheme } from "styled-components";
import { Header, SearchInput } from "../../../components/layout";
import { CustomizedStatusBar } from "../../../components/layout/CustomizedStatusBar";

export function PeriodsHome() {
  const theme = useTheme();
  return (
    <Container
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <CustomizedStatusBar backgroundColor={theme.colors.background} />
      <Header
        backButton
        colorIcon={theme.colors.text}
        colorText={theme.colors.text}
        title="Períodos"
      />
      <SearchInput title="período" />
    </Container>
  );
}
