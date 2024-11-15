// api/userApi.js
import axiosClient from './axiosClient';

const userApi = {
  getAll: (params) => {
    const url = '/users';
    return axiosClient.get(url, { params });
  },

  getById: (id) => {
    const url = `/users/${id}`;
    return axiosClient.get(url);
  },

  create: (data) => {
    const url = '/users';
    return axiosClient.post(url, data);
  },

  update: (id, data) => {
    const url = `/users/${id}`;
    return axiosClient.put(url, data);
  },

  delete: (id) => {
    const url = `/users/${id}`;
    return axiosClient.delete(url);
  },
};

export default userApi;
