import {axiosClient} from "../api/axiosClient.js";

// src/services/order.service.js

export const getListOrderService = async (page = 1, pageSize = 10) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/v1/order?page=${page}&pageSize=${pageSize}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (!response.ok) {
      throw new Error("Lỗi khi lấy danh sách đơn hàng");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export const deleteOrderService = async (id) => {
  try {
    const response = await fetch(`http://localhost:8080/api/v1/order/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Lỗi khi xóa đơn hàng");
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error;
  }
};

export const updateOrderService = async (id, updatedData) => {
  try {
    const response = await fetch(`http://localhost:8080/api/v1/order/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) {
      throw new Error("Lỗi khi cập nhật đơn hàng");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  }
};
