import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "User";

export const colorModeManager = {
  get: async () => {
    try {
      return await AsyncStorage.getItem("@color-mode");
    } catch (e) {
      return null;
    }
  },
  set: async (value: string) => {
    try {
      await AsyncStorage.setItem("@color-mode", value);
    } catch (e) {
      console.log(e);
    }
  },
};

export const userSave = {
  get: async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@user");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      return null;
    }
  },
  set: async (user: User) => {
    try {
      const jsonValue = JSON.stringify(user);
      await AsyncStorage.setItem("@user", jsonValue);
    } catch (e) {
      console.log(e);
    }
  },
  delete: async () => {
    try {
      await AsyncStorage.removeItem("@user");
    } catch (e) {
      console.log(e);
    }
  },
};
