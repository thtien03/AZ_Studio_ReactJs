import {axiosClient} from "../api/axiosClient.js";

export const getListUsers = async () => {
  const response = await axiosClient.get("/user");
  return response;
};

export const lockUserService = async (userId) => {
  const response = await axiosClient.put(`/user/block/${userId}`);
  return response;
};
