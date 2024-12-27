import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './StoryTips.css';

const blogs = [
  {
    id: 1,
    title: "Bí Kíp Cho Màn Cầu Hôn Lãng Mạn Để Nàng Phải Say 'YES'",
    category: "Tin Tức",
    image: require('../../assets/images/blog1.jpg'),
  },
  {
    id: 2,
    title: "A-Z Studio - Cửa hàng váy cưới thiết kế theo dáng cô dâu Việt",
    category: "Tin Tức",
    image: require('../../assets/images/blog2.jpg'),
  },
  {
    id: 3,
    title: "Top 3 phim trường nội thành Sài Gòn đang hot hiện nay",
    category: "Photography",
    image: require('../../assets/images/blog3.jpg'),
  },
  {
    id: 4,
    title: "Bảng giá chụp hình cưới phim trường Sài Gòn 2024 tại A-Z Studio",
    category: "Tin Tức",
    image: require('../../assets/images/story.jpg'),
  },
  {
    id: 5,
    title: "4 phụ kiện trang trí tiệc cưới thường được lựa chọn",
    category: "Beauty",
    image: require('../../assets/images/blog5.jpg'),
  },
  {
    id: 6,
    title: "Nghi thức đám cưới Thiên Chúa giáo bạn cần biết",
    category: "Tin Tức",
    image: require('../../assets/images/blogchua.jpg'),
  },
];

const StoryTips = () => {
  const [activeTab, setActiveTab] = useState("all");

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const filteredBlogs =
    activeTab === "all"
      ? blogs
      : blogs.filter((blog) => blog.category.toLowerCase() === activeTab);

  return (
    <div className="story-tips-container">
      {/* Header */}
      <div className="story-header">
        <h1>Stories & Tips</h1>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <a
          href="#"
          className={activeTab === "all" ? "active" : ""}
          onClick={() => handleTabChange("all")}
        >
          Tất cả
        </a>
        <a
          href="#"
          className={activeTab === "tin tức" ? "active" : ""}
          onClick={() => handleTabChange("tin tức")}
        >
          Tin Tức
        </a>
        <a
          href="#"
          className={activeTab === "beauty" ? "active" : ""}
          onClick={() => handleTabChange("beauty")}
        >
          Beauty
        </a>
        <a
          href="#"
          className={activeTab === "photography" ? "active" : ""}
          onClick={() => handleTabChange("photography")}
        >
          Photography
        </a>
      </div>

      {/* Blog List */}
      <div className="blog-list">
        {filteredBlogs.map((blog) => (
          <div key={blog.id} className="blog-item">
            <Link to={`/blog/${blog.id}`}>
              <img src={blog.image} alt={blog.title} />
              <div className="blog-item-content">
                <p className="blog-item-category">{blog.category}</p>
                <h2 className="blog-item-title">{blog.title}</h2>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoryTips;
