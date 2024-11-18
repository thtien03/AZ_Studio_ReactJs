import axiosClient from "../api/axiosClient.js";

const serviceApi = {
  getListServices: () => {
    const url = "/service";
    return axiosClient.get(url);
  },

  getService: (id) => {
    const url = `/service/${id}`;
    return axiosClient.delete(url);
  },

  createService: () => {
    const url = "/service";
    return axiosClient.post(url);
  },

  updateService: (id) => {
    const url = `/category/${id}`;
    return axiosClient.put(url);
  },
};

export default serviceApi;
