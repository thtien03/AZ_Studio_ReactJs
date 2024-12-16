// src/pages/admin/productManagement.jsx
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, DatePicker, message } from 'antd';
import moment from 'moment';
import './ProductManagement.css';

const ProductManagement = () => {
  const [products, setProduct] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingproduct, setEditingproduct] = useState(null);
  const [form] = Form.useForm();

  // Giả lập dữ liệu sản phẩm
  useEffect(() => {
    const mockproducts = [
      {
        id: 1,
        productName: 'Sony A7R3',
        category: 'Máy ảnh',
        date: '2024-02-20',
        time: '09:00',
        status: 'Đã xác nhận',
        phone: '0123456789'
      },
      // Thêm dữ liệu mẫu khác...
    ];
    setProduct(mockproducts);
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Ngày',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Giờ',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button type="primary" onClick={() => handleEdit(record)} style={{ marginRight: 8 }}>
            Sửa
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(record.id)}>
            Xóa
          </Button>
        </>
      ),
    },
  ];

  const handleEdit = (product) => {
    setEditingproduct(product);
    form.setFieldsValue({
      ...product,
      date: moment(product.date)
    });
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    setProduct(products.filter(product => product.id !== id));
    message.success('Đã xóa sản phẩm thành công');
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      const updatedproducts = products.map(product => {
        if (product.id === editingproduct.id) {
          return {
            ...product,
            ...values,
            date: values.date.format('YYYY-MM-DD')
          };
        }
        return product;
      });
      
      setProduct(updatedproducts);
      setIsModalVisible(false);
      form.resetFields();
      setEditingproduct(null);
      message.success('Cập nhật sản phẩm thành công');
    });
  };

  return (
    <div className="product-management-container">
      <h2 className="product-management-title">Quản Lý Sản Phẩm</h2>
      
      <Table columns={columns} dataSource={products} />

      <Modal
        title="Chỉnh sửa thông tin sản phẩm"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setEditingproduct(null);
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="productName"
            label="Tên sản phẩm"
            rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="Dịch vụ"
            rules={[{ required: true, message: 'Vui lòng chọn dịch vụ!' }]}
          >
            <Select>
              <Select.Option value="Chụp ảnh cưới">Chụp ảnh cưới</Select.Option>
              <Select.Option value="Chụp ảnh kỷ yếu">Chụp ảnh kỷ yếu</Select.Option>
              <Select.Option value="Chụp ảnh gia đình">Chụp ảnh gia đình</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="date"
            label="Ngày"
            rules={[{ required: true, message: 'Vui lòng chọn ngày!' }]}
          >
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item
            name="time"
            label="Giờ"
            rules={[{ required: true, message: 'Vui lòng chọn giờ!' }]}
          >
            <Select>
              <Select.Option value="09:00">09:00</Select.Option>
              <Select.Option value="10:00">10:00</Select.Option>
              <Select.Option value="14:00">14:00</Select.Option>
              <Select.Option value="15:00">15:00</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="status"
            label="Trạng thái"
            rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
          >
            <Select>
              <Select.Option value="Chờ xác nhận">Chờ xác nhận</Select.Option>
              <Select.Option value="Đã xác nhận">Đã xác nhận</Select.Option>
              <Select.Option value="Đã hủy">Đã hủy</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductManagement;
