// src/components/Header.js
import React from 'react';
import { Menu, Dropdown } from 'antd';
import './Header.css';
import logoImage from '../../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();

    // Tạo menu con cho Dropdown của dịch vụ
    const servicesSubmenu = (
        <Menu>
            <Menu.Item key="pricing" onClick={() => navigate('/service/pricing')}>Bảng giá</Menu.Item>
            <Menu.Item key="wedding-album" onClick={() => navigate('/service/album')}>Chụp Album Cưới</Menu.Item>
        </Menu>
    );

    // Tạo menu con cho Dropdown của portfolio
    const portfolioSubmenu = (
        <Menu>
            <Menu.Item key="photography" onClick={() => navigate('/portfolio/photography')}>Photography</Menu.Item>
            <Menu.Item key="videography" onClick={() => navigate('/portfolio/videography')}>Videography</Menu.Item>
        </Menu>
    );

    return (
        <div className="header-container">
            <div onClick={()=> navigate('/')} className="logo">
                <img src={logoImage} alt="A-Z Studio" className="logo-image" />
            </div>
            <div className="navbar">
                <Menu mode="horizontal" theme="light" overflowedIndicator="...">
                    <Menu.Item key="about" onClick={() => navigate('/')}>Trang chủ</Menu.Item>
                    
                    <Dropdown overlay={servicesSubmenu} trigger={['click']} placement="bottomCenter">
                        <Menu.Item key="services">Dịch vụ</Menu.Item>
                    </Dropdown>

                    <Dropdown overlay={portfolioSubmenu} trigger={['click']} placement="bottomCenter">
                        <Menu.Item key="portfolio">Portfolio</Menu.Item>
                    </Dropdown>
                    
                    <Menu.Item key="dress-style" onClick={() => navigate('/dress-style')}>Váy Cưới</Menu.Item>
                    <Menu.Item key="tips" onClick={() => navigate('/tips')}>Stories & Tips</Menu.Item>
                    <Menu.Item key="contact" onClick={() => navigate('/contact')}>Liên hệ</Menu.Item>
                </Menu>
            </div>
        </div>
    );
}

export default Header;
