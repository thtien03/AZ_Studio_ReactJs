// api/appointmentApi.js
import axiosClient from './axiosClient';

const productApi = {
  getListProducts: () => {
    const url = '/product'; // endpoint của API
    return axiosClient.get(url);
  },

  createProduct: (data) => {
    const url = '/product';
    return axiosClient.post(url, data);
  },

  getProduct: (id) => {
    const url = `/product/${id}`;
    return axiosClient.get(url);
  },

  updateProducts: (id) => {
    const url = `/product/${id}`; 
    return axiosClient.put(url);
  },

  deleteProducts: (id) => {
    const url = `/product/${id}`; 
    return axiosClient.get(url);
  },

  getProducts: (categoryid) => {
    const url = `/product/${categoryid}`; 
    return axiosClient.get(url);
  },
};

export default productApi;
