import axiosClient from "../api/axiosClient.js";

export const getListAppointmentsService = async () => {
  const response = await axiosClient.get("/appointment");
  return response;
};

export const getAppointmentService = async (id) => {
  const response = await axiosClient.get(`/appointment/${id}`);
  return response;
};

export const createAppointmentService = async ({
  fullName,
  phone,
  email,
  appointmentDate,
  service,
}) => {
  const response = await axiosClient.post("/appointment", {
    fullName,
    phone,
    email,
    appointmentDate,
    service,
  });
  return response;
};
