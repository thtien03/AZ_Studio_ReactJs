import React from "react";
import { useLocation } from "react-router-dom";
import Masonry from "react-masonry-css";
import "./ImageDetail.css";

const ImageDetail = () => {
  const location = useLocation();
  const { photo } = location.state || {}; // Nhận dữ liệu từ `state`

  // Kiểm tra nếu không có dữ liệu
  if (!photo) {
    return <div className="error-container">Album not found!</div>;
  }

  const breakpointColumnsObj = {
    default: 3, // 3 cột mặc định
    1100: 2, // 2 cột khi màn hình <= 1100px
    700: 1, // 1 cột khi màn hình <= 700px
  };

  return (
    <div className="image-detail">
      {/* Header với background và tiêu đề */}
      <div
        className="image-detail-header"
        style={{
          backgroundImage: `url(${photo.banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="image-detail-title">{photo.title}</h1>
      </div>

      {/* Masonry Layout cho các hình ảnh nhỏ */}
      <div className="image-gallery">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="masonry-grid"
          columnClassName="masonry-grid_column"
        >
          {photo.listImage?.map((image, index) => (
            <div className="masonry-item" key={index}>
              <img src={image} alt={`Thumbnail ${index + 1}`} />
            </div>
          ))}
        </Masonry>
      </div>
    </div>
  );
};

export default ImageDetail;
