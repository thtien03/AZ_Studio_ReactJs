import React from 'react';
import './Album.css';
import coverImage from '../../assets/images/DL-RungThong.jpg';
import image1 from '../../assets/images/DaNang.jpg';
import image2 from '../../assets/images/NCSG.jpg';
import image3 from '../../assets/images/PhuQuoc.png';
import image4 from '../../assets/images/SG-BaoTang.jpg';
import image5 from '../../assets/images/STUDIO.png';
import image6 from '../../assets/images/CanTho.jpg';
import image7 from '../../assets/images/DL-ThuyenHoa.png';
import image8 from '../../assets/images/Mau-az.jpg';
import image9 from '../../assets/images/Mau1.jpg';


const Album = () => {
  return (
    <div className="album-container">
      {/* Ảnh bìa */}
      <div className="cover-image-container">
        <img src={coverImage} alt="Cover" className="cover-image" />
      </div>

      <div className="album-content">
        <h2 className="album-title">PHOTO ALBUM</h2>
        <p className="album-description">
         A-Z Studio đề cao sự tự nhiên, màu sắc tươi tắn và lắng đọng trong từng bức ảnh. Không phải cặp đôi nào cũng có thể diễn tự nhiên trước ống kính, ekip A-Z chú trọng việc tạo bầu không khí thoải mái và vui vẻ để cho ra bộ ảnh Pre-wedding chân thật, mang đậm phong cách riêng của cô dâu – chú rể. Đặc biệt, chúng tôi có rất nhiều lựa chọn về địa điểm studio, phim trường và ngoại cảnh dành cho bạn.
        </p>
        <hr className="album-divider" />

        {/* Grid chứa các hình ảnh */}
        <div className="album-grid">
          <div className="album-item">
            <img src={image1} alt="Đà Lạt" className="album-image" />
            <div className="overlay">
              <span className="overlay-text">ĐÀ LẠT <br /> CÂY THÔNG CÔ ĐƠN</span>
            </div>
          </div>
          <div className="album-item">
            <img src={image2} alt="NCSG" className="album-image" />
            <div className="overlay">
              <span className="overlay-text">NCSG</span>
            </div>
          </div>
          <div className="album-item">
            <img src={image3} alt="Phú Quốc" className="album-image" />
            <div className="overlay">
              <span className="overlay-text">PHÚ QUỐC</span>
            </div>
          </div>
          <div className="album-item">
            <img src={image4} alt="Bảo Tàng Sài Gòn" className="album-image" />
            <div className="overlay">
              <span className="overlay-text">BẢO TÀNG SÀI GÒN</span>
            </div>
          </div>
          <div className="album-item">
            <img src={image5} alt="Studio" className="album-image" />
            <div className="overlay">
              <span className="overlay-text">STUDIO</span>
            </div>
          </div>
          <div className="album-item">
            <img src={image6} alt="Cần Thơ" className="album-image" />
            <div className="overlay">
              <span className="overlay-text">CẦN THƠ</span>
            </div>
          </div>
          <div className="album-item">
            <img src={image7} alt="Đà Lạt - Thuyền Hoa" className="album-image" />
            <div className="overlay">
              <span className="overlay-text">ĐÀ LẠT <br /> THUYỀN HOA</span>
            </div>
          </div>
          <div className="album-item">
            <img src={image8} alt="Studio - Mẫu AZ" className="album-image" />
            <div className="overlay">
              <span className="overlay-text">STUDIO</span>
            </div>
          </div>
          <div className="album-item">
            <img src={image9} alt="Studio - Mẫu Cưới AZ" className="album-image" />
            <div className="overlay">
              <span className="overlay-text">STUDIO</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Album;
