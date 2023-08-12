import { Container } from "../styles";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useState } from "react";
import { CustomizedStatusBar } from "../../../components/layout/CustomizedStatusBar";
import { Header, HourSection } from "../../../components/layout";
import { useTheme } from "../../../hooks/useTheme";
import { Icon } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const renderScene = SceneMap({
  seg: () => {
    return <HourSection day={2} />;
  },
  ter: () => {
    return <HourSection day={3} />;
  },
  qua: () => {
    return <HourSection day={4} />;
  },
  qui: () => {
    return <HourSection day={5} />;
  },
  sex: () => {
    return <HourSection day={6} />;
  },
});

export function HourHome() {
  const { theme } = useTheme();
  const navigation = useNavigation<any>();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "seg", title: "SEG" },
    { key: "ter", title: "TER" },
    { key: "qua", title: "QUA" },
    { key: "qui", title: "QUI" },
    { key: "sex", title: "SEX" },
  ]);

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "white" }}
      style={{ backgroundColor: theme.colors.primary[500] }}
      labelStyle={{ fontFamily: "Nunito-Bold" }}
    />
  );

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
        title="Horário"
        rightButton={() => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Hour", { screen: "HoursList" })}
          >
            <Icon
              as={Ionicons}
              name="md-settings-outline"
              color={theme.colors.white}
              size={36}
            />
          </TouchableOpacity>
        )}
      />
      <TabView
        style={{ backgroundColor: theme.colors.background, flexGrow: 1 }}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
      />
    </Container>
  );
}
