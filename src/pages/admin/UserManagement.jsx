import React, { useState } from 'react';
import { Table, Space, Button, Modal, Form, Input, Select, message } from 'antd';
import './UserManagement.css'; 


// Cấu hình vị trí cho thông báo
message.config({
  top: 20,               // Khoảng cách từ trên xuống
  duration: 2,           // Thời gian hiển thị thông báo (giây)
  maxCount: 3,           // Số lượng thông báo tối đa hiển thị cùng lúc
  placement: 'topRight', // Đặt vị trí ở góc phải trên
});

const UserManagement = () => {
  const [users, setUsers] = useState([
    {
      key: '1',
      username: 'user1',
      email: 'user1@example.com',
      role: 'Khách hàng', 
      status: 'Hoạt động'
    },
    {
      key: '2 ',
      username: 'user2',
      email: 'user2@example.com',
      role: 'Quản trị viên', 
      status: 'Hoạt động'
    },
    // Thêm dữ liệu mẫu khác
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingUser, setEditingUser] = useState(null);

  const columns = [
    {
      title: 'Tên đăng nhập',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email', 
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status', 
      key: 'status',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>Sửa</Button>
          <Button type="primary" danger onClick={() => handleDelete(record)}>Xóa</Button>
          <Button onClick={() => handleBlock(record)}>
            {record.status === 'Hoạt động' ? 'Khóa' : 'Mở khóa'}
          </Button>
        </Space>
      ),
    },
  ];

  const handleEdit = (user) => {
    setEditingUser(user);
    form.setFieldsValue(user);
    setIsModalVisible(true);
  };

  const handleDelete = (user) => {
    Modal.confirm({
      title: 'Xác nhận xóa người dùng',
      content: `Bạn có chắc chắn muốn xóa người dùng ${user.username}?`,
      onOk() {
        setUsers(users.filter(u => u.key !== user.key));
        message.success('Đã xóa người dùng thành công');
      },
    });
  };

  const handleBlock = (user) => {
    const newStatus = user.status === 'Hoạt động' ? 'Đã khóa' : 'Hoạt động';
    setUsers(users.map(u => 
      u.key === user.key ? {...u, status: newStatus} : u
    ));
    message.success(`Đã ${newStatus === 'Đã khóa' ? 'khóa' : 'mở khóa'} người dùng`);
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      if (editingUser) {
        setUsers(users.map(u =>
          u.key === editingUser.key ? {...u, ...values} : u
        ));
        message.success('Cập nhật thông tin thành công');
      }
      setIsModalVisible(false);
      form.resetFields();
      setEditingUser(null);
    });
  };

  return (
    <div className="user-management-container">
      <h2 className="user-management-title">Quản lý người dùng</h2>
      
      <Table columns={columns} dataSource={users} />

      <Modal
        title="Chỉnh sửa thông tin người dùng"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setEditingUser(null);
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="username"
            label="Tên đăng nhập"
            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="role" label="Vai trò">
            <Select>
              <Select.Option value="Khách hàng">Khách hàng</Select.Option>
              <Select.Option value="Quản trị viên">Quản trị viên</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;
