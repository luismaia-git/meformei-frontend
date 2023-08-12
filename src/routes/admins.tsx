import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AdminParamList } from "../types/types";
import { ListAdmins } from "../pages/Admin/ListAdmins";
import { ListDisciplineAdmin } from "../pages/DisciplineAdmin/ListDisciplineAdmin";
import  AddDisciplineAdmin  from "../pages/DisciplineAdmin/AddDisciplineAdmin";
import { DisciplineDetails } from "../pages/Discipline/Details";

const Admin = createNativeStackNavigator<AdminParamList>();

export default function AdminNavigator() {
  return (
    <Admin.Navigator initialRouteName="ListAdmins">
      <Admin.Screen
        name="ListAdmins"
        component={ListAdmins}
        options={{ headerShown: false }}
      />
    </Admin.Navigator>
  );
}
