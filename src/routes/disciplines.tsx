import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DisciplineParamList } from "../types/types";
import { DisciplineHome } from "../pages/Discipline/Home";
import { ListAvailable } from "../pages/Discipline/ListAvailable";
import { FormationPlan } from "../pages/Discipline/FormationPlan";
import { DisciplineDetails } from "../pages/Discipline/Details";
import { DisciplineRegister } from "../pages/Discipline/Register";

const Discipline = createNativeStackNavigator<DisciplineParamList>();

export default function DisciplineNavigator() {
  return (
    <Discipline.Navigator initialRouteName="DisciplineHome">
      <Discipline.Screen
        name="DisciplineHome"
        component={DisciplineHome}
        options={{ headerShown: false }}
      />
      <Discipline.Screen
        name="ListAvailable"
        component={ListAvailable}
        options={{ headerShown: false }}
      />
      <Discipline.Screen
        name="FormationPlan"
        component={FormationPlan}
        options={{ headerShown: false }}
      />
      <Discipline.Screen
        name="DisciplineDetails"
        component={DisciplineDetails}
        options={{ headerShown: false }}
      />
      <Discipline.Screen
        name="DisciplineRegister"
        component={DisciplineRegister}
        options={{ headerShown: false }}
      />
    </Discipline.Navigator>
  );
}
