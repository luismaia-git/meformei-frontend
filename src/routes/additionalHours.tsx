import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AdditionalHoursParamList } from "../types/types";
import { AdditionalHoursHome } from "../pages/AdditionalHours/Home";
import { AdditionalHoursRegister } from "../pages/AdditionalHours/Register";
import { AdditionalHoursEdit } from "../pages/AdditionalHours/Edit";
import { AdditionalHoursDetails } from "../pages/AdditionalHours/Details";

const AdditionalHours = createNativeStackNavigator<AdditionalHoursParamList>();

export default function AdditionalHoursNavigator() {
  return (
    <AdditionalHours.Navigator initialRouteName="AdditionalHoursHome">
      <AdditionalHours.Screen
        name="AdditionalHoursHome"
        component={AdditionalHoursHome}
        options={{ headerShown: false }}
      />
      <AdditionalHours.Screen
        name="AdditionalHoursRegister"
        component={AdditionalHoursRegister}
        options={{ headerShown: false }}
      />
      <AdditionalHours.Screen
        name="AdditionalHoursEdit"
        component={AdditionalHoursEdit}
        options={{ headerShown: false }}
      />
      <AdditionalHours.Screen
        name="AdditionalHoursDetails"
        component={AdditionalHoursDetails}
        options={{ headerShown: false }}
      />
    </AdditionalHours.Navigator>
  );
}
