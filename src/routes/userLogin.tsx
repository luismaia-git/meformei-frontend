import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../pages/Login";
import { UserLoginNavigatorParamList } from "../types/types";
import AccountInfo from "../pages/Register/AccountInfo";
import GeneralInfo from "../pages/Register/GeneralInfo";
import { FailedRegister, SucessRegister } from "../components/layout/Modal";

const UserLogin = createNativeStackNavigator<UserLoginNavigatorParamList>();

export default function UserLoginNavigator() {
  return (
    <UserLogin.Navigator initialRouteName="Login">
      <UserLogin.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <UserLogin.Screen
        name="AccountInfo"
        component={AccountInfo}
        options={{ headerShown: false }}
      />
      <UserLogin.Screen
        name="GeneralInfo"
        component={GeneralInfo}
        options={{ headerShown: false }}
      />
      <UserLogin.Screen
        name="SucessRegister"
        component={SucessRegister}
        options={{ headerShown: false }}
      />
      <UserLogin.Screen
        name="FailedRegister"
        component={FailedRegister}
        options={{ headerShown: false }}
      />
    </UserLogin.Navigator>
  );
}
