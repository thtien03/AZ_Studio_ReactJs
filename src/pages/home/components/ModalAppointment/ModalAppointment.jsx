/* eslint-disable no-template-curly-in-string */
import React, { useState, useEffect } from "react";
import { Modal, Form, Input, DatePicker, Select, Button, message } from "antd";
import { getListServices } from "../../../../services/service.service.js";
import { createAppointmentService } from "../../../../services/appointment.service.js";
import io from "socket.io-client";

const ModalAppointment = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [listServices, setListServices] = useState([]);

  const handleSubmitAppointment = async (value) => {
    try {
      const fetchAppointment = await createAppointmentService(value);
      if (fetchAppointment) {
        setOpenModal(false);
        messageApi.open({
          type: "success",
          content: "Đặt lịch thành công",
        });
      }
    } catch (error) {
      console.log("error", error);
      messageApi.open({
        type: "error",
        content: "Lỗi hệ thống, vui lòng thử lại sau!",
      });
    }
  };

  // useEffect(() => {
  //   // Kết nối đến Socket.IO server
  //   const socket = io.connect("http://localhost:3000");
  //   console.log(socket);
  //   // Lắng nghe sự kiện "newAppointment" từ server
  //   socket.on("newAppointment", (data) => {
  //     message.success({
  //       content: "Có một cuộc hẹn mới được tạo!",
  //       duration: 3,
  //     });
  //     console.log("Received new appointment:", data);
  //   });

  //   // Đảm bảo ngắt kết nối khi component unmount
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const resListServices = await getListServices();
        if (resListServices) setListServices(resListServices);
      } catch (error) {
        console.log("error", error);
      }
    };
    if (openModal) fetchServices();
  }, [openModal]);

  return (
    <div className="modal-appointment-wrap">
      {contextHolder}
      <button className="appointment-button" onClick={() => setOpenModal(true)}>
        Đặt lịch hẹn
      </button>
      <Modal
        open={openModal}
        title="Đặt lịch hẹn"
        footer={false}
        centered
        onCancel={() => setOpenModal(false)}
      >
        <Form
          form={form}
          initialValues={{}}
          onFinish={handleSubmitAppointment}
          layout="vertical"
        >
          <Form.Item
            rules={[{ required: true, message: "Vui lòng nhập vào ${label}" }]}
            label="Họ và tên"
            name="fullName"
          >
            <Input placeholder="Họ và tên" />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "Vui lòng nhập vào ${label}" }]}
            label="Số điện thoại"
            name="phone"
          >
            <Input placeholder="Số điện thoại" />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "Vui lòng nhập vào ${label}" }]}
            label="Email"
            name="email"
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "Vui lòng nhập vào ${label}" }]}
            label="Ngày đặt lịch"
            name="appointmentDate"
          >
            <DatePicker
              style={{ width: "100%" }}
              placeholder="Chọn ngày đặt lịch"
            />
          </Form.Item>
          <Form.Item
            label="Dịch vụ"
            name="serviceId"
            rules={[{ required: true, message: "Vui lòng nhập vào ${label}" }]}
          >
            <Select
              placeholder="Chọn loại dịch vụ"
              style={{ width: "100%" }}
              options={listServices.data?.map((service) => ({
                value: service._id,
                label: service.name,
              }))}
            />
          </Form.Item>
          <Form.Item style={{ display: "flex", justifyContent: "end" }}>
            <Button type="primary" htmlType="submit">
              Đặt lịch
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ModalAppointment;
