import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, notification, InputNumber } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import './ProductDetail.css';
import { getProductService } from 'src/services/product.service';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [dataDetail, setDataDetail] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const swiperRef = useRef(null);

  const handleAddToCart = () => {
    try {
      const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingProductIndex = currentCart.findIndex((item) => item.id === id);

      if (existingProductIndex !== -1) {
        currentCart[existingProductIndex].quantity += quantity;
      } else {
        currentCart.push({ ...dataDetail, quantity });
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

  const handleSlideClick = (index) => {
    setSelectedIndex(index);
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideToLoop(index); // Sử dụng slideToLoop để hoạt động với loop
    }
  };

  useEffect(() => {
    const fetchDetailData = async () => {
      const res = await getProductService(id);
      console.log(res);
      if (res) {
        setDataDetail(res);
      }
    };
    fetchDetailData();
  }, [id]);

  return (
    <div className="content">
      <div className="product-detail-container">
        <div className="gallery-container">
          <div className="main-image-wrapper">
            <img
              src={dataDetail?.images[selectedIndex]}
              alt="Main Product"
              className="main-image"
            />
          </div>

          {dataDetail && (
            <Swiper
              modules={[Autoplay]}
              slidesPerView={3}
              spaceBetween={10}
              className="detail-swiper"
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              loop={true}
              onSlideChange={(swiper) => setSelectedIndex(swiper.realIndex)}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
            >
              {dataDetail?.images?.map((image, index) => (
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
          )}
        </div>

        <div className="product-info">
          <h1 className="product-name">{dataDetail?.name}</h1>
          <p className="product-description">{dataDetail?.description}</p>

          <div className="product-options">
            {/* Nếu bạn muốn giữ lại các tùy chọn khác như màu sắc */}
            <div className="product-size">
              <label>Kích Thước:</label>
              <span>{dataDetail?.size || ""}</span>
            </div>
          </div>

          <div className="product-pricing">
            <p className="product-price">
              {dataDetail?.price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
            </p>
          </div>
          {/* Thêm lựa chọn số lượng */}
          <div className="soluong" style={{ marginTop: '16px' }}>
              <label>Số lượng:</label>
              <InputNumber
                min={1}
                max={100}
                value={quantity}
                onChange={(value) => setQuantity(value)}
                style={{ marginLeft: '8px' }}
              />
            </div>

          <Button className='btnadd' type="primary" onClick={handleAddToCart}>
            Thêm vào giỏ hàng
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
