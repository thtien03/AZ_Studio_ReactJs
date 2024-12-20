import axiosClient from "../api/axiosClient.js";

export const getListProductsService = async () => {
  const response = await axiosClient.get("/product");
  return response;
};

export const getProductByCategoryService = async (idCategory) => {
  const response = await axiosClient.get(`/product/${idCategory}`);
  return response;
};

export const getProductService = async (id) => {
  const response = await axiosClient.get(`/product/${id}`);
  return response;
};

// type: portfolio/product
export const createProductService = async ({
  name,
  description,
  images,
  category,
  price,
  type,
  bannerImage,
}) => {
  const response = await axiosClient.post("/product", {
    name,
    description,
    images,
    category,
    price,
    type,
    bannerImage,
  });
  return response;
};

export const updateCategoryService = async ({
  name,
  description,
  images,
  category,
  price,
  type,
  bannerImage,
}) => {
  const response = await axiosClient.put("/product", {
    name,
    description,
    images,
    category,
    price,
    type,
    bannerImage,
  });
  return response;
};

export const deleteProductService = async (id) => {
  const response = await axiosClient.delete(`/product/${id}`);
  return response;
};
