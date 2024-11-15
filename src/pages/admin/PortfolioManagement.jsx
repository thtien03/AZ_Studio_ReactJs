import React, { useState } from 'react';
import { Button, Table, Modal, Input, Form, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

// Cấu hình album
const AlbumManagement = () => {
  const [albums, setAlbums] = useState([
    { id: 1, name: "Album A", description: "Mô tả album A", image: "image1.jpg", detailsImage: ["details1.jpg", "details2.jpg"] },
    { id: 2, name: "Album B", description: "Mô tả album B", image: "image2.jpg", detailsImage: ["details3.jpg"] }
  ]);
  
  const [isModalVisible, setIsModalVisible] = useState(false); // Điều khiển Modal
  const [editingAlbum, setEditingAlbum] = useState(null); // Album đang chỉnh sửa
  const [form] = Form.useForm(); // Form cho Modal

  const handleAdd = () => {
    setEditingAlbum(null); // Reset để thêm album mới
    form.resetFields(); // Reset form
    setIsModalVisible(true); // Hiển thị modal để thêm album
  };

  const handleEdit = (album) => {
    setEditingAlbum(album); // Set album đang chỉnh sửa
    form.setFieldsValue(album); // Set dữ liệu vào form
    setIsModalVisible(true); // Hiển thị modal để sửa album
  };

  const handleDelete = (id) => {
    // Hiển thị Modal xác nhận khi xóa album
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa album này?',
      okText: 'Có',
      cancelText: 'Không',
      onOk: () => {
        // Tiến hành xóa album sau khi xác nhận
        setAlbums(albums.filter(album => album.id !== id));
        message.success('Album đã được xóa thành công');
      },
      onCancel: () => {
        message.info('Hủy xóa album');
      }
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false); // Đóng modal khi hủy
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      const newValues = { ...values };
      
      if (editingAlbum) {
        // Cập nhật album hiện tại
        setAlbums(albums.map(album => (album.id === editingAlbum.id ? { ...album, ...newValues } : album)));
      } else {
        // Thêm album mới
        const newAlbum = { ...newValues, id: albums.length + 1 };
        setAlbums([...albums, newAlbum]);
      }

      setIsModalVisible(false); // Đóng modal sau khi thêm/sửa
    });
  };

  const columns = [
    {
      title: 'ID Album',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên Album',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mô Tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Hình Ảnh Đại Diện',
      dataIndex: 'image',
      key: 'image',
      render: (text) => <img src={text} alt="avatar" width={50} />
    },
    {
      title: 'Hình Ảnh Chi Tiết',
      dataIndex: 'detailsImage',
      key: 'detailsImage',
      render: (text) => text.map((image, index) => <img key={index} src={image} alt={`details-${index}`} width={100} />)
    },
    {
      title: 'Thao Tác',
      key: 'actions',
      render: (text, record) => (
        <div>
          <Button type="secondary" onClick={() => handleEdit(record)}>Sửa</Button>
          <Button type="danger" onClick={() => handleDelete(record.id)}>Xóa</Button>
        </div>
      )
    }
  ];

  const uploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('Chỉ có thể tải lên hình ảnh!');
      }
      return isImage;
    }
  };

  return (
    <div>
      <h1>Quản lý Album</h1>
      <Button type="primary" onClick={handleAdd}>Thêm Album</Button>
      <Table
        columns={columns}
        dataSource={albums}
        rowKey="id"
        style={{ marginTop: '20px' }}
      />
      
      {/* Modal Thêm/Sửa Album */}
      <Modal
        title={editingAlbum ? "Sửa Album" : "Thêm Album"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={editingAlbum || {}}
        >
          <Form.Item
            label="Tên Album"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên album!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mô Tả"
            name="description"
            rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
          >
            <Input />
          </Form.Item>
          
          {/* Hình Ảnh Đại Diện */}
          <Form.Item
            label="Hình Ảnh Đại Diện"
            name="image"
            valuePropName="fileList"
            getValueFromEvent={(e) => e?.fileList}
            rules={[{ required: true, message: 'Vui lòng chọn hình đại diện!' }]}
          >
            <Upload
              {...uploadProps}
              listType="picture-card"
              accept="image/*"
              maxCount={1}
            >
              {editingAlbum?.image ? null : <div><UploadOutlined /> Chọn Hình</div>}
            </Upload>
          </Form.Item>

          {/* Hình Ảnh Chi Tiết */}
          <Form.Item
            label="Hình Ảnh Chi Tiết"
            name="detailsImage"
            valuePropName="fileList"
            getValueFromEvent={(e) => e?.fileList}
            rules={[{ required: true, message: 'Vui lòng chọn hình chi tiết!' }]}
          >
            <Upload
              {...uploadProps}
              listType="picture-card"
              accept="image/*"
              multiple
            >
              {editingAlbum?.detailsImage?.length ? null : <div><UploadOutlined /> Chọn Hình</div>}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AlbumManagement;
