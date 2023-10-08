import axios from "axios";
import { getToken } from "../auth";

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
