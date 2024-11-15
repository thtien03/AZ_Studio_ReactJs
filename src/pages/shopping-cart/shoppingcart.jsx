import React, { useState } from 'react';
import { Button, Table, InputNumber, Typography, Space, notification, Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const Cart = () => {
  // Dữ liệu sản phẩm trong giỏ hàng
  const initialCartItems = [
    {
      id: 1,
      name: 'Áo thun nam',
      price: 200000,
      quantity: 2,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'Quần jeans nữ',
      price: 350000,
      quantity: 1,
      image: 'https://via.placeholder.com/150',
    },
  ];

  // State để quản lý giỏ hàng
  const [cartItems, setCartItems] = useState(initialCartItems);
  // State để xác nhận xóa sản phẩm
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Hàm để thay đổi số lượng sản phẩm
  const handleQuantityChange = (value, id) => {
    const newCartItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: value } : item
    );
    setCartItems(newCartItems);

    // Hiển thị thông báo thành công
    notification.success({
      message: 'Cập nhật thành công',
      description: `Số lượng của sản phẩm "${newCartItems.find(item => item.id === id).name}" đã được thay đổi.`,
      duration: 2,
    });
  };

  // Hàm để xóa sản phẩm khỏi giỏ hàng
  const handleDelete = (id) => {
    setItemToDelete(id); // Lưu ID sản phẩm cần xóa
    setIsModalVisible(true); // Hiển thị Modal xác nhận
  };

  // Xử lý khi người dùng đồng ý xóa
  const handleConfirmDelete = () => {
    const newCartItems = cartItems.filter(item => item.id !== itemToDelete);
    setCartItems(newCartItems);
    setIsModalVisible(false); // Đóng Modal

    // Hiển thị thông báo thành công
    notification.success({
      message: 'Xóa thành công',
      description: 'Sản phẩm đã được xóa khỏi giỏ hàng.',
      duration: 2,
    });
  };

  // Xử lý khi người dùng hủy xóa
  const handleCancelDelete = () => {
    setIsModalVisible(false); // Đóng Modal
  };

  // Tính tổng giá trị giỏ hàng
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Dữ liệu cho bảng
  const columns = [
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (image) => <img src={image} alt="product" style={{ width: '100px', height: 'auto' }} />,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity, record) => (
        <InputNumber
          min={1}
          value={quantity}
          onChange={(value) => handleQuantityChange(value, record.id)}
          style={{ width: '100px' }}
        />
      ),
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `${price.toLocaleString()} VND`,
    },
    {
      title: 'Tổng giá',
      key: 'total',
      render: (text, record) => `${(record.price * record.quantity).toLocaleString()} VND`,
    },
    {
      title: '',
      key: 'action',
      render: (text, record) => (
        <Button
          type="link"
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record.id)}
        >
          Xóa
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: '30px' }}>
      <Title level={2}>Giỏ hàng của bạn</Title>
      
      <Table
        dataSource={cartItems}
        columns={columns}
        rowKey="id"
        pagination={false}
        bordered
      />

      <div style={{ marginTop: '20px' }}>
        <Space style={{ width: '100%' }} direction="vertical">
          <Text strong style={{ fontSize: '1.2rem' }}>Tổng cộng: {total.toLocaleString()} VND</Text>
          <Space>
            <Button type="primary" style={{ flex: 1 }}>
              Tiếp tục mua sắm
            </Button>
            <Button type="danger" style={{ flex: 1 }}>
              Thanh toán
            </Button>
          </Space>
        </Space>
      </div>

      {/* Modal xác nhận xóa */}
      <Modal
        title="Xác nhận xóa"
        visible={isModalVisible}
        onOk={handleConfirmDelete}
        onCancel={handleCancelDelete}
        okText="Đồng ý"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng không?</p>
      </Modal>
    </div>
  );
};

export default Cart;
