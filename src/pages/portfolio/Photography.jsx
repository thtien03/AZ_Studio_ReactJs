import React, { useEffect, useState } from "react";
import "./Photography.css";
import { useNavigate } from "react-router-dom";
import { getListProductsService } from "src/services/product.service";
import { getListCategoriesService } from "src/services/category.service"; // Import dịch vụ lấy danh mục

const Photography = () => {
    const [photos, setPhotos] = useState([]);
    const [categories, setCategories] = useState([]); // Lưu danh sách danh mục
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                // Lấy danh mục
                const categoryResponse = await getListCategoriesService();
                const categoryData = categoryResponse.data;

                setCategories(categoryData);

                // Lấy sản phẩm
                const response = await getListProductsService();
                const data = response.data
                    .filter((product) => product.type === "portfolio")
                    .map(item => ({
                        id: item._id,
                        banner: item.bannerImage, // Giả sử images là một mảng
                        listImage: item.images,
                        alt: item.name,
                        title: item.name,
                        detail: item.detail,
                        category: categoryData.find(cat => cat._id === item.categoryId)?.name || "Không có danh mục" // Lấy tên danh mục
                    }));
                setPhotos(data);
            } catch (error) {
                console.error("Error fetching portfolio data:", error.message);
            }
        };
        fetchPhotos();
    }, []);

    const handleImageClick = (photo) => {
        // Điều hướng tới trang chi tiết
        navigate(`/portfolio/imagedetail`, { state: { photo } });
    };

    return (
        <div className="photography-container">
            <div className="photography-header">
                <h1 className="photography-title">Portfolio</h1>
            </div>
            <div className="photography-grid">
                {photos.map(photo => (
                    <>
                        {photo?.banner && (
                            <div 
                                key={photo.id} 
                                className="photography-item"
                                onClick={() => handleImageClick(photo)} // Thêm sự kiện click
                                style={{ cursor: "pointer" }}
                            >
                                <img src={photo.banner} alt={photo.alt} />
                                <div className="overlay">
                                    <h2 className="overlay-title">{photo.title}</h2>
                                    <p className="overlay-detail">{photo.category}</p> {/* Hiển thị danh mục */}
                                </div>
                            </div>
                        )}
                    </>
                ))}
            </div>
        </div>
    );
};

export default Photography;
