import React, { useEffect, useState } from "react";
import { Table, Typography, Tabs } from "antd";
import { useNavigate } from "react-router-dom";
import "./OrderHistory.css";

const { Title } = Typography;

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch('http://localhost:8080/api/v1/order/user', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      console.log(data);
      setOrders(data.data);
    };

    fetchOrders();
  }, []);

  const handleTabChange = (key) => {
    if (key === "cart") {
      navigate("/shopping-cart/shoppingcart");
    } else if (key === "order-history") {
      navigate("/order-history");
    }
  };

  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Ngày đặt hàng',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (amount) => `${amount.toLocaleString()} VND`,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  return (
    <div className="order-history-container">
      {/* Tabs cho Giỏ hàng và Lịch sử mua hàng */}
      <Tabs
        defaultActiveKey="order-history"
        onChange={handleTabChange}
        style={{ marginBottom: "20px" }}
        items={[
          { key: "cart", label: "Giỏ hàng" },
          { key: "order-history", label: "Lịch sử mua hàng" },
        ]}
      />

      <Title level={2}>Lịch sử đơn hàng</Title>
      <Table dataSource={orders} columns={columns} rowKey="_id" pagination={false} />
    </div>
  );
};

export default OrderHistory;
