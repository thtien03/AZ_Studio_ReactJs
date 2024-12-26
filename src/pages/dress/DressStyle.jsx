import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination, Tabs, Slider } from 'antd';
import 'antd/dist/reset.css';
import './DressStyle.css';
import { getListProductsService } from 'src/services/product.service'; // Import service để gọi API

const MIN_PRICE = 1000000; // 1,000,000 VNĐ
const MAX_PRICE = 100000000; // 100,000,000 VNĐ

const DressStyle = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([MIN_PRICE, MAX_PRICE]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all'); // Lọc theo danh mục

  const itemsPerPage = 9;

  // Fetch sản phẩm từ API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getListProductsService();
        setProducts(response.data|| []); // Lưu danh sách sản phẩm
      } catch (error) {
        console.error('Lỗi khi lấy danh sách sản phẩm:', error);
      }
    };
    fetchProducts();
  }, [currentPage]);

  const handleDressClick = (product) => {
    navigate(`/product-detail/${product._id}`);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset về trang đầu tiên khi tìm kiếm
  };

  const handleTabChange = (key) => {
    setSelectedCategory(key);
    setCurrentPage(1);
  };

  const filteredProducts = products?.filter((product) => 
      selectedCategory === 'all' || product.categoryId?.name === selectedCategory
    )
    .filter((product) =>
      product.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product) => {
      const price = product.price || 0;
      return price >= priceRange[0] && price <= priceRange[1];
    });

  return (
    <div>
      <Tabs
        defaultActiveKey="all"
        onChange={handleTabChange}
        style={{ marginBottom: '20px', padding: '0 20px' }}
        items={[
          { key: 'all', label: 'Tất cả' },
          { key: 'wedding-dress', label: 'Váy cưới' },
          { key: 'aodai', label: 'Áo dài cưới' },
          { key: 'vest', label: 'Vest' },
        ]}
      />

      <div className="dress-style-container">
        <div className="filter-section">
          <h1>Tìm kiếm</h1>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <h2>Bộ Lọc</h2>
          <div className="filter-option">
            <label>Giá Tiền:</label>
            <Slider
              range
              min={MIN_PRICE}
              max={MAX_PRICE}
              value={priceRange}
              onChange={setPriceRange}
              step={100000}
              tooltip={{ formatter: (value) => `${value.toLocaleString()} VNĐ` }}
            />
            <div className="price-range-label">
              <span>{priceRange[0].toLocaleString()} VNĐ</span> - <span>{priceRange[1].toLocaleString()} VNĐ</span>
            </div>
          </div>
        </div>

        <div className="right-section">
          <div className="dress-gallery">
            {filteredProducts.map((product) => 
            {console.log("product test",product)
              return(
                <div key={product._id} className="dress-item" onClick={() => handleDressClick(product)}>
                  <img
                    src={product.images[0] || 'https://via.placeholder.com/150'}
                    alt={product.name}
                    className="dress-image"
                  />
                  <div className="overlay">
                    <p className="overlay-detail">{product.price?.toLocaleString('vi-VN')} VNĐ</p>
                    <h2 className="overlay-title">{product.name}</h2>
                  </div>
                </div>
              )
            }
            )}
          </div>

          <Pagination
            current={currentPage}
            total={products.length}
            pageSize={itemsPerPage}
            onChange={(page) => setCurrentPage(page)}
            className="pagination-container"
          />
        </div>
      </div>
    </div>
  );
};

export default DressStyle;
