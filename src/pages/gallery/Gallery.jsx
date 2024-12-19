import React, { useState } from 'react';
import { Rate, List, Avatar, Input, Button, Dropdown, Modal, message, Drawer } from 'antd';
import { MoreOutlined, UserOutlined } from '@ant-design/icons';
import { Form } from 'antd';
import "./Gallery.css";

const { TextArea } = Input;

const initialImages = [
  {
    id: 1,
    title: "In the Snow",
    src: "src/assets/imagesTHT_6762.jpg",
    averageRating: 0, // Mặc định 1 sao
    description: "Khung cảnh mùa đông tĩnh lặng, tuyết phủ trắng xóa.",
    uploadedAt: "2023-12-18", // Thời gian tải lên
    size: "3.2MB", // Dung lượng
    comments: [
      { author: "User1", content: "Hình rất đẹp!", datetime: "Hôm qua" },
      { author: "User2", content: "Mình thích cảnh mùa đông", datetime: "2 ngày trước" },
    ],
  },
  {
    id: 2,
    title: "Industrial Scene",
    src: "https://via.placeholder.com/700x1000?text=Industrial+Scene",
    averageRating: 0,
    description: "Cảnh quan công nghiệp với khói và sắt thép.",
    comments: []
  },
  {
    id: 3,
    title: "Mountain View",
    src: "https://via.placeholder.com/600x900?text=Mountain+View",
    averageRating: 0,
    description: "Dãy núi hùng vĩ với cây cối và bầu trời trong xanh.",
    comments: []
  },
  {
    id: 4,
    title: "Beach Sunset",
    src: "https://via.placeholder.com/600x400?text=Beach+Sunset",
    averageRating: 0,
    description: "Hoàng hôn trên bãi biển đầy thơ mộng.",
    comments: []
  },
  {
    id: 5,
    title: "City Night",
    src: "https://via.placeholder.com/400x600?text=City+Night",
    averageRating: 0,
    description: "Đêm thành phố lung linh ánh đèn.",
    comments: []
  },
  {
    id: 6,
    title: "Autumn Forest",
    src: "https://via.placeholder.com/700x700?text=Autumn+Forest",
    averageRating: 0,
    description: "Rừng mùa thu lá vàng rực rỡ.",
    comments: []
  },
  {
    id: 7,
    title: "Desert Dunes",
    src: "https://via.placeholder.com/500x800?text=Desert+Dunes",
    averageRating: 0,
    description: "Những đồi cát trập trùng trong sa mạc.",
    comments: []
  },
  {
    id: 8,
    title: "River Flow",
    src: "https://via.placeholder.com/500x500?text=River+Flow",
    averageRating: 0,
    description: "Dòng sông êm đềm chảy qua cánh rừng.",
    comments:
     []
  },
  // Các hình ảnh khác...
];

const MyComment = ({ author, content, datetime }) => (
  <div style={{ display: 'flex', marginBottom: '16px' }}>
    <Avatar icon={<UserOutlined />} style={{ marginRight: '16px' }} />
    <div>
      <strong>{author}</strong>
      <div>{content}</div>
      <div style={{ fontSize: '12px', color: '#999' }}>{datetime}</div>
    </div>
  </div>
);

