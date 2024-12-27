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
  
    // Hợp nhất các sản phẩm có cùng id
    const mergedCart = savedCart.reduce((acc, item) => {
      const existingItem = acc.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        acc.push(item);
      }
      return acc;
    }, []);
  
    setCartItems(mergedCart);
    localStorage.setItem("cart", JSON.stringify(mergedCart)); // Lưu lại giỏ hàng đã hợp nhất
  }, []);  

  // Tính phí vận chuyển
  const calculateShippingFee = (items, method) => {
    const totalWeight = items.reduce(
      (sum, item) => sum + (item.weight || 1) * item.quantity, // Nếu không có `weight`, mặc định là 1
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
    return 100000;
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

  // Xử lý thay đổi số lượng sản phẩm
  const handleQuantityChange = (value, id) => {
    if (value <= 0) {
      notification.warning({
        message: "Cảnh báo",
        description: "Số lượng không thể nhỏ hơn 1.",
      });
      return;
    }

    const newCartItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: value } : item
    );

    setCartItems(newCartItems);
    localStorage.setItem("cart", JSON.stringify(newCartItems));

    notification.success({
      message: "Cập nhật thành công",
      description: `Số lượng sản phẩm "${newCartItems.find((item) => item.id === id).name}" đã được thay đổi.`,
    });
  };

  // Xử lý xóa sản phẩm
  const handleDelete = (id) => {
    setItemToDelete(id);
    setIsModalVisible(true);
  };

  const handleConfirmDelete = () => {
    const newCartItems = cartItems.filter((item) => item.id !== itemToDelete);
    setCartItems(newCartItems);
    localStorage.setItem("cart", JSON.stringify(newCartItems));
    setIsModalVisible(false);

    notification.success({
      message: "Xóa thành công",
      description: "Sản phẩm đã được xóa khỏi giỏ hàng.",
    });
  };

  // Áp dụng mã giảm giá
  const handleApplyDiscount = async () => {
    try {
      if (!discountCode.trim()) {
        notification.warning({
          message: "Mã giảm giá trống",
          description: "Vui lòng nhập mã giảm giá trước khi áp dụng.",
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

      if (!response.ok || !result.discount) {
        throw new Error(result.message || "Mã giảm giá không hợp lệ");
      }

      const { value: discountPercentage, maxDiscount } = result.discount;

      let discountAmount = totalWithoutDiscount * (discountPercentage / 100);
      if (maxDiscount && discountAmount > maxDiscount) {
        discountAmount = maxDiscount;
      }

      setDiscountValue(discountAmount);

      notification.success({
        message: "Áp dụng thành công",
        description: `Giảm giá ${discountPercentage}% đã được áp dụng.`,
      });
    } catch (error) {
      notification.error({
        message: "Lỗi khi áp dụng mã giảm giá",
        description: error.message || "Vui lòng thử lại.",
      });
    }
  };

  // Tính tổng tiền
  const totalWithoutDiscount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingFee = calculateShippingFee(cartItems, deliveryMethod);
  const total = totalWithoutDiscount - discountValue + shippingFee;

  // Cột hiển thị bảng sản phẩm
  const columns = [
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img
          src={image}
          alt="product"
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
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

  return (
    <div>
      <Tabs
        defaultActiveKey="cart"
        onChange={(key) =>
          key === "cart"
            ? navigate("/shopping-cart")
            : navigate("/shopping-cart/order-history")
        }
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
              value={deliveryMethod}
              onChange={(e) => setDeliveryMethod(e.target.value)}
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
