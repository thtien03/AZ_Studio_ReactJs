// src/components/Header.js
import React from 'react';
import { Menu, Dropdown } from 'antd';
import './Header.css';
import logoImage from '../../assets/images/logo.png'; // Đảm bảo đường dẫn đúng đến tệp ảnh logo
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate()
    // Tạo menu con cho Dropdown
    const submenu = (
        <Menu>
            <Menu.Item key="pricing">Bảng giá</Menu.Item>
            <Menu.Item key="wedding-album">Chụp Album Cưới</Menu.Item>
            <Menu.Item key="wedding-story">Phóng sự ngày cưới</Menu.Item>
        </Menu>
    );

    return (
        <div className="header-container">
            <div className="logo">
                <img src={logoImage} alt="REN BRIDAL" className="logo-image" />
            </div>
            <div className="navbar">
                <Menu mode="horizontal" theme="light">
                    <Menu.Item key="about">Về chúng tôi</Menu.Item>
                    <Menu.Item onClick={()=>navigate("/service")} key="services">Dịch vụ</Menu.Item>
                    <Dropdown overlay={submenu} trigger={['hover']}>
                        <Menu.Item key="portfolio">Váy cưới</Menu.Item>
                    </Dropdown>
                    <Menu.Item key="portfolio">Portfolio</Menu.Item>
                    <Menu.Item key="tips">Stories & Tips</Menu.Item>
                    <Menu.Item key="contact">Liên hệ</Menu.Item>
                </Menu>
            </div>
        </div>
    );
}

export default Header;
