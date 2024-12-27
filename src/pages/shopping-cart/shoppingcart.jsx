import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  InputNumber,
  Typography,
  Space,
  notification,
  Modal,
  Input,
  Radio,
  Tabs,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./shoppingcart.css";

const { Title, Text } = Typography;

const Cart = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [deliveryMethod, setDeliveryMethod] = useState("SAVER");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [discountCode, setDiscountCode] = useState("");
  const [discountValue, setDiscountValue] = useState(0);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);
console.log("check cart",cartItems)
  const calculateShippingFee = (items, method) => {
    const totalWeight = items.reduce(
      (sum, item) => sum + item.weight * item.quantity,
      0
    );
    const baseFee = calculateShippingByWeight(totalWeight);
    const methodFee = calculateShippingByMethod(method);
    return baseFee + methodFee;
  };

  const calculateShippingByWeight = (weight) => {
    if (weight <= 1) return 15000;
    else if (weight <= 5) return 30000;
    else if (weight <= 10) return 50000;
    else return 100000;
  };

  const calculateShippingByMethod = (method) => {
    switch (method) {
      case "FAST":
        return 20000;
      case "SAVER":
        return 10000;
      default:
        return 15000;
    }
  };

  const handleQuantityChange = (value, id) => {
    const newCartItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: value } : item
    );
    setCartItems(newCartItems);
    localStorage.setItem("cart", JSON.stringify(newCartItems));
    notification.success({
      message: "Cập nhật thành công",
      description: `Số lượng của sản phẩm "${newCartItems.find(
        (item) => item.id === id
      ).name}" đã được thay đổi.`,
      duration: 2,
    });
  };

  const handleDelete = (idToDelete) => { // Đổi tên biến thành idToDelete cho rõ ràng
    const newCartItems = cartItems.filter((item) => item._id !== idToDelete);

    setCartItems(newCartItems);
    localStorage.setItem("cart", JSON.stringify(newCartItems));
    notification.success({
        message: "Xóa thành công",
        description: "Sản phẩm đã được xóa khỏi giỏ hàng.",
        duration: 2,
    });
};

  const handleConfirmDelete = () => {
    const newCartItems = cartItems.filter((item) => item._id !== itemToDelete);
    setCartItems(newCartItems);
    localStorage.setItem("cart", JSON.stringify(newCartItems));
    setIsModalVisible(false);
    notification.success({
      message: "Xóa thành công",
      description: "Sản phẩm đã được xóa khỏi giỏ hàng.",
      duration: 2,
    });
  };

  const handleApplyDiscount = async () => {
    try {
      console.log("Applying discount with code:", discountCode);

      if (!discountCode) {
        notification.warning({
          message: "Mã giảm giá trống",
          description: "Vui lòng nhập mã giảm giá trước khi áp dụng.",
          duration: 2,
        });
        return;
      }

      const response = await fetch(
        "http://localhost:8080/api/v1/discounts/validate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: discountCode }),
        }
      );

      const result = await response.json();

      console.log("Discount API response:", result);

      if (!response.ok) {
        throw new Error(result.message || "Lỗi khi áp dụng mã giảm giá");
      }

      if (result.discount) {
        const discountPercentage = result.discount.value;
        const maxDiscount = result.discount.maxDiscount;

        // Tính giá trị giảm dựa trên phần trăm
        let discountAmount = totalWithoutDiscount * (discountPercentage / 100);

        // Giới hạn bởi giảm tối đa (nếu có)
        if (maxDiscount && discountAmount > maxDiscount) {
          discountAmount = maxDiscount;
        }

        setDiscountValue(discountAmount);

        notification.success({
          message: "Áp dụng thành công",
          description: `Bạn đã được giảm ${discountPercentage}% trên tổng giá trị đơn hàng, tối đa ${maxDiscount.toLocaleString()} VND.`,
          duration: 2,
        });
      } else {
        setDiscountValue(0);
        notification.error({
          message: "Mã giảm giá không hợp lệ",
          description: result.message || "Vui lòng thử mã khác.",
          duration: 2,
        });
      }
    } catch (error) {
      console.error("Error applying discount:", error.message);
      notification.error({
        message: "Lỗi khi áp dụng mã giảm giá",
        description: error.message || "Vui lòng thử lại sau.",
        duration: 2,
      });
    }
  };

  const totalWithoutDiscount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingFee = calculateShippingFee(cartItems, deliveryMethod);
  const total = totalWithoutDiscount - discountValue + shippingFee;

  const columns = [
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (_,record) => (
        <img
          src={record?.images[0]}
          alt="product"
          style={{ width: "200px", height: "150px", objectFit: "cover" }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/default-product.jpg";
          }}
        />
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity, record) => (
        <InputNumber
          min={1}
          value={quantity}
          onChange={(value) => handleQuantityChange(value, record.id)}
          style={{ width: "100px" }}
        />
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price.toLocaleString()} VND`,
    },
    {
      title: "Tổng giá",
      key: "total",
      render: (text, record) =>
        `${(record.price * record.quantity).toLocaleString()} VND`,
    },
    {
      title: "",
      key: "action",
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

  const handleTabChange = (key) => {
    if (key === "cart") {
      navigate("/shopping-cart");
    } else if (key === "order-history") {
      navigate("/Shopping-cart/OrderHistory");
    }
  };
  return (
    <div>
      {/* Tabs cho Giỏ hàng và Lịch sử mua hàng */}
      <Tabs
        defaultActiveKey="cart"
        onChange={handleTabChange}
        style={{ marginBottom: "20px" }}
        items={[
          { key: "cart", label: "Giỏ hàng" },
          { key: "order-history", label: "Lịch sử mua hàng" },
        ]}
      />

      <div className="cart-container">
        <div className="cart-left">
          <Title level={2}>Giỏ hàng của bạn</Title>
          <Table
            dataSource={cartItems}
            columns={columns}
            rowKey="id"
            pagination={false}
            bordered
          />
        </div>

        <div className="cart-right">
          <div className="delivery-method">
            <Text strong>Phương thức giao hàng:</Text>
            <Radio.Group
              onChange={(e) => setDeliveryMethod(e.target.value)}
              value={deliveryMethod}
            >
              <Radio value="SAVER">Giao hàng tiết kiệm</Radio>
              <Radio value="FAST">Giao hàng nhanh</Radio>
            </Radio.Group>
          </div>

          <div className="discount-section">
            <Text strong>Nhập mã giảm giá:</Text>
            <Space>
              <Input
                placeholder="Nhập mã giảm giá"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
              />
              <Button type="primary" onClick={handleApplyDiscount}>
                Áp dụng
              </Button>
            </Space>
            {discountValue > 0 && (
              <Text type="success">
                Bạn đã được giảm: {discountValue.toLocaleString()} VND
              </Text>
            )}
          </div>

          <div className="total-section">
            <Text strong>Phí vận chuyển: {shippingFee.toLocaleString()} VND</Text>
            <Text strong>Tổng cộng: {total.toLocaleString()} VND</Text>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Button
                type="danger"
                onClick={() =>
                  navigate("/shopping-cart/paymentpage", {
                    state: { subtotal: totalWithoutDiscount, shippingFee, total },
                  })
                }
              >
                Thanh toán
              </Button>
            </Space>
          </div>
        </div>
      </div>
      <Modal
        title="Xác nhận xóa"
        visible={isModalVisible}
        onOk={handleConfirmDelete}
        onCancel={() => setIsModalVisible(false)}
        okText="Đồng ý"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng không?</p>
      </Modal>
    </div>
  );
};

export default Cart;
