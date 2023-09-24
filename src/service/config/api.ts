import axios from "axios";

const api = axios.create({
  baseURL: process.env.API_URL || "http://204.216.155.107:3000/",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  },
});

export default api;
