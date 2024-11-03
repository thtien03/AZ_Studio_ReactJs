import React from 'react';
import './Home.css';
import iconPhone from '../../assets/images/phone-icon.png';
import iconChat from '../../assets/images/chat-icon.png';
import imgBackground from '../../assets/images/Nen-home.jpg';
import imgabout1 from '../../assets/images/THT_6762.jpg';
import imgabout2 from '../../assets/images/cardabout2.jpg';
import imgabout3 from '../../assets/images/card-about3.jpg';
import imgService1 from '../../assets/images/ngang.jpg'; 
import imgService2 from '../../assets/images/dọc.jpg';


function MainContent() {
    return (
        <>
            <div 
                className="main-content" 
                style={{
                    backgroundImage: `url(${imgBackground})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    height: '100vh'
                }}
            >
                <div className="support-icons">
                    <div className="icon chat-icon"><img src={iconChat} alt="Chat Icon" /></div>
                    <div className="icon phone-icon"><img src={iconPhone} alt="Phone Icon" /></div>
                    <button className="appointment-button">Đặt lịch hẹn</button>
                </div>
            </div>

            <div className="about-section">
                <h2>Về chúng tôi</h2>
                <p>
                    REN Bridal Studio là một trong những công ty cung cấp dịch vụ cưới hàng đầu Việt Nam. Chúng tôi sở hữu hệ thống showroom cưới tại 3 tỉnh thành lớn khu vực miền Nam: TP. Hồ Chí Minh, Cần Thơ và Đà Lạt.
                </p>
                <h1>
                    “Từ khi cầu hôn cho đến ngày cưới, từ lúc bắt đầu chuẩn bị đến khoảnh khắc về chung một nhà, chúng tôi đều ở đây cho mọi bước trong cuộc hành trình của đôi bạn.”
                </h1>

                <div className="about-card-container">
                    <div className="about-card">
                        <img src={imgabout1} alt="Dịch vụ quay chụp" className="about-image" />
                        <div className="overlay">
                            <h3 className="about-title">Dịch Vụ Quay Chụp</h3>
                            <p className="about-detail">AZ Studio cung cấp dịch vụ trọn gói chụp hình Pre-wedding: studio, phim trường, ngoại cảnh.</p>
                        </div>
                    </div>
                    
                    <div className="about-card">
                        <img src={imgabout2} alt="Váy Cưới" className="about-image" />
                        <div className="overlay">
                            <h3 className="about-title">Váy Cưới</h3>
                            <p className="about-detail">Các mẫu váy cưới đa dạng và tinh tế, đáp ứng mọi phong cách của cô dâu.</p>
                        </div>
                    </div>

                    <div className="about-card">
                        <img src={imgabout3} alt="Trang Điểm" className="about-image" />
                        <div className="overlay">
                            <h3 className="about-title">Trang Điểm</h3>
                            <p className="about-detail">Trang điểm chuyên nghiệp để tạo nên vẻ đẹp tự nhiên và nổi bật cho ngày trọng đại của bạn.</p>
                        </div>
                    </div>
                </div>
            </div>


            {/* =========================Sản Phẩm================================ */}

        <div className="product-gallery">
                <h2>Sản Phẩm</h2>

                <div className="category-menu">
                    <button className="category-button active">ALL</button>
                    <button className="category-button">PRE-WEDDING</button>
                    <button className="category-button">KỶ YẾU</button>
                    <button className="category-button">FASHION</button>
                    <button className="category-button">LỄ CƯỚI</button>
                    <button className="category-button">SỰ KIỆN</button>
                    <button className="category-button">CHÂN DUNG</button>
                </div>
                <div className="product-grid">
                    <div className="product-card">
                        <img src={imgService1} alt="Product 1" className="product-image" />
                        <div className="product-overlay">
                            <p>Concept Tết</p>
                            <p>Model: Quỳnh Như</p>
                        </div>
                    </div>
                    <div className="product-card">
                        <img src={imgService1} alt="Product 2" className="product-image" />
                        <div className="product-overlay">
                            <p>Concept Tết</p>
                            <p>Model: Quỳnh Như</p>
                        </div>
                    </div>
                    <div className="product-card">
                        <img src={imgService2} alt="Product 3" className="product-image" />
                        <div className="product-overlay">
                            <p>Concept Tết</p>
                            <p>Model: Quỳnh Như</p>
                        </div>
                    </div>
                    <div className="product-card">
                        <img src={imgService1} alt="Product 4" className="product-image" />
                        <div className="product-overlay">
                            <p>Concept Tết</p>
                            <p>Model: Quỳnh Như</p>
                        </div>
                    </div>
                    <div className="product-card">
                        <img src={imgabout2} alt="Product 5" className="product-image" />
                    </div>
                    <div className="product-card">
                        <img src={imgService1} alt="Product 4" className="product-image" />
                    </div>
                    <div className="product-card">
                        <img src={imgabout2} alt="Product 6" className="product-image" />
                    </div>
                    <div className="product-card">
                        <img src={imgabout2} alt="Product 6" className="product-image" />
                    </div>
                    <div className="product-card">
                        <img src={imgabout2} alt="Product 6" className="product-image" />
                    </div>
                    <div className="product-card">
                        <img src={imgService1} alt="Product 4" className="product-image" />
                    </div>
                    
                </div>
            </div>



            {/* Phần Dịch Vụ */}
            <div className="service-section">
            <h2>Dịch Vụ Của Chúng Tôi</h2>
            <p>Chúng tôi cam kết mang đến các dịch vụ chất lượng hàng đầu, giúp bạn có trải nghiệm cưới hoàn hảo và trọn vẹn.</p>
            <div className="service-card-container">
                <div className="service-card">
                    <img src={imgService1} alt="Chân dung" className="service-image" />
                    <h3 className="service-title">Chân dung</h3>
                    <p className="service-price">Chỉ từ 1.500.000₫</p>
                    <div className="service-rating">★★★★★</div>
                    <div className="service-buttons">
                        <button className="service-button">Xem thêm</button>
                        <button className="service-button">Đặt lịch</button>
                    </div>
                </div>

                <div className="service-card">
                    <img src={imgService2} alt="Event" className="service-image" />
                    <h3 className="service-title">Event</h3>
                    <p className="service-price">Chỉ từ 3.000.000₫</p>
                    <div className="service-rating">★★★★★</div>
                    <div className="service-buttons">
                        <button className="service-button">Xem thêm</button>
                        <button className="service-button">Đặt lịch</button>
                    </div>
                </div>

                <div className="service-card">
                    <img src={imgService2} alt="Lễ Hội" className="service-image" />
                    <h3 className="service-title">PreWedding</h3>
                    <p className="service-price">Chỉ từ 3.000.000₫</p>
                    <div className="service-rating">★★★★★</div>
                    <div className="service-buttons">
                        <button className="service-button">Xem thêm</button>
                        <button className="service-button">Đặt lịch</button>
                    </div>
                </div>

                <div className="service-card">
                    <img src={imgService2} alt="Lễ Hội" className="service-image" />
                    <h3 className="service-title">Kỷ yếu</h3>
                    <p className="service-price">Chỉ từ 3.000.000₫</p>
                    <div className="service-rating">★★★★★</div>
                    <div className="service-buttons">
                        <button className="service-button">Xem thêm</button>
                        <button className="service-button">Đặt lịch</button>
                    </div>
                </div>

                <div className="service-card">
                    <img src={imgService2} alt="Lễ Hội" className="service-image" />
                    <h3 className="service-title">Sản phẩm</h3>
                    <p className="service-price">Chỉ từ 3.000.000₫</p>
                    <div className="service-rating">★★★★★</div>
                    <div className="service-buttons">
                        <button className="service-button">Xem thêm</button>
                        <button className="service-button">Đặt lịch</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default MainContent;
