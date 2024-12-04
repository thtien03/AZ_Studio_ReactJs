import axiosClient from "../api/axiosClient.js";

export const loginService = async ({ username, password }) => {
  const response = await axiosClient.post("/user/login", {
    username,
    password,
  });
  return response;
};

export const logoutService = async () => {
  const response = await axiosClient.get("/user/logout");
  return response;
};

export const refreshTokenService = async () => {
  const response = await axiosClient.get("/user/refresh_token");
  return response;
};

export const registerService = async ({ name, username, email, password }) => {
  const response = await axiosClient.post("/user/register", {
    name,
    username,
    email,
    password,
  });
  return response;
};
