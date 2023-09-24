import { StudentSignup } from "Auth";
import { User, UserLogin } from "User";
import api from "./config/api";
import { callService } from "./config/service";

import AsyncStorage from "@react-native-async-storage/async-storage";

const getToken = async () => {
  const token = await AsyncStorage.getItem("token");
  return token;
};

const service = () => {
  const resource = "auth";

  async function postStudent(value: StudentSignup) {
    const path = `${resource}/student/signup`;

    const response = await callService(() => api.post(path, value));

    return response.data;
  }

  async function signin(value: UserLogin) {
    const path = `${resource}/signin`;
    const response = await callService(() => api.post<User>(path, value));

    return response;
  }

  async function session() {
    const path = `${resource}/session`;
    const token = getToken();
    const response = await callService(() =>
      api.get<boolean>(path, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
    );
    return response.data;
  }

  async function checkUsernameAvailability(username: string) {
    const path = `${resource}/student/check/username/${username}`;
    try {
      const response = await api.get<boolean>(path);
      return response.data;
    } catch (error) {
      return false;
    }
  }

  async function checkEmailAvailability(email: string) {
    const path = `${resource}/student/check/email/${email}`;
    try {
      const response = await api.get<boolean>(path);
      return response.data;
    } catch (error) {
      return false;
    }
  }

  async function checkRegistrationAvailability(registration: number) {
    const path = `${resource}/student/check/registration/${registration}`;
    try {
      const response = await api.get<boolean>(path);
      return response.data;
    } catch (error) {
      return false;
    }
  }

  return {
    postStudent,
    signin,
    session,
    checkEmailAvailability,
    checkUsernameAvailability,
    checkRegistrationAvailability,
  };
};

export const auth = service();
