import axios from "axios";

const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  },
});

export default api;
