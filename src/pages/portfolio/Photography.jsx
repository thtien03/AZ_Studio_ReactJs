// src/components/Photography.jsx
import React, { useEffect, useState, useCallback, useMemo } from "react";
import "./Photography.css";
import { useNavigate } from "react-router-dom";
import { getListProductsService } from "src/services/product.service";
import { getListCategoriesService } from "src/services/category.service"; // Import dịch vụ lấy danh mục

const Photography = () => {
    const [photos, setPhotos] = useState([]);
    const [categories, setCategories] = useState([]); // Tất cả danh mục
    const [filteredCategories, setFilteredCategories] = useState([]); // Danh mục liên quan đến portfolio
    const [selectedCategory, setSelectedCategory] = useState("ALL"); // Danh mục đã chọn
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

    if (loading) {
        return <div className="loading">Đang tải...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="photography-container">
            <div className="photography-header">
                <h1 className="photography-title">Portfolio</h1>
            </div>

            {/* Category Menu */}
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
        </div>
    );
};

export default Photography;
