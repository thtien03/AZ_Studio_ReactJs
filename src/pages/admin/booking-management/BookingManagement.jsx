import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, DatePicker, message } from 'antd';
import moment from 'moment';
import './BookingManagement.css';

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const [form] = Form.useForm();

  const services = [
    {
      _id: { $oid: "67644a4544736100109365db" },
      name: "Chụp hình cưới Ngoại cảnh",
    },
    {
      _id: { $oid: "67644ae044736100109365dd" },
      name: "Chụp ảnh kỷ yếu",
    },
    {
      _id: { $oid: "67644ae044736100109365de" },
      name: "Chụp ảnh gia đình",
    },
  ];

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = {
          data: [
            {
              fullName: "Trần Hữu Tiến",
              phone: "0823746291",
              email: "tranhuutien@gmail.com",
              appointmentDate: "2024-12-30T17:00:00.000Z",
              serviceId: "67644a4544736100109365db",
              _id: "676ee0223ce6e042e6418f23",
            },
          ],
        };

        const formattedData = response.data.map((booking) => {
          const service = services.find(
            (service) => service._id.$oid === booking.serviceId
          );
          return {
            ...booking,
            serviceName: service ? service.name : "Không rõ",
            appointmentDate: moment(booking.appointmentDate).format('YYYY-MM-DD'),
            time: moment(booking.appointmentDate).format('HH:mm'),
          };
        });

        setBookings(formattedData);
      } catch (error) {
        message.error("Lỗi khi tải dữ liệu đặt lịch!");
      }
    };

    fetchBookings();
  }, []);

  const columns = [
    { title: 'ID', dataIndex: '_id', key: 'id' },
    { title: 'Tên khách hàng', dataIndex: 'fullName', key: 'customerName' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Số điện thoại', dataIndex: 'phone', key: 'phone' },
    { title: 'Dịch vụ', dataIndex: 'serviceName', key: 'service' },
    { title: 'Ngày', dataIndex: 'appointmentDate', key: 'date' },
    { title: 'Giờ', dataIndex: 'time', key: 'time' },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => record.status || "Chờ xác nhận",
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button type="primary" onClick={() => handleEdit(record)} style={{ marginRight: 8 }}>
            Xác nhận
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(record._id)}>
            Hủy
          </Button>
        </>
      ),
    },
  ];

  const handleEdit = (booking) => {
    setEditingBooking(booking);
    form.setFieldsValue({
      ...booking,
      date: moment(booking.appointmentDate, 'YYYY-MM-DD HH:mm'),
    });
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    setBookings(bookings.filter((booking) => booking._id !== id));
    message.success('Đã xóa đặt lịch thành công');
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      const updatedBookings = bookings.map((booking) => {
        if (booking._id === editingBooking._id) {
          return {
            ...booking,
            ...values,
            appointmentDate: values.date.format('YYYY-MM-DD HH:mm'),
          };
        }
        return booking;
      });

      setBookings(updatedBookings);
      setIsModalVisible(false);
      form.resetFields();
      setEditingBooking(null);
      message.success('Cập nhật đặt lịch thành công');
    });
  };

  return (
    <div className="booking-management-container">
      <h2 className="booking-management-title">Quản Lý Đặt Lịch</h2>

      <Table columns={columns} dataSource={bookings} rowKey="_id" />

      <Modal
        title="Chỉnh sửa thông tin đặt lịch"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setEditingBooking(null);
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="fullName"
            label="Tên khách hàng"
            rules={[{ required: true, message: 'Vui lòng nhập tên khách hàng!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="serviceId"
            label="Dịch vụ"
            rules={[{ required: true, message: 'Vui lòng chọn dịch vụ!' }]}
          >
            <Select>
              {services.map((service) => (
                <Select.Option key={service._id.$oid} value={service._id.$oid}>
                  {service.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="date"
            label="Ngày và giờ"
            rules={[{ required: true, message: 'Vui lòng chọn ngày và giờ!' }]}
          >
            <DatePicker
              showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD HH:mm"
              placeholder="Chọn ngày và giờ"
              disabledDate={(current) =>
                current && current < moment().startOf('day')
              }
              disabledTime={(current) => {
                if (current && current.isSame(moment(), 'day')) {
                  const currentHour = moment().hour();
                  const currentMinute = moment().minute();
                  return {
                    disabledHours: () =>
                      Array.from({ length: 24 }, (_, i) => i).filter((h) => h < currentHour),
                    disabledMinutes: (hour) =>
                      hour === currentHour
                        ? Array.from({ length: 60 }, (_, i) => i).filter((m) => m < currentMinute)
                        : [],
                  };
                }
                return {};
              }}
            />
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

export default BookingManagement;
