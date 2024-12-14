import React from "react";
import Masonry from "react-masonry-css";
import "./ImageDetail.css";

// Đường dẫn đến các hình ảnh
import image1 from "../../assets/images/image1.jpg";
import image2 from "../../assets/images/image2.png";
import image3 from "../../assets/images/image3.jpg";
import image4 from "../../assets/images/image4.jpg";
import image5 from "../../assets/images/image5.jpg";

const ImageDetail = () => {
  const thumbnails = [image2, image3, image4, image5]; // Các hình ảnh nhỏ

  const breakpointColumnsObj = {
    default: 3, // 3 cột mặc định
    1100: 2, // 2 cột khi màn hình <= 1100px
    700: 1, // 1 cột khi màn hình <= 700px
  };

  return (
    <div className="image-gallery">
      {/* Hình ảnh lớn với tiêu đề */}
      <div className="main-image">
        <img src={image1} alt="Main" />
        <div className="overlay">
          <h1>WEDDING CEREMONY</h1>
          <p>Loc Nguyen - Nkung Ngo</p>
        </div>
      </div>

      {/* Masonry Layout cho các hình ảnh nhỏ */}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-grid"
        columnClassName="masonry-grid_column"
      >
        {thumbnails.map((image, index) => (
          <div className="masonry-item" key={index}>
            <img src={image} alt={`Thumbnail ${index + 1}`} />
          </div>
        ))}
      </Masonry>
    </div>
  );
};

export default ImageDetail;
