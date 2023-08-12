import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../pages/Home";
import { DisciplineHome } from "../pages/Discipline/Home";
import { ProfileHome } from "../pages/Profile/Home";
import { TabNavigatorParamList } from "../types/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Dimensions, Platform } from "react-native";
import { useTheme } from "styled-components";
import { HourHome } from "../pages/Hour/Home";

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

const height = Platform.OS === "ios" ? 20 : 0;
const tabSize = Dimensions.get("screen").height * 0.08;

export function TabNavigator() {
  const theme = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="Início"
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary[500],
        tabBarInactiveTintColor: theme.colors.text,
        tabBarLabelStyle: {
          fontFamily: "Nunito-Bold",
          fontSize: 14,
          marginBottom: 5,
        },
        tabBarStyle: {
          height: tabSize + height,
          backgroundColor: theme.colors.background,
        },
        tabBarItemStyle: {
          height: tabSize,
          alignItems: "center",
          justifyContent: "space-between",
        },
      }}
    >
      <Tab.Screen
        name="Início"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: (props) => (
            <MaterialCommunityIcons
              name="home-outline"
              size={tabSize * 0.5}
              color={
                props.focused ? theme.colors.primary[500] : theme.colors.text
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="Disciplinas"
        component={DisciplineHome}
        options={{
          headerShown: false,
          tabBarIcon: (props) => (
            <MaterialCommunityIcons
              name="book-open-outline"
              size={tabSize * 0.5}
              color={
                props.focused ? theme.colors.primary[500] : theme.colors.text
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="Horário"
        component={HourHome}
        options={{
          headerShown: false,
          tabBarIcon: (props) => (
            <MaterialCommunityIcons
              name="clock-time-four-outline"
              size={tabSize * 0.5}
              color={
                props.focused ? theme.colors.primary[500] : theme.colors.text
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileHome}
        options={{
          headerShown: false,
          tabBarIcon: (props) => (
            <MaterialCommunityIcons
              name="account-outline"
              size={tabSize * 0.5}
              color={
                props.focused ? theme.colors.primary[500] : theme.colors.text
              }
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
