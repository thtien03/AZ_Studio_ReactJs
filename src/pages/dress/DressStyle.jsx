// src/pages/DressStyle.js
import React, { useState } from 'react';
import './DressStyle.css';

const dressStyles = [
    { id: 1, imgSrc: require('../../assets/images/A-line1.jpg'), name: 'A-line 1' },
    { id: 2, imgSrc: require('../../assets/images/A-line2.jpg'), name: 'A-line 2' },
    { id: 3, imgSrc: require('../../assets/images/A-line3.jpg'), name: 'A-line 3' },
    { id: 4, imgSrc: require('../../assets/images/ballgown1.jpg'), name: 'Ballgown 1' },
    { id: 5, imgSrc: require('../../assets/images/ballgown2.jpg'), name: 'Ballgown 2' },
    { id: 6, imgSrc: require('../../assets/images/ballgown3.jpg'), name: 'Ballgown 3' },
    { id: 7, imgSrc: require('../../assets/images/Fit&Flare1.jpg'), name: 'Fit & Flare 1' },
    { id: 8, imgSrc: require('../../assets/images/Fit&Flare2.jpg'), name: 'Fit & Flare 2' },
    { id: 9, imgSrc: require('../../assets/images/Fit&Flare3.jpg'), name: 'Fit & Flare 3' },  
    // Thêm các kiểu váy khác nếu cần
];

const DressStyle = () => {
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedLine, setSelectedLine] = useState('Premium');
  const [selectedColor, setSelectedColor] = useState('');

  return (
    <div className="dress-style-container">
      <div className="dress-gallery">
        {dressStyles.map((dress) => (
          <div key={dress.id} className="dress-item">
            <img src={dress.imgSrc} alt={dress.name} className="dress-image" />
            <p className="dress-name">{dress.name}</p>
          </div>
        ))}
      </div>

      <div className="filter-section">
        <h2>Bộ Lọc</h2>
        <div className="filter-option">
          <label>Dáng Váy:</label>
          <select value={selectedStyle} onChange={(e) => setSelectedStyle(e.target.value)}>
            <option value="">Chọn Dáng Váy</option>
            <option value="A-line">A-line</option>
            <option value="Ballgown">Ballgown</option>
            <option value="Fit & Flare">Fit & Flare</option>
            {/* Thêm các tùy chọn khác */}
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
            {/* Thêm các tùy chọn màu sắc khác */}
          </select>
        </div>

        <button className="apply-button">Áp Dụng</button>

      </div>
    </div>
  );
};

export default DressStyle;

