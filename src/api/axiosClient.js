import axios from "axios";

const baseURL = "http://localhost:8080/api/v1";
let token = "";
let refreshToken = "";
const tokenString = localStorage.getItem("accessToken");
// const refreshTokenString = localStorage.getItem("refreshToken");

if (tokenString) {
  token = tokenString;
}
// if (refreshTokenString) {
//   refreshToken = refreshTokenString;
// }

const axiosClient = axios.create({
  baseURL,
  headers: {
    "content-type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

axiosClient.interceptors.request.use(async (config) => {
  config.headers.Authorization = `Bearer ${token}`;
  config.headers["x-refresh"] = token;
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
