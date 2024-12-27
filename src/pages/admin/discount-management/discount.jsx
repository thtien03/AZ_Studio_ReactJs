import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, notification, Space, DatePicker } from 'antd';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import './discount.css';

const API_BASE_URL = 'http://localhost:8080/api/v1/discounts';

const AdminDiscount = () => {
  const [discounts, setDiscounts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState(null);

  // Fetch danh sách mã giảm giá từ API
  const fetchDiscounts = async () => {
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) throw new Error('Failed to fetch discounts');
      const data = await response.json();
      setDiscounts(data); // Cập nhật danh sách mã giảm giá
    } catch (error) {
      console.error('Error fetching discounts:', error);
      notification.error({ message: 'Lỗi lấy danh sách mã giảm giá' });
    }
  };

  // Gọi API lấy danh sách khi component được mount
  useEffect(() => {
    fetchDiscounts();
  }, []);

  // Thêm hoặc cập nhật mã giảm giá
  const handleAddEditDiscount = async (values) => {
    try {
      const payload = {
        ...values,
        startDate: values.startDate.format('YYYY-MM-DD HH:mm:ss'),
        endDate: values.endDate.format('YYYY-MM-DD HH:mm:ss'),
      };

      if (editingDiscount) {
        // Cập nhật mã giảm giá
        const response = await fetch(`${API_BASE_URL}/${editingDiscount._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error('Failed to update discount');
        notification.success({ message: 'Cập nhật mã giảm giá thành công' });
      } else {
        // Thêm mới mã giảm giá
        const response = await fetch(API_BASE_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error('Failed to create discount');
        notification.success({ message: 'Thêm mã giảm giá thành công' });
      }
      setIsModalVisible(false);
      fetchDiscounts(); // Cập nhật lại danh sách
    } catch (error) {
      console.error('Error saving discount:', error);
      notification.error({ message: 'Lỗi khi lưu mã giảm giá' });
    }
  };

  // Xóa mã giảm giá
  const handleDelete = async (_id) => {
    Modal.confirm({
      title: 'Bạn có chắc chắn muốn xóa mã giảm giá này?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/${_id}`, { method: 'DELETE' });
          if (!response.ok) throw new Error('Failed to delete discount');
          notification.success({ message: 'Xóa mã giảm giá thành công' });
          fetchDiscounts(); // Cập nhật lại danh sách
        } catch (error) {
          console.error('Error deleting discount:', error);
          notification.error({ message: 'Lỗi khi xóa mã giảm giá' });
        }
      },
    });
  };

  // Xử lý lỗi nhập ngày không hợp lệ
  const disabledDate = (current) => current && current < moment().startOf('day');

  const columns = [
    { title: 'Mã giảm giá', dataIndex: 'code', key: 'code' },
    { title: 'Giá trị giảm (%)', dataIndex: 'value', key: 'value' },
    { title: 'Số tiền giảm tối đa (VND)', dataIndex: 'maxDiscount', key: 'maxDiscount' },
    { title: 'Còn lại', dataIndex: 'maxUses', key: 'maxUses' },
    { title: 'Đã sử dụng', dataIndex: 'usedCount', key: 'usedCount' },
    {
      title: 'Thời gian bắt đầu',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (text) => moment(text).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: 'Thời gian kết thúc',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (text) => moment(text).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (text, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setEditingDiscount(record);
              setIsModalVisible(true);
            }}
          >
            Sửa
          </Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record._id)} // Sử dụng _id thay cho id
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="admin-discount-container">
      <h1>Quản lý mã giảm giá</h1>
      <Button
        type="primary"
        onClick={() => {
          setEditingDiscount(null);
          setIsModalVisible(true);
        }}
        style={{ marginBottom: '16px' }}
      >
        Thêm mã giảm giá
      </Button>
      <Table dataSource={discounts} columns={columns} rowKey="_id" /> {/* Sử dụng _id cho rowKey */}

      <Modal
        title={editingDiscount ? 'Sửa mã giảm giá' : 'Thêm mã giảm giá'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        bodyStyle={{ padding: '20px' }}
        centered
        width={600}
      >
        <Form
          initialValues={
            editingDiscount
              ? {
                  ...editingDiscount,
                  startDate: moment(editingDiscount.startDate),
                  endDate: moment(editingDiscount.endDate),
                }
              : { code: '', value: 0, maxDiscount: 0, maxUses: 0 }
          }
          onFinish={handleAddEditDiscount}
        >
          <Form.Item
            label="Mã giảm giá"
            name="code"
            rules={[{ required: true, message: 'Vui lòng nhập mã giảm giá' }]}
          >
            <Input placeholder="Nhập mã giảm giá" />
          </Form.Item>
          <Form.Item
            label="Giá trị giảm (%)"
            name="value"
            rules={[
              { required: true, message: 'Vui lòng nhập giá trị giảm' },
              { type: 'number', min: 0, max: 100, message: 'Nhập giá trị từ 0-100' },
            ]}
          >
            <InputNumber min={0} max={100} placeholder="Nhập giá trị giảm" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label="Số tiền giảm tối đa (VND)"
            name="maxDiscount"
            rules={[{ required: true, message: 'Vui lòng nhập số tiền giảm tối đa' }]}
          >
            <InputNumber min={0} placeholder="Nhập số tiền giảm tối đa" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label="Số lần được sử dụng"
            name="maxUses"
            rules={[{ required: true, message: 'Vui lòng nhập số lần được sử dụng' }]}
          >
            <InputNumber min={0} placeholder="Nhập số lần được sử dụng" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label="Thời gian bắt đầu"
            name="startDate"
            rules={[{ required: true, message: 'Vui lòng chọn thời gian bắt đầu' }]}
          >
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm"
              style={{ width: '100%' }}
              disabledDate={disabledDate}
            />
          </Form.Item>
          <Form.Item
            label="Thời gian kết thúc"
            name="endDate"
            rules={[{ required: true, message: 'Vui lòng chọn thời gian kết thúc' }]}
          >
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm"
              style={{ width: '100%' }}
              disabledDate={disabledDate}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminDiscount;
