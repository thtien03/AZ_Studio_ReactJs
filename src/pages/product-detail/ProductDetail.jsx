import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, notification } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Giả lập dữ liệu sản phẩm
  const product = {
    id,
    name: 'Dòng Váy A-line',
    description: 'Váy thiết kế hiện đại đẹp, phù hợp cho nhiều dịp khác nhau.',
    detailDescription: `Chiếc váy A-line này được may từ chất liệu vải cao cấp, 
thoáng mát và co giãn nhẹ, giúp bạn cảm thấy thoải mái cả ngày. Thiết kế cổ điển 
với đường may tinh tế, tạo form dáng thanh lịch, tôn lên vẻ đẹp nữ tính. 
Váy dễ phối với nhiều loại phụ kiện khác nhau, từ giày cao gót đến giày sneakers, 
phù hợp để đi làm, dự tiệc, hoặc đi dạo phố. Hãy lựa chọn màu sắc yêu thích 
để tạo nên phong cách riêng cho bạn!`,
    price: 500000,
    originalPrice: 700000,
    image: require('../../assets/images/A-line1.jpg'),
    colors: ['Black', 'Blue', 'Pink'],
    size: 'One Size',
    detailImages: [
      require('../../assets/images/ballgown1.jpg'),
      require('../../assets/images/ballgown2.jpg'),
      require('../../assets/images/ballgown3.jpg'),
      require('../../assets/images/ballgown1.jpg'),
    ],
  };

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleAddToCart = () => {
    try {
      const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingProductIndex = currentCart.findIndex(item => item.id === product.id);

      if (existingProductIndex !== -1) {
        currentCart[existingProductIndex].quantity += 1;
      } else {
        currentCart.push({ ...product, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(currentCart));

      notification.success({
        message: 'Thành công',
        description: 'Đã thêm sản phẩm vào giỏ hàng',
      });

      navigate('/shopping-cart/shoppingcart');
    } catch (error) {
      console.error('Lỗi khi thêm vào giỏ hàng:', error);
      notification.error({
        message: 'Lỗi',
        description: 'Không thể thêm sản phẩm vào giỏ hàng',
      });
    }
  };

  const mainImage = product.detailImages[selectedIndex] || product.image;

  const handleSlideChange = (swiper) => {
    setSelectedIndex(swiper.activeIndex);
  };

  const handleSlideClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <div className="content">
      <div className="product-detail-container">
        <div className="gallery-container">
          <div className="main-image-wrapper">
            <img src={mainImage} alt="Main Product" className="main-image" />
          </div>
          <Swiper
            modules={[Autoplay]}
            slidesPerView={3}
            spaceBetween={10}
            onSlideChange={handleSlideChange}
            className="detail-swiper"
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
            }}
            loop={true}
          >
            {product.detailImages.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  alt={`Thumb-${index}`}
                  className={`thumb ${index === selectedIndex ? 'active' : ''}`}
                  onClick={() => handleSlideClick(index)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="product-info">
          <h1 className="product-name">{product.name}</h1>
          <p className="product-description">{product.description}</p>
          <div className="product-options">
            <div className="product-colors">
              <label>Màu Sắc:</label>
              {product.colors.map(color => (
                <span key={color} className="color-option">{color}</span>
              ))}
            </div>
            <div className="product-size">
              <label>Kích Thước:</label>
              <span>{product.size}</span>
            </div>
          </div>
          <div className="product-pricing">
            <p className="product-price">
              {product.price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
            </p>
            <p className="product-original-price">
              {product.originalPrice?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
            </p>
          </div>
          <Button type="primary" onClick={handleAddToCart}>Thêm vào giỏ hàng</Button>
          <div className="product-detail-description">
            <h2>Chi Tiết Sản Phẩm</h2>
            <p>{product.detailDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
