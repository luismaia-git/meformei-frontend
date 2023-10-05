import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProfileHome } from "../pages/Profile/Home";
import { ProfileEdit} from "../pages/Profile/Edit";
import { ProfileParamList } from "../types/types";
import { ProfileDetails } from "../pages/Profile/Details";

const Profile = createNativeStackNavigator<ProfileParamList>();

export default function ProfileNavigator() {
  return (
    <Profile.Navigator initialRouteName="ProfileHome">
      <Profile.Screen
        name="ProfileHome"
        component={ProfileHome}
        options={{ headerShown: false }}
      />
      <Profile.Screen
        name="ProfileEdit"
        component={ProfileEdit}
        options={{ headerShown: false }}
      />
      <Profile.Screen
        name="ProfileDetails"
        component={ProfileDetails}
        options={{ headerShown: false}}
      />
    </Profile.Navigator>
  );
}
