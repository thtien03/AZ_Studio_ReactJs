import { Carousel } from "antd";
import ModalAppointment from "./components/ModalAppointment/ModalAppointment";
import imgabout3 from "../../assets/images/card-about3.jpg";
import imgabout2 from "../../assets/images/cardabout2.jpg";
import imgService2 from "../../assets/images/dọc.jpg";
import imgBackground from "../../assets/images/Nen-home.jpg";
import imgHome1 from "../../assets/images/home1.png";
import imgHome2 from "../../assets/images/home2.png";
import imgHome3 from "../../assets/images/home6.jpg";
import imgHome4 from "../../assets/images/home5.jpg";
import imgService1 from "../../assets/images/ngang.jpg";
import imgabout1 from "../../assets/images/THT_6762.jpg";
import "./Home.css";
import { useState } from "react";

function MainContent() {
  // Mảng chứa các hình ảnh cho slider
  const backgroundImages = [
    imgBackground,
    imgHome1,
    imgHome2,
    imgHome3,
    imgHome4
  ];

  // Thêm state để quản lý modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hàm xử lý mở modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="main-content">
        <Carousel 
          autoplay 
          autoplaySpeed={3000} 
          effect="fade" 
          dots={true}
          pauseOnHover={false}
          infinite={true}
        >
          {backgroundImages.map((image, index) => (
            <div key={index}>
              <div
                className="slide-background"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  height: "85vh",
                }}
              />
            </div>
          ))}
        </Carousel>
      </div>

      <div className="about-section">
        <h2>Về chúng tôi</h2>
        <p>
          AZ Studio là một trong những công ty cung cấp dịch vụ cưới hàng đầu
          Việt Nam. Chúng tôi sở hữu hệ thống showroom cưới tại 3 tỉnh thành lớn
          khu vực miền Nam: TP. Hồ Chí Minh, Cần Thơ và Đà Lạt.
        </p>
        <h1>
          “Từ khi cầu hôn cho đến ngày cưới, từ lúc bắt đầu chuẩn bị đến khoảnh
          khắc về chung một nhà, chúng tôi đều ở đây cho mọi bước trong cuộc
          hành trình của đôi bạn.”
        </h1>

        <div className="about-card-container">
          <div className="about-card">
            <img
              src={imgabout1}
              alt="Dịch vụ quay chụp"
              className="about-image"
            />
            <div className="overlay">
              <h3 className="about-title">Dịch Vụ Quay Chụp</h3>
              <p className="about-detail">
                Dịch vụ chụp hình Pre-wedding trọn gói với đa dạng lựa chọn:
                Studio chuyên nghiệp, phim trường lãng mạn, và ngoại cảnh tuyệt
                đẹp. Đội ngũ tận tâm, phong cách sáng tạo, đảm bảo lưu giữ trọn
                vẹn khoảnh khắc ngọt ngào nhất cho bạn.
              </p>
            </div>
          </div>

          <div className="about-card">
            <img src={imgabout2} alt="Váy Cưới" className="about-image" />
            <div className="overlay">
              <h3 className="about-title">Váy Cưới</h3>
              <p className="about-detail">
                Bộ sưu tập váy cưới đa dạng và tinh tế, từ cổ điển thanh lịch
                đến hiện đại quyến rũ, đáp ứng mọi phong cách và sở thích của cô
                dâu. Mỗi thiết kế đều giúp tôn vinh vẻ đẹp rạng ngời ngày trọng
                đại.
              </p>
            </div>
          </div>

          <div className="about-card">
            <img src={imgabout3} alt="Trang Điểm" className="about-image" />
            <div className="overlay">
              <h3 className="about-title">Trang Điểm</h3>
              <p className="about-detail">
                Dịch vụ trang điểm chuyên nghiệp, giúp cô dâu tỏa sáng với vẻ
                đẹp tự nhiên và nổi bật trong ngày trọng đại. Đội ngũ makeup
                giàu kinh nghiệm sẽ tạo nên phong cách hoàn hảo, phù hợp với
                từng gương mặt và mong muốn của bạn.
              </p>
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
        <p>
          Chúng tôi cam kết mang đến các dịch vụ chất lượng hàng đầu, giúp bạn
          có trải nghiệm cưới hoàn hảo và trọn vẹn.
        </p>
        <div className="service-card-container">
          <div className="service-card">
            <img src={imgService1} alt="Chân dung" className="service-image" />
            <h3 className="service-title">Chân dung</h3>
            <p className="service-price">Chỉ từ 1.500.000₫</p>
            <div className="service-buttons">
              <button 
                className="service-button book-now"
                onClick={handleOpenModal}
              >
                Đặt lịch
              </button>
            </div>
          </div>

          <div className="service-card">
            <img src={imgService2} alt="Event" className="service-image" />
            <h3 className="service-title">Event</h3>
            <p className="service-price">Chỉ từ 3.000.000₫</p>
            <div className="service-buttons">
              <button 
                className="service-button book-now"
                onClick={handleOpenModal}
              >
                Đặt lịch
              </button>
            </div>
          </div>

          <div className="service-card">
            <img src={imgService2} alt="Lễ Hội" className="service-image" />
            <h3 className="service-title">PreWedding</h3>
            <p className="service-price">Chỉ từ 3.000.000₫</p>
            <div className="service-buttons">
              <button 
                className="service-button book-now"
                onClick={handleOpenModal}
              >
                Đặt lịch
              </button>
            </div>
          </div>

          <div className="service-card">
            <img src={imgService2} alt="Lễ Hội" className="service-image" />
            <h3 className="service-title">Kỷ yếu</h3>
            <p className="service-price">Chỉ từ 3.000.000₫</p>
            <div className="service-buttons">
              <button 
                className="service-button book-now"
                onClick={handleOpenModal}
              >
                Đặt lịch
              </button>
            </div>
          </div>

          <div className="service-card">
            <img src={imgService2} alt="Lễ Hội" className="service-image" />
            <h3 className="service-title">Sản phẩm</h3>
            <p className="service-price">Chỉ từ 3.000.000₫</p>
            <div className="service-buttons">
              <button 
                className="service-button book-now"
                onClick={handleOpenModal}
              >
                Đặt lịch
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainContent;
