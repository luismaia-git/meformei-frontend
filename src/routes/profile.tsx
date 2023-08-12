import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProfileParamList } from "../types/types";
import { ProfileHome } from "../pages/Profile/Home";

const Profile = createNativeStackNavigator<ProfileParamList>();

export default function ProfileNavigator() {
  return (
    <Profile.Navigator initialRouteName="ProfileHome">
      <Profile.Screen
        name="ProfileHome"
        component={ProfileHome}
        options={{ headerShown: false }}
      />
    </Profile.Navigator>
  );
}
