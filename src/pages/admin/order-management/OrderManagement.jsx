// src/pages/admin/OrderManagement.jsx
import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Select, message, Spin } from "antd";
import { getListOrderService, updateOrderService, deleteOrderService } from "src/services/order.service";
import "../booking-management/BookingManagement.css";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  // Fetch orders from API
  const fetchOrders = async (page, pageSize) => {
    try {
      setLoading(true);
      const result = await getListOrderService(page, pageSize);
      setOrders(result.data);
      setPagination({
        current: result.currentPage,
        pageSize,
        total: result.totalOrders,
      });
    } catch (error) {
      message.error("Không thể tải danh sách đơn hàng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(pagination.current, pagination.pageSize);
  }, []);

  const handleEdit = (order) => {
    setEditingOrder(order);
    form.setFieldsValue(order);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await deleteOrderService(id);
      message.success("Đã xóa đơn hàng thành công");
      fetchOrders(pagination.current, pagination.pageSize); // Refresh list
    } catch (error) {
      message.error("Không thể xóa đơn hàng");
    } finally {
      setLoading(false);
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      await updateOrderService(editingOrder.id, values);

      message.success("Cập nhật đơn hàng thành công");
      setIsModalVisible(false);
      form.resetFields();
      fetchOrders(pagination.current, pagination.pageSize); // Refresh list
    } catch (error) {
      message.error("Không thể cập nhật đơn hàng");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
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
          <Button
            type="primary"
            danger
            onClick={() => handleDelete(record._id)}
          >
            Xóa
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="booking-management-container">
      <h2 className="booking-management-title">Quản Lý Đơn Hàng</h2>
      {loading ? (
        <Spin />
      ) : (
        <Table
          columns={columns}
          dataSource={orders}
          rowKey="_id"
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            onChange: (page, pageSize) => fetchOrders(page, pageSize),
          }}
        />
      )}

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
            rules={[{ required: true, message: "Vui lòng nhập tên khách hàng!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="product"
            label="Sản phẩm"
            rules={[{ required: true, message: "Vui lòng chọn sản phẩm!" }]}
          >
            <Select>
              <Select.Option value="Album ảnh cưới">Album ảnh cưới</Select.Option>
              <Select.Option value="Album ảnh kỷ yếu">Album ảnh kỷ yếu</Select.Option>
              <Select.Option value="Album ảnh gia đình">Album ảnh gia đình</Select.Option>
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
        </Form>
      </Modal>
    </div>
  );
};

export default OrderManagement;
