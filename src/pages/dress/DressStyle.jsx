// src/pages/DressStyle.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination, Tabs } from 'antd';
import 'antd/dist/reset.css';
import './DressStyle.css';

const dressStyles = [
  { id: 1, imgSrc: require('../../assets/images/A-line1.jpg'), name: 'A-line 1', category: 'wedding-dress' },
  { id: 2, imgSrc: require('../../assets/images/A-line2.jpg'), name: 'A-line 2', category: 'wedding-dress' },
  { id: 3, imgSrc: require('../../assets/images/A-line3.jpg'), name: 'A-line 3', category: 'wedding-dress' },
  { id: 4, imgSrc: require('../../assets/images/ballgown1.jpg'), name: 'Ballgown 1', category: 'wedding-dress' },
  { id: 5, imgSrc: require('../../assets/images/ballgown2.jpg'), name: 'Ballgown 2', category: 'wedding-dress' },
  { id: 6, imgSrc: require('../../assets/images/ballgown3.jpg'), name: 'Ballgown 3', category: 'wedding-dress' },
  { id: 7, imgSrc: require('../../assets/images/Fit&Flare1.jpg'), name: 'Fit & Flare 1', category: 'wedding-dress' },
  { id: 8, imgSrc: require('../../assets/images/Fit&Flare2.jpg'), name: 'Fit & Flare 2', category: 'wedding-dress' },
  { id: 9, imgSrc: require('../../assets/images/Fit&Flare3.jpg'), name: 'Fit & Flare 3', category: 'wedding-dress' },

  { id: 10, imgSrc: require('../../assets/images/A-line1.jpg'), name: 'A-line Ao Dai', category: 'aodai' },
  { id: 11, imgSrc: require('../../assets/images/A-line2.jpg'), name: 'A-line Ao Dai 2', category: 'aodai' },

  { id: 12, imgSrc: require('../../assets/images/A-line3.jpg'), name: 'Vest Style 1', category: 'vest' },
  { id: 13, imgSrc: require('../../assets/images/A-line2.jpg'), name: 'Vest Style 2', category: 'vest' },
];

const DressStyle = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedLine, setSelectedLine] = useState('Premium');
  const [selectedColor, setSelectedColor] = useState('');
  const suggestions = [];

  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('wedding-dress');

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

  const filteredByCategory = dressStyles.filter(dress => dress.category === selectedCategory);
  const filteredDressStyles = filteredByCategory.filter(dress =>
    dress.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = filteredDressStyles.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredDressStyles.slice(startIndex, endIndex);

  const handleTabChange = (key) => {
    setSelectedCategory(key);
    setCurrentPage(1);
  };

  return (
    <div>
      {/* Thanh filter Tabs ngay dưới navbar */}
      <Tabs
        defaultActiveKey="wedding-dress"
        onChange={handleTabChange}
        style={{ marginBottom: '20px', padding: '0 20px' }}
        items={[
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
            {searchTerm && (
              <ul className="suggestions">
                {suggestions
                  .filter(suggestion => suggestion.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                ))}
              </ul>
            )}
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
                <p className="dress-name">{dress.name}</p>
              </div>
            ))}
          </div>

          <div className="pagination-container">
            <Pagination
              current={currentPage}
              total={totalItems}
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
