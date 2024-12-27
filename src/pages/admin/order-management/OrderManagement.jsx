// src/pages/admin/OrderManagement.jsx
import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Select, message } from "antd";
import "../booking-management/BookingManagement.css";
import usePagination from "@mui/material/usePagination/usePagination";
import { getListOrderService } from "src/services/order.service";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [form] = Form.useForm();

  const {
      data: listOrder,
      loading,
      refresh,
    } = usePagination(
      "listOrder",
      {
        page: 1,
      },
      getListOrderService
    );
  

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Sản phẩm",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price) => `${price.toLocaleString("vi-VN")}đ`,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (_, record) => (
        <>
          <Button
            type="primary"
            onClick={() => handleEdit(record)}
            style={{ marginRight: 8 }}
          >
            Sửa
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(record.id)}>
            Xóa
          </Button>
        </>
      ),
    },
  ];

  const handleEdit = (order) => {
    setEditingOrder(order);
    form.setFieldsValue(order);
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    setOrders(orders.filter((order) => order.id !== id));
    message.success("Đã xóa đơn hàng thành công");
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      const updatedOrders = orders.map((order) => {
        if (order.id === editingOrder.id) {
          return {
            ...order,
            ...values,
          };
        }
        return order;
      });

      setOrders(updatedOrders);
      setIsModalVisible(false);
      form.resetFields();
      setEditingOrder(null);
      message.success("Cập nhật đơn hàng thành công");
    });
  };

  return (
    <div className="booking-management-container">
      <h2 className="booking-management-title">Quản Lý Đơn Hàng</h2>

      <Table columns={columns} dataSource={listOrder?.data} />

      <Modal
        title="Chỉnh sửa thông tin đơn hàng"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setEditingOrder(null);
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="customerName"
            label="Tên khách hàng"
            rules={[
              { required: true, message: "Vui lòng nhập tên khách hàng!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="product"
            label="Sản phẩm"
            rules={[{ required: true, message: "Vui lòng chọn sản phẩm!" }]}
          >
            <Select>
              <Select.Option value="Album ảnh cưới">
                Album ảnh cưới
              </Select.Option>
              <Select.Option value="Album ảnh kỷ yếu">
                Album ảnh kỷ yếu
              </Select.Option>
              <Select.Option value="Album ảnh gia đình">
                Album ảnh gia đình
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="quantity"
            label="Số lượng"
            rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
          >
            <Input type="number" min={1} />
          </Form.Item>
          <Form.Item
            name="totalPrice"
            label="Tổng tiền"
            rules={[{ required: true, message: "Vui lòng nhập tổng tiền!" }]}
          >
            <Input type="number" min={0} />
          </Form.Item>
          <Form.Item
            name="status"
            label="Trạng thái"
            rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}
          >
            <Select>
              <Select.Option value="Đang xử lý">Đang xử lý</Select.Option>
              <Select.Option value="Đã thanh toán">Đã thanh toán</Select.Option>
              <Select.Option value="Đã hủy">Đã hủy</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default OrderManagement;
