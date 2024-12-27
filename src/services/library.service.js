import { axiosClient } from "../api/axiosClient.js";

export const getListLibrary = async (username) => {
  const response = await axiosClient.get(`/library/${username}`);
  return response;
};

export const createLibrary = async (alias, category, username, images) => {
  const response = await axiosClient.post(`/library/${alias}`, {
    category,
    username,
    images,
  });
  return response;
};

export const getImagesById = async (id) => {
  const response = await axiosClient.get(`/library/images/${id}`);
  return response;
};

export const toggleImageStatus = async (id, imageId) => {
  const response = await axiosClient.put(`/library/${id}/${imageId}/star`);
  return response;
};

export const addCommentToImage = async (id, imageId, comment) => {
  const response = await axiosClient.put(`/library/${id}/${imageId}/comments`, {
    comment,
  });
  return response;
};
