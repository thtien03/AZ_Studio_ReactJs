import { Carousel } from "antd";
import ModalAppointment from "./components/ModalAppointment/ModalAppointment";
import imgabout3 from "../../assets/images/card-about3.jpg";
import imgabout2 from "../../assets/images/A-line3.jpg";
import imgService2 from "../../assets/images/Mau1.jpg";
import imgService3 from "../../assets/images/53658997172_aef70ff91e_o.jpg";
import imgService4 from "../../assets/images/ab8b227e-d912-4af4-a551-ef10885c8c65.jpg";
import imgService5 from "../../assets/images/53660219479_576283f435_o.jpg";
import imgService6 from "../../assets/images/home5.jpg";
import imgBackground from "../../assets/images/slide5.png";
import imgHome1 from "../../assets/images/slide1.png";
import imgHome2 from "../../assets/images/slide2.png";
import imgHome3 from "../../assets/images/slide3.png";
import imgHome4 from "../../assets/images/slide4.png";
import imgService1 from "../../assets/images/53659726977_5e8b973b0e_o.jpg";
import imgabout1 from "../../assets/images/THT_6762.jpg";
import "./Home.css";
import { useState } from "react";

function MainContent() {
  // Mảng chứa các hình ảnh cho slider
  const backgroundImages = [
    imgBackground,
    imgHome2,
    imgHome3,
    imgHome1,
    imgHome4
  ];

  // Thêm state để quản lý modal và danh mục sản phẩm đã chọn
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  // Hàm xử lý mở modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Dữ liệu sản phẩm với danh mục
  const products = [
    { id: 1, image: imgService1, name: "Concept Tết", model: "Quỳnh Như", category: "PRE-WEDDING" },
    { id: 3, image: imgService2, name: "Concept Tết", model: "Quỳnh Như", category: "FASHION" },
    { id: 5, image: imgabout2, name: "Concept Tết", model: "Quỳnh Như", category: "SỰ KIỆN" },
    { id: 7, image: imgService6, name: "Concept Tết", model: "Quỳnh Như", category: "KỶ YẾU" },
    { id: 6, image: imgService3, name: "Concept Tết", model: "Quỳnh Như", category: "PRE-WEDDING" },
    { id: 8, image: imgService4, name: "Concept Tết", model: "Quỳnh Như", category: "FASHION" },
    { id: 9, image: imgabout3, name: "Concept Tết", model: "Quỳnh Như", category: "LỄ CƯỚI" },
    { id: 9, image: imgService5, name: "Concept Tết", model: "Quỳnh Như", category: "LỄ CƯỚI" },
  ];

  // Lọc sản phẩm theo danh mục đã chọn
  const filteredProducts = products.filter((product) => {
    return selectedCategory === "ALL" || product.category === selectedCategory;
  });

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

        {/* Phần menu chọn filter danh mục */}
        <div className="category-menu">
          <button
            className={`category-button ${selectedCategory === "ALL" ? "active" : ""}`}
            onClick={() => setSelectedCategory("ALL")}
          >
            Tất cả
          </button>
          <button
            className={`category-button ${selectedCategory === "PRE-WEDDING" ? "active" : ""}`}
            onClick={() => setSelectedCategory("PRE-WEDDING")}
          >
            Pre-Wedding
          </button>
          <button
            className={`category-button ${selectedCategory === "KỶ YẾU" ? "active" : ""}`}
            onClick={() => setSelectedCategory("KỶ YẾU")}
          >
            Kỷ Yếu
          </button>
          <button
            className={`category-button ${selectedCategory === "FASHION" ? "active" : ""}`}
            onClick={() => setSelectedCategory("FASHION")}
          >
            Fashion
          </button>
          <button
            className={`category-button ${selectedCategory === "LỄ CƯỚI" ? "active" : ""}`}
            onClick={() => setSelectedCategory("LỄ CƯỚI")}
          >
            Lễ Cưới
          </button>
          <button
            className={`category-button ${selectedCategory === "SỰ KIỆN" ? "active" : ""}`}
            onClick={() => setSelectedCategory("SỰ KIỆN")}
          >
            Sự Kiện
          </button>
          <button
            className={`category-button ${selectedCategory === "CHÂN DUNG" ? "active" : ""}`}
            onClick={() => setSelectedCategory("CHÂN DUNG")}
          >
            Chân Dung
          </button>
        </div>

        {/* Hiển thị các sản phẩm sau khi lọc */}
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-overlay">
                <p>{product.name}</p>
                <p>Model: {product.model}</p>
              </div>
            </div>
          ))}
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