const Gallery = () => {
  const [images, setImages] = useState(initialImages);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [commentValue, setCommentValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [infoDrawerOpen, setInfoDrawerOpen] = useState(false);
  const [infoImageIndex, setInfoImageIndex] = useState(null);

  const selectedImage = selectedImageIndex !== null ? images[selectedImageIndex] : null;

  const handleRateChange = (id, value) => {
    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, averageRating: value } : img))
    );
  };  

  const handleCommentSubmit = () => {
    if (!commentValue.trim() || selectedImageIndex === null) return;
    const newImages = images.map((img, idx) =>
      idx === selectedImageIndex
        ? {
            ...img,
            comments: [...img.comments, { author: "Guest", content: commentValue, datetime: "Vừa xong" }],
          }
        : img
    );
    setImages(newImages);
    setCommentValue('');
  };

  const downloadImage = (src) => {
    const link = document.createElement('a');
    link.href = src;
    link.download = 'image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyLink = (src) => {
    navigator.clipboard.writeText(src).then(() => {
      message.success('Đã sao chép liên kết hình ảnh!');
    });
  };

  const menuItems = (img) => [
    { key: '1', label: <span onClick={() => downloadImage(img.src)}>Tải xuống</span> },
    { key: '2', label: <span onClick={() => copyLink(img.src)}>Sao chép liên kết</span> },
    { key: '3', label: <span onClick={() => setInfoDrawerOpen(true)}>Xem thông tin</span> },
  ];

  const openImageModal = (index) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const closeImageModal = () => {
    setIsModalOpen(false);
    setSelectedImageIndex(null);
  };

  return (
    <div className="gallery-container">
      <div className="gallery-image-list">
        {images.map((img, index) => (
          <div className="gallery-card" key={img.id}>
            <div className="gallery-image-container">
              <img
                alt={img.title}
                src={img.src}
                onClick={() => openImageModal(index)}
                className="gallery-image"
              />
              <div className="gallery-hover-info">
                <div className="gallery-hover-menu">
                  <Dropdown menu={{ items: menuItems(img) }} trigger={['click']}>
                    <Button shape="circle" icon={<MoreOutlined />} />
                  </Dropdown>
                </div>
                <div className="gallery-card-info">
                  <h3 style={{ margin: 0, fontSize: '14px' }}>{img.title}</h3>
                  <div className="gallery-card-footer">
                  <Rate
                    value={img.averageRating} // Gắn đúng giá trị trạng thái
                    onChange={(value) => handleRateChange(img.id, value)} // Cập nhật trạng thái khi tick
                    count={1} // Chỉ hiển thị 1 sao
                    allowClear // Cho phép xóa tick về 0 sao
                    style={{
                      fontSize: '16px',
                    }}
                  />


                    <div className="gallery-comment-count" style={{ fontSize: '12px' }}>
                      <strong>{img.comments.length}</strong> bình luận
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={isModalOpen}
        footer={null}
        onCancel={closeImageModal}
        width={800}
        bodyStyle={{ textAlign: 'center' }}
      >
        {selectedImage && (
          <>
            <h2>{selectedImage.title}</h2>
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              style={{ maxWidth: '100%', maxHeight: '80vh', marginBottom: '20px' }}
            />
            <div className="gallery-comments-section">
              <h3>Bình luận</h3>
              <List
                className="comment-list"
                header={`${selectedImage.comments.length} bình luận`}
                itemLayout="horizontal"
                dataSource={selectedImage.comments}
                renderItem={(item) => (
                  <li>
                    <MyComment author={item.author} content={item.content} datetime={item.datetime} />
                  </li>
                )}
              />
              <Form.Item className="comment-form-item">
                <TextArea
                  rows={4}
                  value={commentValue}
                  onChange={(e) => setCommentValue(e.target.value)}
                  placeholder="Thêm bình luận..."
                />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" type="primary" onClick={handleCommentSubmit}>
                  Gửi
                </Button>
              </Form.Item>
            </div>
          </>
        )}
      </Modal>

      <Drawer
        title="Thông tin hình ảnh"
        placement="right"
        width={400}
        onClose={() => setInfoDrawerOpen(false)}
        open={infoDrawerOpen}
      >
        {selectedImage && (
          <div>
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              style={{ width: '100%', marginBottom: '20px' }}
            />
            <h3>{selectedImage.title}</h3>
            <p>{selectedImage.description}</p>
            <p><strong>Thời gian tải lên:</strong> {selectedImage.uploadedAt}</p>
            <p><strong>Dung lượng:</strong> {selectedImage.size}</p>
            <p><strong>Số bình luận:</strong> {selectedImage.comments.length}</p>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default Gallery;
