import {axiosClient} from "../api/axiosClient.js";

export const getListOrderService = async () => {
  const response = await axiosClient.get("/order");
  return response;
};

export const approveOrderService = async (id) => {
  const response = await axiosClient.put(`/order/${id}/approve`);
  return response;
};

// export const orderservice= async()