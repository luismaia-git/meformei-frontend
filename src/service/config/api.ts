import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const getToken = async () => {
  const token = await AsyncStorage.getItem("token");
  return token;
};

const api = axios.create({
  baseURL: process.env.API_URL || "http://204.216.155.107:3000/",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  },
});
const token = getToken();
if (token) {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
}

export default api;
