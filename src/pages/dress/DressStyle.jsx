import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination, Tabs } from 'antd';
import 'antd/dist/reset.css';
import './DressStyle.css';

const dressStyles = [
  { id: 1, imgSrc: require('../../assets/images/SanPham/Áo dài luxury-AC211/Áo dài luxury-AC211_1.png'), name: 'Áo dài luxury-AC211', price: '1,500,000', category: 'wedding-dress' },
  { id: 3, imgSrc: require('../../assets/images/A-line3.jpg'), name: 'Váy cưới đuôi cá DC-127', price: '1,800,000', category: 'wedding-dress' },
  { id: 4, imgSrc: require('../../assets/images/ballgown1.jpg'), name: 'Váy cưới Luxury L127', price: '2,500,000', category: 'wedding-dress' },
  { id: 5, imgSrc: require('../../assets/images/SanPham/LOOK 1 – ÁO DÀI VIÊN MÃN/LOOK 1 – ÁO DÀI VIÊN MÃN_1.png'), name: 'Áo dài limited-ACLM032', price: '3,000,000', category: 'wedding-dress' },
  { id: 6, imgSrc: require('../../assets/images/ballgown3.jpg'), name: 'Váy cưới Luxury L132', price: '2,200,000', category: 'wedding-dress' },
  { id: 7, imgSrc: require('../../assets/images/Fit&Flare1.jpg'), name: 'Áo dài đi bàn AD122', price: '2,100,000', category: 'wedding-dress' },
  { id: 8, imgSrc: require('../../assets/images/Fit&Flare2.jpg'), name: 'Áo dài đi bàn AD135', price: '1,900,000', category: 'wedding-dress' },
  { id: 2, imgSrc: require('../../assets/images/SanPham/Áo dài limited-ACLM013/Áo dài limited-ACLM013_1.png'), name: 'Áo dài limited-ACLM013', price: '2,000,000', category: 'wedding-dress' },
  { id: 9, imgSrc: require('../../assets/images/Fit&Flare3.jpg'), name: 'Áo dài đi bàn AD121', price: '2,400,000', category: 'wedding-dress' },
  { id: 10, imgSrc: require('../../assets/images/A-line1.jpg'), name: 'A-line Ao Dai', price: '1,200,000', category: 'aodai' },
  { id: 11, imgSrc: require('../../assets/images/A-line2.jpg'), name: 'A-line Ao Dai 2', price: '1,500,000', category: 'aodai' },
  { id: 12, imgSrc: require('../../assets/images/VEST/BỘ TUXEDO TRẮNG/BỘ TUXEDO TRẮNG_1.png'), name: 'Vest TUXEDO TRẮNG', price: '2,000,000', category: 'vest' },
  { id: 13, imgSrc: require('../../assets/images/VEST/BỘ VEST 6 CÚC ĐEN/BỘ VEST 6 CÚC ĐEN_1.png'), name: 'Vest Style 2', price: '2,300,000', category: 'vest' },
];

const DressStyle = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedLine, setSelectedLine] = useState('Premium');
  const [selectedColor, setSelectedColor] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all'); // Mặc định là "all" để hiển thị tất cả sản phẩm

  const itemsPerPage = 9;

  const handleDressClick = (dress) => {
    navigate(`/product-detail/${dress.id}`);
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const onChangePage = (page) => {
    setCurrentPage(page);
  };

  // Logic lọc theo danh mục
  const filteredByCategory =
    selectedCategory === 'all' ? dressStyles : dressStyles.filter((dress) => dress.category === selectedCategory);

  // Logic lọc theo từ khóa tìm kiếm
  const filteredDressStyles = filteredByCategory.filter((dress) =>
    dress.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredDressStyles.slice(startIndex, startIndex + itemsPerPage);

  const handleTabChange = (key) => {
    setSelectedCategory(key);
    setCurrentPage(1);
  };

  return (
    <div>
      {/* Tabs có thêm "All" */}
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
          <div className="search-bar">
            <input
              type="text"
              placeholder="Tìm kiếm kiểu váy..."
              value={searchTerm}
              onChange={handleChange}
            />
          </div>
          <h2>Bộ Lọc</h2>
          <div className="filter-option">
            <label>Dáng Váy:</label>
            <select value={selectedStyle} onChange={(e) => setSelectedStyle(e.target.value)}>
              <option value="">Chọn Dáng Váy</option>
              <option value="A-line">A-line</option>
              <option value="Ballgown">Ballgown</option>
              <option value="Fit & Flare">Fit & Flare</option>
            </select>
          </div>

          <div className="filter-option">
            <label>Dòng Váy:</label>
            <select value={selectedLine} onChange={(e) => setSelectedLine(e.target.value)}>
              <option value="Premium">Premium</option>
              <option value="Limited">Limited</option>
              <option value="Luxury">Luxury</option>
              <option value="Ruby">Ruby</option>
              <option value="Basic">Basic</option>
              <option value="Ao Dai">Áo Dài</option>
            </select>
          </div>

          <div className="filter-option">
            <label>Màu Sắc:</label>
            <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
              <option value="">Chọn Màu Sắc</option>
              <option value="Trắng">Trắng</option>
              <option value="Đỏ">Đỏ</option>
              <option value="Đen">Đen</option>
            </select>
          </div>

          <button className="apply-button">Áp Dụng</button>
        </div>

        <div className="right-section">
          <div className="dress-gallery">
            {currentItems.map((dress) => (
              <div key={dress.id} className="dress-item" onClick={() => handleDressClick(dress)}>
                <img src={dress.imgSrc} alt={dress.name} className="dress-image" />
                <div className="overlay">
                  <p className="overlay-detail">{dress.price} VNĐ</p>
                  <h2 className="overlay-title">{dress.name}</h2>
                </div>
              </div>
            ))}
          </div>

          <div className="pagination-container">
            <Pagination
              current={currentPage}
              total={filteredDressStyles.length}
              pageSize={itemsPerPage}
              onChange={onChangePage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DressStyle;
