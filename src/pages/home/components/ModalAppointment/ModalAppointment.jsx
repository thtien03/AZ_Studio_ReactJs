// src/components/ModalAppointment.jsx
import React, { useState, useEffect } from "react";
import { Modal, Form, Input, DatePicker, Select, Button, message, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import io from "socket.io-client";
import moment from "moment";

// Khởi tạo kết nối Socket.io
const socket = io("http://localhost:8080"); // Thay đổi URL này theo cấu hình server của bạn

const ModalAppointment = ({ open, onClose }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [listServices, setListServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/services"); // Thay đổi endpoint nếu cần
        setListServices(response.data.data);
      } catch (error) {
        console.error("Error fetching services:", error);
        messageApi.open({
          type: "error",
          content: "Không thể lấy danh sách dịch vụ!",
        });
      }
    };
    if (open) fetchServices();
  }, [open, messageApi]);

  const handleSubmitAppointment = async (values) => {
    try {
      // Chuẩn bị dữ liệu lịch hẹn
      const appointmentData = {
        fullName: values.fullName,
        phone: values.phone,
        email: values.email,
        appointmentDate: values.appointmentDate.format("YYYY-MM-DD"),
        serviceId: values.serviceId,
        // Thêm các trường khác nếu cần (ví dụ: appointmentTime)
      };

      // Gọi API tạo lịch hẹn
      const response = await axios.post("http://localhost:8080/api/v1/appointments", appointmentData);

      if (response.status === 201) {
        const newAppointment = response.data.data;

        // Emit sự kiện 'newAppointment' để thông báo tới admin
        socket.emit("newAppointment", newAppointment);

        onClose();
        messageApi.open({
          type: "success",
          content: "Đặt lịch thành công!",
        });
        form.resetFields();
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
      messageApi.open({
        type: "error",
        content: error.response?.data?.message || "Lỗi hệ thống, vui lòng thử lại sau!",
      });
    }
  };

  const uploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("Bạn chỉ có thể tải lên hình ảnh!");
      }
      return isImage || Upload.LIST_IGNORE;
    },
    multiple: true,
    maxCount: 5, // Giới hạn tối đa 5 hình ảnh (có thể điều chỉnh)
  };

  return (
    <div className="modal-appointment-wrap">
      {contextHolder}
      <Modal
        open={open}
        title="Đặt lịch hẹn"
        footer={false}
        centered
        onCancel={onClose}
      >
        <Form
          form={form}
          initialValues={{}}
          onFinish={handleSubmitAppointment}
          layout="vertical"
        >
          <Form.Item
            label="Họ và tên"
            name="fullName"
            rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
          >
            <Input placeholder="Họ và tên" />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
          >
            <Input placeholder="Số điện thoại" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="Ngày đặt lịch"
            name="appointmentDate"
            rules={[{ required: true, message: "Vui lòng chọn ngày đặt lịch!" }]}
          >
            <DatePicker
              style={{ width: "100%" }}
              placeholder="Chọn ngày đặt lịch"
              disabledDate={(current) => current && current < moment().startOf("day")}
            />
          </Form.Item>
          <Form.Item
            label="Dịch vụ"
            name="serviceId"
            rules={[{ required: true, message: "Vui lòng chọn dịch vụ!" }]}
          >
            <Select
              placeholder="Chọn loại dịch vụ"
              style={{ width: "100%" }}
              options={listServices.map((service) => ({
                value: service._id,
                label: service.name,
              }))}
            />
          </Form.Item>
          {/* Bạn có thể thêm trường chọn giờ đặt lịch nếu cần */}
          <Form.Item
            label="Hình ảnh"
            name="images"
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e && e.fileList;
            }}
            rules={[{ required: false }]} // Bạn có thể đặt required tùy theo nhu cầu
          >
            <Upload {...uploadProps} listType="picture">
              <Button icon={<PlusOutlined />}>Chọn hình ảnh</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Đặt lịch
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ModalAppointment;
