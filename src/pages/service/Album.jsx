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

const images = [
  { id: 1, src: image1, alt: 'Đà Nẵng', title: 'ĐÀ NẴNG', detail: 'Mô tả về Đà Nẵng' },
  { id: 2, src: image2, alt: 'NCSG', title: 'NCSG', detail: 'Mô tả về NCSG' },
  { id: 3, src: image3, alt: 'Phú Quốc', title: 'PHÚ QUỐC', detail: 'Mô tả về Phú Quốc' },
  { id: 4, src: image4, alt: 'Bảo Tàng Sài Gòn', title: 'BẢO TÀNG SÀI GÒN', detail: 'Mô tả về Bảo Tàng Sài Gòn' },
  { id: 5, src: image5, alt: 'Studio', title: 'STUDIO', detail: 'Mô tả về Studio' },
  { id: 6, src: image6, alt: 'Cần Thơ', title: 'CẦN THƠ', detail: 'Mô tả về Cần Thơ' },
  { id: 7, src: image7, alt: 'Đà Lạt - Thuyền Hoa', title: 'ĐÀ LẠT - THUYỀN HOA', detail: 'Mô tả về Đà Lạt - Thuyền Hoa' },
  { id: 8, src: image8, alt: 'Studio - Mẫu AZ', title: 'STUDIO - MẪU AZ', detail: 'Mô tả về Mẫu AZ' },
  { id: 9, src: image9, alt: 'Studio - Mẫu Cưới AZ', title: 'STUDIO - MẪU CƯỚI AZ', detail: 'Mô tả về Mẫu Cưới AZ' },
];

const Album = () => {
  return (
    <div className="album-container">
      <div className="cover-image-container">
        <h1 className="album-title">ALBUM A-Z</h1>
        <img src={coverImage} alt="Cover" className="cover-image" />
      </div>

      <div className="album-content">
        <hr className="album-divider" />

        <div className="album-grid">
          {images.map(image => (
            <div key={image.id} className="album-item">
              <img src={image.src} alt={image.alt} className="album-image" />
              <div className="overlay">
                <h2 className="overlay-title">{image.title}</h2>
                <p className="overlay-detail">{image.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Album;
