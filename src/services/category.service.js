import axiosClient from "../api/axiosClient.js";

export const getListCategoriesService = async () => {
  const response = await axiosClient.get("/category");
  return response;
};

export const getCategoryService = async (id) => {
  const response = await axiosClient.get(`/category/${id}`);
  return response;
};

// type: portfolio/product
export const createCategoryService = async ({ name, type }) => {
  const response = await axiosClient.post("/category", {
    name,
    description: "",
    type,
  });
  return response;
};

export const updateCategoryService = async ({ name, type }) => {
  const response = await axiosClient.put("/category", {
    name,
    description: "",
    type,
  });
  return response;
};

export const deleteCategoryService = async (id) => {
  const response = await axiosClient.delete(`/category/${id}`);
  return response;
};
