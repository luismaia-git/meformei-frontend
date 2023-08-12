import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PeriodsParamList } from "../types/types";
import { PeriodsHome } from "../pages/Periods/Home";
import { PeriodsRegister } from "../pages/Periods/Register";
import { PeriodsEdit } from "../pages/Periods/Edit";

const Periods = createNativeStackNavigator<PeriodsParamList>();

export default function PeriodsNavigator() {
  return (
    <Periods.Navigator initialRouteName="PeriodsHome">
      <Periods.Screen
        name="PeriodsHome"
        component={PeriodsHome}
        options={{ headerShown: false }}
      />
      <Periods.Screen
        name="PeriodsRegister"
        component={PeriodsRegister}
        options={{ headerShown: false }}
      />
      <Periods.Screen
        name="PeriodsEdit"
        component={PeriodsEdit}
        options={{ headerShown: false }}
      />
    </Periods.Navigator>
  );
}
