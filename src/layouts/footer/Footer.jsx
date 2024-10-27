// src/components/Footer.js
import React from 'react';
import './Footer.css';
import logoImage from '../../assets/images/logo.png'; // Đảm bảo đường dẫn đúng đến tệp ảnh logo


function AppFooter() {
    return (
        <div className="footer-container">
            <div className="footer-content">
                <div className="footer-logo">
                    <h2><img src={logoImage} alt="" /></h2>
                </div>
                <div className="footer-column">
                    <h3>About</h3>
                    <ul>
                        <li>Thông tin</li>
                        <li>Cửa hàng</li>
                        <li>Tuyển dụng</li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3>Liên Hệ</h3>
                    <ul>
                        <li>Zalo</li>
                        <li>Viber</li>
                        <li>Whatsapp</li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3>Social</h3>
                    <ul>
                        <li>Facebook</li>
                        <li>Instagram</li>
                        <li>Tiktok</li>
                        <li>Youtube</li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3>Helps</h3>
                    <ul>
                        <li>Faqs</li>
                        <li>Chính sách</li>
                    </ul>
                </div>
            </div>
            
        </div>
    );
}

export default AppFooter;
