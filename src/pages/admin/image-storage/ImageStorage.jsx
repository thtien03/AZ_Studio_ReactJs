// src/pages/admin/ImageStorage.jsx
import React, { useState } from 'react';
import { Upload, Modal,message, Card, Row, Col } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import './ImageStorage.css';

const ImageStorage = () => {
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    setPreviewImage(file.url || file.thumbUrl);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const handleDelete = (file) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa hình ảnh này?',
      okText: 'Xóa',
      cancelText: 'Hủy',
      onOk: () => {
        const newFileList = fileList.filter(item => item.uid !== file.uid);
        setFileList(newFileList);
        message.success('Đã xóa hình ảnh thành công');
      }
    });
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Tải lên</div>
    </div>
  );

  return (
    <div className="image-storage-container">
      <h2 className="image-storage-title">Quản lý kho ảnh</h2>
      
      <div className="upload-section">
        <Upload
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          beforeUpload={(file) => {
            const isImage = file.type.startsWith('image/');
            if (!isImage) {
              message.error('Chỉ có thể tải lên file hình ảnh!');
            }
            return isImage;
          }}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
      </div>

      <div className="image-grid">
        <Row gutter={[16, 16]}>
          {fileList.map(file => (
            <Col xs={24} sm={12} md={8} lg={6} key={file.uid}>
              <Card
                hoverable
                cover={<img alt={file.name} src={file.url || file.thumbUrl} />}
                actions={[
                  <DeleteOutlined key="delete" onClick={() => handleDelete(file)} />
                ]}
              >
                <Card.Meta title={file.name} />
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="preview" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  );
};

export default ImageStorage;
