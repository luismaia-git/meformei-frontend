import axios from "axios";

const api = axios.create({
  baseURL: "https://meformei-backend-production.up.railway.app/",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  },
});

export default api;
