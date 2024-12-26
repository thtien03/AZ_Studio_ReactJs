import { Carousel } from "antd";
import ModalAppointment from "./components/ModalAppointment/ModalAppointment";
import imgabout3 from "../../assets/images/card-about3.jpg";
import imgabout2 from "../../assets/images/A-line3.jpg";
import imgService2 from "../../assets/images/chandung.jpg";
import imgService3 from "../../assets/images/kyyeu.jpg";
import imgService4 from "../../assets/images/wedding.jpg";
import imgService5 from "../../assets/images/53660219479_576283f435_o.jpg";
import imgService6 from "../../assets/images/home5.jpg";
import imgBackground from "../../assets/images/slide5.png";
import imgHome1 from "../../assets/images/slide1.png";
import imgHome2 from "../../assets/images/slide2.png";
import imgHome3 from "../../assets/images/slide3.png";
import imgHome4 from "../../assets/images/slide4.png";
import imgService1 from "../../assets/images/53659726977_5e8b973b0e_o.jpg";
import imgabout1 from "../../assets/images/THT_6762.jpg";
import imgChanDung from "../../assets/images/chandung.jpg";
import imgEvent from "../../assets/images/event.jpg";
import imgKyYeu from "../../assets/images/kyyeu.jpg";
import imgTrangSuc from "../../assets/images/trangsuc.jpg";
import imgWedding from "../../assets/images/wedding.jpg";
import "./Home.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getListCategoriesService } from "src/services/category.service";
import { getListProductsService } from "src/services/product.service";

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

   const [photos, setPhotos] = useState([]);
       const [categories, setCategories] = useState([]); // Tất cả danh mục
       const [filteredCategories, setFilteredCategories] = useState([]); // Danh mục liên quan đến portfolio
       const [loading, setLoading] = useState(true);
       const [error, setError] = useState(null);
       const navigate = useNavigate();
   
       useEffect(() => {
           const fetchPhotos = async () => {
               try {
                   setLoading(true);
                   // Lấy danh mục
                   const categoryResponse = await getListCategoriesService();
                   const categoryData = categoryResponse.data;
                   setCategories(categoryData);
   
                   // Lấy sản phẩm loại "portfolio" với thông tin danh mục được populate
                   const response = await getListProductsService();
                   const data = response.data
                       .filter(product => product.type === "portfolio")
                       .map(item => ({
                           id: item._id,
                           banner: item.bannerImage || '',
                           listImage: item.images || [],
                           alt: item.name || 'Ảnh Portfolio',
                           title: item.name || 'Không có tiêu đề',
                           detail: item.detail || '',
                           categoryId: item.categoryId?._id.toString() || "", // Chuyển đổi ObjectId sang string
                           categoryName: item.categoryId?.name || "Không có danh mục"
                       }));
                   setPhotos(data);
   
                   // Lấy danh sách unique categoryIds từ các sản phẩm portfolio
                   const portfolioCategoryIds = Array.from(new Set(data.map(photo => photo.categoryId)));
   
                   // Lọc danh mục chỉ bao gồm các danh mục liên quan đến portfolio
                   const filteredCats = categoryData.filter(cat => portfolioCategoryIds.includes(cat._id.toString()));
                   setFilteredCategories(filteredCats);
   
                   setLoading(false);
               } catch (error) {
                   console.error("Error fetching portfolio data:", error.message);
                   setError("Đã có lỗi xảy ra khi tải dữ liệu.");
                   setLoading(false);
               }
           };
           fetchPhotos();
       }, []);
   
       const handleImageClick = useCallback((photo) => {
           navigate(`/portfolio/imagedetail`, { state: { photo } });
       }, [navigate]);
   
       // Lọc photos dựa trên selectedCategory
       const filteredPhotos = useMemo(() => {
           return selectedCategory === "ALL"
               ? photos
               : photos.filter(photo => photo.categoryId === selectedCategory);
       }, [photos, selectedCategory]);

  // Hàm xử lý mở modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Hàm xử lý đóng modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
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

      <>
      <div className="category-menu">
                <button
                    className={`category-button ${selectedCategory === "ALL" ? "active" : ""}`}
                    onClick={() => setSelectedCategory("ALL")}
                >
                    Tất cả
                </button>
                {filteredCategories.map(category => (
                    <button
                        key={category._id}
                        className={`category-button ${selectedCategory === category._id ? "active" : ""}`}
                        onClick={() => setSelectedCategory(category._id)}
                    >
                        {category.name}
                    </button>
                ))}
            </div>

            <div className="photography-grid">
                {filteredPhotos.length > 0 ? (
                    filteredPhotos.map(photo => (
                        photo.banner && (
                            <div 
                                key={photo.id} 
                                className="photography-item"
                                onClick={() => handleImageClick(photo)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') handleImageClick(photo);
                                }}
                                tabIndex={0}
                            >
                                <img src={photo.banner} alt={`Banner của ${photo.alt}`} />
                                <div className="overlay">
                                    <h2 className="overlay-title">{photo.title}</h2>
                                    <p className="overlay-detail">{photo.categoryName}</p>
                                </div>
                            </div>
                        )
                    ))
                ) : (
                    <div className="no-photos-message">
                        Không có portfolio nào thuộc danh mục này.
                    </div>
                )}
            </div>
      </>

      {/* Phần Dịch Vụ */}
      <div className="service-section">
        <h2>Dịch Vụ Của Chúng Tôi</h2>
        <p>
          Chúng tôi cam kết mang đến các dịch vụ chất lượng hàng đầu, giúp bạn
          có trải nghiệm cưới hoàn hảo và trọn vẹn.
        </p>
        <div className="service-card-container">
          <div className="service-card">
            <img src={imgChanDung} alt="Chân dung" className="service-image" />
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
            <img src={imgEvent} alt="Event" className="service-image" />
            <h3 className="service-title">Event</h3>
            <p className="service-price">Chỉ từ 5.000.000₫</p>
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
            <img src={imgWedding} alt="PreWedding" className="service-image" />
            <h3 className="service-title">PreWedding</h3>
            <p className="service-price">Chỉ từ 2.000.000₫</p>
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
            <img src={imgKyYeu} alt="Kỷ yếu" className="service-image" />
            <h3 className="service-title">Kỷ yếu</h3>
            <p className="service-price">Chỉ từ 10.000.000₫</p>
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
            <img src={imgTrangSuc} alt="Sản phẩm" className="service-image" />
            <h3 className="service-title">Sản phẩm</h3>
            <p className="service-price">Chỉ từ 2.000.000₫</p>
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

      {/* Modal Đặt Lịch */}
      <ModalAppointment open={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}

export default MainContent;
