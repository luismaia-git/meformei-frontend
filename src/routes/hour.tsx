import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HourHome } from "../pages/Hour/Home";
import { HourParamList } from "../types/types";
import { HoursList } from "../pages/Hour/List";

const Hour = createNativeStackNavigator<HourParamList>();

export default function HourNavigator() {
  return (
    <Hour.Navigator initialRouteName="HourHome">
      <Hour.Screen
        name="HourHome"
        component={HourHome}
        options={{ headerShown: false }}
      />
      <Hour.Screen
        name="HoursList"
        component={HoursList}
        options={{ headerShown: false }}
      />
    </Hour.Navigator>
  );
}
