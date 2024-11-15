// api/categoryApi.js
import axiosClient from './axiosClient';

const categoryApi = {
  getAllCategories: () => {
    const url = '/category';
    return axiosClient.get(url);
  },

  getCategory: (id) => {
    const url = `/category/${id}`;
    return axiosClient.get(url);
  },

  createCategory: (data) => {
    const url = '/category';
    return axiosClient.post(url, data);
  },

  updateCategory: (id, data) => {
    const url = `/category/${id}`;
    return axiosClient.put(url, data);
  },

  deleteCategory: (id) => {
    const url = `/category/${id}`;
    return axiosClient.delete(url);
  },
};

export default categoryApi;
