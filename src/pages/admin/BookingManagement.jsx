// src/pages/admin/BookingManagement.jsx
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, DatePicker, message } from 'antd';
import moment from 'moment';
import './BookingManagement.css';

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const [form] = Form.useForm();

  // Giả lập dữ liệu đặt lịch
  useEffect(() => {
    const mockBookings = [
      {
        id: 1,
        customerName: 'Nguyễn Văn A',
        service: 'Chụp ảnh cưới',
        date: '2024-02-20',
        time: '09:00',
        status: 'Đã xác nhận',
        phone: '0123456789'
      },
      // Thêm dữ liệu mẫu khác...
    ];
    setBookings(mockBookings);
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'Dịch vụ',
      dataIndex: 'service',
      key: 'service',
    },
    {
      title: 'Ngày',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Giờ',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button type="primary" onClick={() => handleEdit(record)} style={{ marginRight: 8 }}>
            Sửa
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(record.id)}>
            Xóa
          </Button>
        </>
      ),
    },
  ];

  const handleEdit = (booking) => {
    setEditingBooking(booking);
    form.setFieldsValue({
      ...booking,
      date: moment(booking.date)
    });
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    setBookings(bookings.filter(booking => booking.id !== id));
    message.success('Đã xóa đặt lịch thành công');
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      const updatedBookings = bookings.map(booking => {
        if (booking.id === editingBooking.id) {
          return {
            ...booking,
            ...values,
            date: values.date.format('YYYY-MM-DD')
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
      
      <Table columns={columns} dataSource={bookings} />

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
            name="customerName"
            label="Tên khách hàng"
            rules={[{ required: true, message: 'Vui lòng nhập tên khách hàng!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="service"
            label="Dịch vụ"
            rules={[{ required: true, message: 'Vui lòng chọn dịch vụ!' }]}
          >
            <Select>
              <Select.Option value="Chụp ảnh cưới">Chụp ảnh cưới</Select.Option>
              <Select.Option value="Chụp ảnh kỷ yếu">Chụp ảnh kỷ yếu</Select.Option>
              <Select.Option value="Chụp ảnh gia đình">Chụp ảnh gia đình</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="date"
            label="Ngày"
            rules={[{ required: true, message: 'Vui lòng chọn ngày!' }]}
          >
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item
            name="time"
            label="Giờ"
            rules={[{ required: true, message: 'Vui lòng chọn giờ!' }]}
          >
            <Select>
              <Select.Option value="09:00">09:00</Select.Option>
              <Select.Option value="10:00">10:00</Select.Option>
              <Select.Option value="14:00">14:00</Select.Option>
              <Select.Option value="15:00">15:00</Select.Option>
            </Select>
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
