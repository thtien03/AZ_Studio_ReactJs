import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Sử dụng navigate để chuyển hướng
import { Card, Radio, Input, Button, Form, notification } from "antd";
import "./PaymentPage.css";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Điều hướng người dùng sau khi thanh toán
  const [deliveryMethod, setDeliveryMethod] = useState(location.state?.deliveryMethod || "FAST");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [form] = Form.useForm();

  const subtotal = location.state?.subtotal || 0;
  const shippingFee = location.state?.shippingFee || 0;
  const discountValue = location.state?.discount || 0;
  const total = location.state?.total || subtotal + shippingFee - discountValue;

  const createOrderService = async (orderDetails) => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderDetails),
      });

      if (!response.ok) {
        throw new Error("Không thể tạo đơn hàng. Vui lòng thử lại.");
      }

      notification.success({
        message: "Đơn hàng đã được tạo thành công!",
      });

      // Điều hướng tới trang quản lý đơn hàng
      navigate("/admin/orders");
    } catch (error) {
      console.error("Lỗi tạo đơn hàng:", error);
      notification.error({
        message: "Lỗi khi tạo đơn hàng",
        description: error.message || "Đã xảy ra lỗi trong quá trình tạo đơn hàng.",
      });
    }
  };

  const onFinish = async (values) => {
    console.log("User Information:", values);

    const orderDetails = {
      customerName: values.name,
      phone: values.phone,
      address: values.address,
      note: values.note,
      subtotal,
      shippingFee,
      discount: discountValue,
      total,
      paymentMethod,
      deliveryMethod,
      status: "Đang xử lý",
    };

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
          // Gửi thông tin đơn hàng trước khi điều hướng VNPay
          await createOrderService(orderDetails);
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
      // Nếu không sử dụng VNPay, tạo đơn hàng trực tiếp
      await createOrderService(orderDetails);
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-column payment-left">
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
        <Card title="Chọn phương thức giao hàng" className="delivery-method-card">
          <Radio.Group
            onChange={(e) => setDeliveryMethod(e.target.value)}
            value={deliveryMethod}
          >
            <Radio value="FAST">FAST Giao hàng tiết kiệm</Radio>
            <Radio value="GO_JEK">GO_JEK Giao hàng tiết kiệm</Radio>
          </Radio.Group>
        </Card>

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

        <Card className="payment-summary">
          <p>Tạm tính: {subtotal.toLocaleString()} VND</p>
          <p>Phí vận chuyển: {shippingFee.toLocaleString()} VND</p>
          <p>Giảm giá: {discountValue.toLocaleString()} VND</p>
          <h3>
            Tổng thanh toán: <span>{total.toLocaleString()} VND</span>
          </h3>
        </Card>

        <Button
          type="primary"
          className="payment-button"
          onClick={() => form.submit()}
        >
          Tiến hành thanh toán
        </Button>
      </div>
    </div>
  );
};

export default PaymentPage;
