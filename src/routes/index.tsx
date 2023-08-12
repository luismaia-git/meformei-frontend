import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import UserLoginNavigator from "./userLogin";
import { TabNavigator } from "./tabNavigator";
import { TabAdminNavigator } from "./tabAdminNavigator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdditionalHoursNavigator from "./additionalHours";
import PeriodsNavigator from "./periods";
import HourNavigator from "./hour";
import DisciplineNavigator from "./disciplines";
import DisciplineAdminNavigator from "./disciplineAdmin";
import ProfileNavigator from "./profile";
import { ProgressDetail } from "../pages/ProgressDetail";
import  DisciplineAdmin from "./disciplineAdmin";

const Navigation = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigation.Navigator>
        <Navigation.Screen
          name="Account"
          component={UserLoginNavigator}
          options={{ headerShown: false }}
        />
        <Navigation.Screen
          name="Admin"
          component={TabAdminNavigator}
          options={{ headerShown: false }}
        />
        <Navigation.Screen
          name="DisciplineAdmin"
          component={DisciplineAdminNavigator}
          options={{ headerShown: false }}
        />
        <Navigation.Screen
          name="Tab"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Navigation.Screen
          name="ProgressDetail"
          component={ProgressDetail}
          options={{ headerShown: false }}
        />
        <Navigation.Screen
          name="AdditionalHours"
          component={AdditionalHoursNavigator}
          options={{ headerShown: false }}
        />
        <Navigation.Screen
          name="Periods"
          component={PeriodsNavigator}
          options={{ headerShown: false }}
        />
        <Navigation.Screen
          name="Hour"
          component={HourNavigator}
          options={{ headerShown: false }}
        />
        <Navigation.Screen
          name="Discipline"
          component={DisciplineNavigator}
          options={{ headerShown: false }}
        />
        <Navigation.Screen
          name="Profile"
          component={ProfileNavigator}
          options={{ headerShown: false }}
        />
      </Navigation.Navigator>
    </NavigationContainer>
  );
}
