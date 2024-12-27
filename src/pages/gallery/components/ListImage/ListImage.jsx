import {
  ArrowLeftOutlined,
  MoreOutlined,
  StarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Dropdown,
  Form,
  Input,
  List,
  Modal,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addCommentToImage,
  getImagesById,
  toggleImageStatus,
} from "src/services/library.service";
import "../../Gallery.css";

const { TextArea } = Input;

const MyComment = ({ author, content, datetime }) => (
  <div style={{ display: "flex", marginBottom: "16px" }}>
    <Avatar icon={<UserOutlined />} style={{ marginRight: "16px" }} />
    <div>
      <strong>{author}</strong>
      <div>{content}</div>
      <div style={{ fontSize: "12px", color: "#999" }}>{datetime}</div>
    </div>
  </div>
);

const ListImage = () => {
  const { id } = useParams();
  const { username } = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [commentValue, setCommentValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const res = await getImagesById(id);
      if (res) {
        setImages(res?.data);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const selectedImage =
    selectedImageIndex !== null ? images[selectedImageIndex] : null;

  const handleRateChange = async (img) => {
    try {
      const res = await toggleImageStatus(id, img._id);
      if (res) {
        fetchData();
      }
    } catch (error) {
      console.error("Error rate image:", error);
    }
  };
  const handleCommentSubmit = async () => {
    if (!commentValue.trim() || selectedImageIndex === null) return;
    try {
      console.log(commentValue);
      const selectedImage = images[selectedImageIndex];
      if (!selectedImage) return;
      const res = await addCommentToImage(id, selectedImage._id, commentValue);
      if (res) {
        fetchData();
        setCommentValue("");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const downloadImage = (src) => {
    const link = document.createElement("a");
    link.href = src;
    link.setAttribute("download", "image.jpg");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyLink = (src) => {
    navigator.clipboard.writeText(src).then(
      () => {
        message.success("Liên kết đã được sao chép!");
      },
      (err) => {
        message.error("Không thể sao chép liên kết.");
        console.error("Could not copy text: ", err);
      }
    );
  };

  const menuItems = (img) => [
    {
      key: "1",
      label: <span onClick={() => downloadImage(img?.url)}>Tải xuống</span>,
    },
    {
      key: "2",
      label: <span onClick={() => copyLink(img?.url)}>Sao chép liên kết</span>,
    },
    // {
    //   key: "3",
    //   label: <span onClick={() => setInfoDrawerOpen(true)}>Xem thông tin</span>,
    // },
  ];

  const openImageModal = (index) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const closeImageModal = () => {
    setIsModalOpen(false);
    setSelectedImageIndex(null);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="gallery-container">
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "start" }}>
          <Button
            type="primary"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(`/gallery/${username}`)}
            style={{ marginBottom: "16px" }}
          >
            Trở về
          </Button>
        </div>
        <div className="gallery-image-list">
          {images?.map((img, index) => {
            return (
              <div className="gallery-card" key={img?._id}>
                <div className="gallery-image-container">
                  <img
                    alt={img?.nameImage}
                    src={img?.url}
                    onClick={() => openImageModal(index)}
                    className="gallery-image"
                  />
                  <div className="gallery-hover-info">
                    <div className="gallery-hover-menu">
                      <Dropdown
                        menu={{ items: menuItems(img) }}
                        trigger={["click"]}
                      >
                        <Button shape="circle" icon={<MoreOutlined />} />
                      </Dropdown>
                    </div>
                    <div className="gallery-card-info">
                      <h3 style={{ margin: 0, fontSize: "14px" }}>
                        {img.title}
                      </h3>
                      <div className="gallery-card-footer">
                        <StarOutlined
                          style={{
                            color: img.isStar ? "gold" : "gray",
                            cursor: "pointer",
                            fontSize: "16px",
                          }}
                          onClick={() => handleRateChange(img)}
                        />

                        <div
                          className="gallery-comment-count"
                          style={{ fontSize: "12px" }}
                        >
                          <strong>{img.comments.length}</strong> bình luận
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Modal
        open={isModalOpen}
        footer={null}
        onCancel={closeImageModal}
        width={800}
        bodyStyle={{ textAlign: "center" }}
      >
        {selectedImage && (
          <>
            <h2>{selectedImage.title}</h2>
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              style={{
                maxWidth: "100%",
                maxHeight: "80vh",
                marginBottom: "20px",
              }}
            />
            <div className="gallery-comments-section">
              <h3>Bình luận</h3>
              <List
                className="comment-list"
                header={`${selectedImage?.comments.length} bình luận`}
                itemLayout="horizontal"
                // dataSource={selectedImage.comments}
                renderItem={(item) => (
                  <li>
                    <MyComment
                      author={username}
                      content={item?.content}
                      datetime={item?.datetime}
                    />
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
                <Button
                  htmlType="submit"
                  type="primary"
                  onClick={handleCommentSubmit}
                >
                  Gửi
                </Button>
              </Form.Item>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default ListImage;
