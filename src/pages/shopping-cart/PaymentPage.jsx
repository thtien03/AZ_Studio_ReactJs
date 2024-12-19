import React, { useState } from "react";
import { useLocation } from "react-router-dom"; // Để lấy state từ ShoppingCart
import { Card, Radio, Input, Button, Form, notification } from "antd";
import "./PaymentPage.css";

const PaymentPage = () => {
  const location = useLocation(); // Lấy state từ React Router
  const [deliveryMethod, setDeliveryMethod] = useState(location.state?.deliveryMethod || "FAST");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [form] = Form.useForm();

  // Nhận các giá trị từ ShoppingCart
  const subtotal = location.state?.subtotal || 0; // Tổng tạm tính
  const shippingFee = location.state?.shippingFee || 0; // Phí vận chuyển
  const discount = location.state?.discount || 0; // Giảm giá
  const total = location.state?.total || subtotal + shippingFee - discount; // Tổng thanh toán

  const onFinish = async (values) => {
    console.log("User Information:", values);

    if (paymentMethod === "vnpay") {
      try {
        const response = await fetch(
          "http://localhost:8080/api/v1/vnpay/create_payment",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              amount: total * 100, // Tổng tiền nhân 100
              orderDescription: `Thanh toán đơn hàng của ${values.name}`,
              orderId: new Date().getTime().toString(), // Mã đơn hàng duy nhất
            }),
          }
        );

        const data = await response.json();

        if (data.paymentUrl) {
          // Chuyển hướng đến cổng thanh toán VNPay
          window.location.href = data.paymentUrl;
        } else {
          notification.error({
            message: "Không thể tạo thanh toán",
            description: data.message || "Vui lòng thử lại.",
          });
        }
      } catch (error) {
        console.error("Lỗi khi tạo thanh toán VNPay:", error);
        notification.error({
          message: "Lỗi thanh toán",
          description: "Đã xảy ra lỗi trong quá trình thanh toán.",
        });
      }
    } else {
      // Xử lý đặt hàng thông thường
      notification.success({
        message: "Đặt hàng thành công!",
        description: "Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.",
      });
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-column payment-left">
        {/* User Information */}
        <Card title="Nhập thông tin người nhận" className="user-info-card">
          <Form layout="vertical" form={form} onFinish={onFinish}>
            <Form.Item
              label="Họ và tên"
              name="name"
              rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
            >
              <Input placeholder="Nguyễn Văn A" />
            </Form.Item>
            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
            >
              <Input placeholder="0123456789" />
            </Form.Item>
            <Form.Item
              label="Địa chỉ giao hàng"
              name="address"
              rules={[
                { required: true, message: "Vui lòng nhập địa chỉ giao hàng!" },
              ]}
            >
              <Input.TextArea placeholder="123 Đường ABC, Quận X, HCM" />
            </Form.Item>
            <Form.Item label="Ghi chú" name="note">
              <Input.TextArea placeholder="Lưu ý giao hàng" />
            </Form.Item>
          </Form>
        </Card>
      </div>

      <div className="payment-column payment-right">
        {/* Delivery Method */}
        <Card title="Chọn phương thức giao hàng" className="delivery-method-card">
          <Radio.Group
            onChange={(e) => setDeliveryMethod(e.target.value)}
            value={deliveryMethod}
          >
            <Radio value="FAST">FAST Giao hàng tiết kiệm</Radio>
            <Radio value="GO_JEK">GO_JEK Giao hàng tiết kiệm</Radio>
          </Radio.Group>
        </Card>

        {/* Payment Method */}
        <Card title="Chọn phương thức thanh toán" className="payment-method-card">
          <Radio.Group
            onChange={(e) => setPaymentMethod(e.target.value)}
            value={paymentMethod}
          >
            <Radio value="cash">Thanh toán tiền mặt khi nhận hàng</Radio>
            <Radio value="vnpay">Thanh toán bằng VNPay</Radio>
          </Radio.Group>
          {paymentMethod === "vnpay" && (
            <p style={{ color: "blue", marginTop: "10px" }}>
              Bạn sẽ được chuyển đến cổng thanh toán VNPay để hoàn tất giao dịch.
            </p>
          )}
        </Card>

        {/* Order Summary */}
        <Card className="payment-summary">
          <p>Tạm tính: {subtotal.toLocaleString()} VND</p>
          <p>Phí vận chuyển: {shippingFee.toLocaleString()} VND</p>
          <p>Giảm giá: {discount.toLocaleString()} VND</p>
          <h3>
            Tổng thanh toán: <span>{total.toLocaleString()} VND</span>
          </h3>
        </Card>

        <Button
          type="primary"
          className="payment-button"
          onClick={() => form.submit()} // Kích hoạt form
        >
          Tiến hành thanh toán
        </Button>
      </div>
    </div>
  );
};

export default PaymentPage;
