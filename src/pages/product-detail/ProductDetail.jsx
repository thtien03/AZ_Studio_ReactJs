import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, notification } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import './ProductDetail.css';
import { getListProductsService, getProductService } from 'src/services/product.service';

// Danh sách sản phẩm giả lập (tương tự DressStyle)
// const dressStyles = [
//   { id: 1, imgSrc: require('../../assets/images/A-line1.jpg'), name: 'Áo dài Luxury', price: 1500000, description: 'Áo dài cao cấp với chất liệu thoáng mát.', category: 'aodai', colors: ['Red', 'Blue'], size: 'M', detailImages: [] },
//   { id: 2, imgSrc: require('../../assets/images/A-line2.jpg'), name: 'Váy cưới Đuôi Cá', price: 1800000, category: 'wedding-dress' },
// ];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Tìm sản phẩm theo ID từ danh sách giả lập
  // const product = dressStyles.find((item) => item.id === parseInt(id)) || {};

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [dataDetail, setDataDetail] = useState(null)

  const handleAddToCart = () => {
    try {
      const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingProductIndex = currentCart.findIndex((item) => item.id ===id);

      if (existingProductIndex !== -1) {
        currentCart[existingProductIndex].quantity = (currentCart[existingProductIndex].quantity || 1) + 1;
      } else {
        currentCart.push({ ...dataDetail, quantity: 1 });
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

  // Sử dụng nội dung mặc định nếu thuộc tính không tồn tại
  // const mainImage = product.detailImages?.[selectedIndex] || product.imgSrc || 'https://via.placeholder.com/300';
  // const productName = product.name || 'Sản phẩm không có tên';
  // const productDescription = product.description || 'Chưa có mô tả sản phẩm.';
  // const productPrice = product.price || 0;
  // const productColors = product.colors || ['Không có màu'];
  // const productSize = product.size || 'Free Size';

  const handleSlideClick = (index) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    const fetchDetailData = async () => {
      const res = await getProductService(id)
      console.log(res)
      if (res) {
        setDataDetail(res)
      }
    }
    fetchDetailData()
  }, [])

  return (
    <div className="content">
      <div className="product-detail-container">
        <div className="gallery-container">
          <div className="main-image-wrapper">
            <img src={dataDetail?.images[0]} alt="Main Product" className="main-image" style={{objectFit:"cover"}}/>
          </div>

          {dataDetail && (
            <Swiper
              modules={[Autoplay]}
              slidesPerView={3}
              spaceBetween={10}
              className="detail-swiper"
              autoplay={{
                delay: 1500,
                disableOnInteraction: false,
              }}
              loop={true}
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
            {/* <div className="product-colors">
              <label>Màu Sắc:</label>
              {productColors.map((color, index) => (
                <span key={index} className="color-option">{color}</span>
              ))}
            </div> */}
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

          <Button type="primary" onClick={handleAddToCart}>Thêm vào giỏ hàng</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
