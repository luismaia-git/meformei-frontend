import { FlatList, View } from "native-base";
import { EditHoursModal, Header } from "../../../components/layout";
import { CustomizedStatusBar } from "../../../components/layout/CustomizedStatusBar";
import { Container, DisciplineItem } from "../styles";
import { useTheme } from "../../../hooks/useTheme";

export function HoursList() {
  const { theme } = useTheme();
  const data = [
    { name: "Engenharia de Software", cod: "CK0215" },
    { name: "Lógica para Ciência da Computação", cod: "CK0215" },
    { name: "Aprendizagem de Máquina", cod: "CK0215" },
    { name: "Computação Gráfica II", cod: "CK0215" },
    { name: "Sistemas em Tempo Real", cod: "CK0215" },
  ];
  const HeaderElement = () => {
    return (
      <View style={{ marginBottom: 22 }}>
        <Header
          isSpaced={false}
          backButton
          colorIcon={theme.colors.text}
          colorText={theme.colors.text}
        />
      </View>
    );
  };

  const renderItem = (item: { name: string; cod: string }) => {
    return (
      <DisciplineItem>
        <EditHoursModal item={item} />
      </DisciplineItem>
    );
  };
  return (
    <Container>
      <CustomizedStatusBar />
      <FlatList
        contentContainerStyle={{ padding: 20 }}
        data={data}
        renderItem={({ item }) => renderItem(item)}
        ListHeaderComponent={HeaderElement}
      />
    </Container>
  );
}
