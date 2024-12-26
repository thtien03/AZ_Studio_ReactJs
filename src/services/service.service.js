import {axiosClient} from "../api/axiosClient.js";

export const getListServices = async () => {
  const response = await axiosClient.get("/service");
  return response;
};

export const createService = async ({ name, description }) => {
  const response = await axiosClient.post("/service", {
    name,
    description,
  });
  return response;
};

export const updateService = async ({ name, description }) => {
  const response = await axiosClient.put("/service", {
    name,
    description,
  });
  return response;
};

export const deleteService = async (id) => {
  const response = await axiosClient.delete(`/service/${id}`);
  return response;
};
