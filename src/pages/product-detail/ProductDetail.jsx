import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import './ProductDetail.css';
import { notification } from 'antd';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // Giả lập dữ liệu sản phẩm
  const product = {
    id,
    name: 'Dòng Váy A-line',
    description: 'Váy thiết kế hiện đại đẹp.',
    price: 500000,
    originalPrice: 700000,
    image: require('../../assets/images/A-line1.jpg'),
    colors: ['Black', 'Blue', 'Pink'],
    size: 'One Size',
  };

  const handleAddToCart = () => {
    try {
      // Lấy giỏ hàng hiện tại từ localStorage
      const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
      
      // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
      const existingProductIndex = currentCart.findIndex(item => item.id === product.id);
      
      if (existingProductIndex !== -1) {
        // Nếu sản phẩm đã tồn tại, tăng số lượng
        currentCart[existingProductIndex].quantity = (currentCart[existingProductIndex].quantity || 1) + 1;
      } else {
        // Nếu sản phẩm chưa tồn tại, thêm mới với số lượng là 1
        currentCart.push({
          ...product,
          quantity: 1
        });
      }
      
      // Lưu giỏ hàng mới vào localStorage
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

  return (
    <div className="product-detail-container">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
      </div>
      <div className="product-info">
        <h1 className="product-name">{product.name}</h1>
        <p className="product-description">{product.description}</p>
        <p className="product-price">
          {product.price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
        </p>
        <p className="product-original-price">
          {product.originalPrice?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
        </p>
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
        <Button type="primary" onClick={handleAddToCart}>Thêm vào giỏ hàng</Button>
      </div>
    </div>
  );
};

export default ProductDetail;
