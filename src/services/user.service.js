import axiosClient from "../api/axiosClient.js";

export const getListUsers = async () => {
  const response = await axiosClient.get("/user");
  return response;
};
