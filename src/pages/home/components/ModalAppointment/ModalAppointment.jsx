import React, { useState, useEffect } from "react";
import { Modal, Form, Input, DatePicker, Select, Button, message } from "antd";
import moment from "moment";
import { getListServices } from "src/services/service.service";
import { createAppointmentService } from "src/services/appointment.service";

const ModalAppointment = ({ open, onClose }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [listServices, setListServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getListServices(); // API lấy danh sách dịch vụ
        setListServices(response.data);
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
      const appointmentData = {
        ...values,
        appointmentDate: values.appointmentDate.format("YYYY-MM-DD HH:mm"),
      };
      const fetchAppointment = await createAppointmentService(appointmentData);
      if (fetchAppointment) {
        onClose();
        messageApi.open({
          type: "success",
          content: "Đặt lịch thành công",
        });
        form.resetFields();
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
      messageApi.open({
        type: "error",
        content: "Lỗi hệ thống, vui lòng thử lại sau!",
      });
    }
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
            label="Ngày và giờ đặt lịch"
            name="appointmentDate"
            rules={[{ required: true, message: "Vui lòng chọn ngày và giờ!" }]}
          >
            <DatePicker
              style={{ width: "100%" }}
              showTime={{
                format: "HH:mm",
                defaultValue: moment().set({ hour: 8, minute: 0 }),
              }}
              format="YYYY-MM-DD HH:mm"
              placeholder="Chọn ngày và giờ"
              disabledDate={(current) =>
                current && current < moment().startOf("day")
              }
              disabledTime={(date) => {
                if (date && date.isSame(moment(), "day")) {
                  const currentHour = moment().hour();
                  const currentMinute = moment().minute();
                  return {
                    disabledHours: () =>
                      Array.from({ length: 24 }, (_, i) => i).filter(
                        (h) => h < currentHour
                      ),
                    disabledMinutes: (hour) =>
                      hour === currentHour
                        ? Array.from({ length: 60 }, (_, i) => i).filter(
                            (m) => m < currentMinute
                          )
                        : [],
                  };
                }
                return {};
              }}
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
