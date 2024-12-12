// src/pages/admin/AddProduct.jsx
import React, { useState } from 'react';
import { Modal, Upload, Input, Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './AddProduct.css';

const AddProduct = ({ visible, onClose, onAddProduct }) => {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [coverImage, setCoverImage] = useState([]);
  const [detailImages, setDetailImages] = useState([]);

  const handleCoverChange = ({ fileList }) => setCoverImage(fileList);
  const handleDetailChange = ({ fileList }) => setDetailImages(fileList);

  const handleSubmit = () => {
    if (!productName || !category || !quantity || coverImage.length === 0 || detailImages.length === 0) {
      message.error('Vui lòng điền đầy đủ thông tin và tải lên hình ảnh!');
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: productName,
      category,
      quantity: parseInt(quantity),
      image: coverImage[0]?.url || coverImage[0]?.thumbUrl,
      detailsImage: detailImages.map(file => file.url || file.thumbUrl),
    };

    onAddProduct(newProduct);
    message.success('Thêm sản phẩm thành công!');
    onClose();
    setProductName('');
    setCategory('');
    setQuantity('');
    setCoverImage([]);
    setDetailImages([]);
  };

  return (
    <Modal
      visible={visible}
      title="Thêm Sản Phẩm"
      onCancel={onClose}
      footer={null}
      centered
    >
      <div className="add-product-form">
        <Input
          placeholder="Tên Sản Phẩm"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="input-field"
        />
        <Input
          placeholder="Danh Mục"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input-field"
        />
        <Input
          placeholder="Số Lượng"
          value={quantity}
          type="number"
          onChange={(e) => setQuantity(e.target.value)}
          className="input-field"
        />

        <div className="upload-section">
          <p>Hình Ảnh Đại Diện:</p>
          <Upload
            listType="picture-card"
            fileList={coverImage}
            onChange={handleCoverChange}
            beforeUpload={() => false}
          >
            {coverImage.length >= 1 ? null : <div><PlusOutlined /> Tải lên</div>}
          </Upload>
        </div>

        <div className="upload-section">
          <p>Hình Ảnh Chi Tiết:</p>
          <Upload
            listType="picture-card"
            fileList={detailImages}
            onChange={handleDetailChange}
            multiple
            beforeUpload={() => false}
          >
            {detailImages.length >= 8 ? null : <div><PlusOutlined /> Tải lên</div>}
          </Upload>
        </div>

        <div className="button-group">
          <Button type="default" onClick={onClose} className="cancel-button">Hủy</Button>
          <Button type="primary" onClick={handleSubmit} className="submit-button">Lưu</Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddProduct;