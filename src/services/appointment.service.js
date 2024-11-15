// api/appointmentApi.js
import axiosClient from '../config/axiosClient';

const appointmentApi = {
  getListAppointments: () => {
    const url = '/appointment'; // endpoint của API
    return axiosClient.get(url);
  },

  createAppointment: (data) => {
    const url = '/appointment';
    return axiosClient.post(url, data);
  },

  getAppointment: (id) => {
    const url = `/appointment/${id}`;
    return axiosClient.get(url);
  },
};

export default appointmentApi;
