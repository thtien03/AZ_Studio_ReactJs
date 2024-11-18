import axios from "axios";

const baseURL = "http://localhost:8080/api/v1";
console.log(baseURL);
let token = JSON.parse(localStorage.getItem("token"));
const axiosClient = axios.create({
  baseURL,
  headers: {
    "content-type": "application/json",
    Authorization: `Bearer ${token?.accessToken}`,
  },
});
axiosClient.interceptors.request.use(async (config) => {
  token = JSON.parse(localStorage.getItem("token"));
  config.headers.Authorization = `Bearer ${token?.accessToken}`;
  config.headers["x-refresh"] = token?.refreshToken;
  return config;
});
axiosClient.interceptors.response.use(
  async (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (error) => {
    throw error;
  }
);
export default axiosClient;
