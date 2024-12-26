import { axiosClient, axiosFormData } from "src/api/axiosClient";

export const uploadFile = async (formData) => {
  const response = await axiosFormData.post("/file/upload",
    formData
  );
  return response;
};

export const deleteFile = async (fileId) => {
  const response = await axiosClient.delete(
   `/file/remove/${fileId}`
  );
  return response;
};
