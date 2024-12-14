import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Popconfirm } from 'antd';
import './category-management.css'; // Import file CSS

const CategoryManagement = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Danh mục 1' },
    { id: 2, name: 'Danh mục 2' },
    { id: 3, name: 'Danh mục 3' },
  ]);
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  // Cấu hình các cột trong Table
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 120, // Kích thước vừa phải cho cột ID
    },
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      width: 300, // Kích thước lớn nhất cho cột Tên danh mục
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <span>
          <Button className="action-button" onClick={() => showModal(record)}>Sửa</Button>
          <Popconfirm title="Bạn có chắc muốn xóa?" onConfirm={() => handleDelete(record.id)}>
            <Button className="action-button" danger>Xóa</Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  const showModal = (category = null) => {
    setEditingCategory(category);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingCategory(null);
  };

  const handleSave = (values) => {
    if (editingCategory) {
      // Cập nhật danh mục
      setCategories(categories.map(cat => cat.id === editingCategory.id ? { ...cat, ...values } : cat));
    } else {
      // Thêm mới danh mục
      setCategories([...categories, { ...values, id: categories.length + 1 }]);
    }
    setIsModalVisible(false);
  };

  const handleDelete = (id) => {
    setCategories(categories.filter(category => category.id !== id));
  };

  return (
    <div>
      <Button type="primary" onClick={() => showModal()}>Thêm danh mục</Button>
      <Table
        className="category-table"
        columns={columns}
        dataSource={categories}
        rowKey="id"
      />

      <Modal
        title={editingCategory ? 'Chỉnh sửa danh mục' : 'Thêm danh mục'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          initialValues={editingCategory}
          onFinish={handleSave}
        >
          <Form.Item
            name="name"
            label="Tên danh mục"
            rules={[{ required: true, message: 'Vui lòng nhập tên danh mục!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingCategory ? 'Cập nhật' : 'Thêm'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoryManagement;
