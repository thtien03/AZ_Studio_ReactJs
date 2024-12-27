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
      // Lấy giỏ hàng hiện tại từ localStorage hoặc khởi tạo một mảng rỗng
      const currentCart = JSON.parse(localStorage.getItem('cart')) || [];

      // Đảm bảo rằng dataDetail đã được tải trước khi thực hiện
      if (!dataDetail) {
        notification.error({
          message: 'Lỗi',
          description: 'Thông tin sản phẩm chưa được tải. Vui lòng thử lại sau.',
        });
        return;
      }

      // Lấy id và type của sản phẩm hiện tại
      const productId = dataDetail._id || dataDetail.id; // Tùy thuộc vào cách bạn lưu trữ id
      const productType = dataDetail.type;

      // Kiểm tra xem sản phẩm với cùng id và type đã tồn tại trong giỏ hàng chưa
      const existingProductIndex = currentCart.findIndex(
        (item) => item._id === productId && item.type === productType
      );

      if (existingProductIndex !== -1) {
        // Nếu sản phẩm đã tồn tại, tăng số lượng
        currentCart[existingProductIndex].quantity += quantity;
      } else {
        // Nếu sản phẩm chưa tồn tại, thêm mới vào giỏ hàng
        currentCart.push({
          _id: productId,
          type: productType,
          name: dataDetail.name,
          description: dataDetail.description,
          images: dataDetail.images,
          categoryId: dataDetail.categoryId,
          price: dataDetail.price,
          size: dataDetail.size,
          detail: dataDetail.detail,
          quantity: quantity,
          // Bạn có thể thêm các trường khác nếu cần
        });
      }

      // Lưu lại giỏ hàng vào localStorage
      localStorage.setItem('cart', JSON.stringify(currentCart));

      // Hiển thị thông báo thành công
      notification.success({
        message: 'Thành công',
        description: 'Đã thêm sản phẩm vào giỏ hàng',
      });

      // Chuyển hướng đến trang giỏ hàng
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
      try {
        const res = await getProductService(id);
        console.log(res);
        if (res) {
          setDataDetail(res);
        } else {
          notification.error({
            message: 'Lỗi',
            description: 'Không tìm thấy thông tin sản phẩm',
          });
        }
      } catch (error) {
        console.error('Lỗi khi lấy thông tin sản phẩm:', error);
        notification.error({
          message: 'Lỗi',
          description: 'Không thể tải thông tin sản phẩm',
        });
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

          {/* Lựa chọn số lượng */}
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
