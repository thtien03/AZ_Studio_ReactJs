import React, { useState } from "react";
import { Menu } from "antd";
import { UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "./Header.css";
import logoImage from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import NotificationBell from "../../pages/admin/notification-management/NotificationBell";

function Header() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState("home"); // Set giá trị mặc định cho current
  const roleAdmin = localStorage.getItem("isAdmin");
  const accessToken = localStorage.getItem("accessToken");
  console.log(!!accessToken);
  // Hàm xử lý sự kiện cho từng mục và chuyển hướng bằng navigate
  const handleItemClick = (e) => {
    setCurrent(e.key);
    console.log("click ", e.key);
    switch (e.key) {
      case "home":
        navigate("/"); // Trang chủ
        break;
      case "price":
        navigate("/service/pricing"); // Bảng giá
        break;
      case "weddingAlbum":
        navigate("/service/album"); // Chụp Album cưới
        break;
      case "photo":
        navigate("/portfolio/photography"); // Photography
        break;
      case "video":
        navigate("/portfolio/videography"); // Videography
        break;
      case "store":
        navigate("/dress-style"); // Cửa hàng
        break;
      case "story":
        navigate("/story-tips"); // Story & tips
        break;
      case "contact":
        navigate("/contact"); // Liên hệ
        break;
      case "login":
        navigate("/auth/login"); // Đăng nhập
        break;
      case "logout":
        navigate("/auth/login"); // Đăng nhập
        localStorage.removeItem("accessToken");
        localStorage.removeItem("isAdmin");
        break;
      case "control":
        navigate("/admin/user-management"); // Quản lý người dùng
        break;
      case "iconCart":
        navigate("/shopping-cart/shoppingcart");
        break;
      case "notifications":
        navigate("/admin/notifications");
        break;
      default:
        if (e.key !== "iconUser" && e.key !== "notifications") {
          navigate("/404");
        }
    }
  };

  // Tạo menu từ items và gắn sự kiện onClick trực tiếp
  const items = [
    {
      label: "Trang Chủ",
      key: "home",
    },
    {
      label: "Dịch vụ",
      key: "service",
      children: [
        { label: "Bảng giá", key: "price" },
        { label: "Chụp Album cưới", key: "weddingAlbum" },
      ],
    },
    {
      label: "Portfolio",
      key: "portfolio",
      children: [
        { label: "Photography", key: "photo" },
      ],
    },
    {
      label: "Cửa hàng",
      key: "store",
    },
    {
      label: "Story & tips",
      key: "story",
    },
    {
      label: "Liên hệ",
      key: "contact",
    },
  ];

  // Thêm các items bên phải
  const rightItems = [
    ...(roleAdmin
      ? [
          {
            label: <NotificationBell />,
            key: "notifications",
          },
        ]
      : []),
    {
      label: <ShoppingCartOutlined style={{ fontSize: "20px" }} />,
      key: "iconCart",
    },
    {
      label: <UserOutlined style={{ fontSize: "20px" }} />,
      key: "iconUser",
      children: [
        {
          key: !!!accessToken ? "login" : "logout",
          label: !!!accessToken ? "Đăng nhập" : "Đăng xuất",
        },
        ...(roleAdmin
          ? [
              {
                key: "control",
                label: "Bảng điều khiển",
              },
            ]
          : []),
      ],
    },
  ];

  return (
    
    <div className="header-container">
      <div onClick={() => navigate("/")} className="logo">
        <img src={logoImage} alt="A-Z Studio" className="logo-image" />
      </div>
      <div className="navbar">
        
        <Menu
          onClick={handleItemClick}
          selectedKeys={[current]} // Hiển thị mục đang chọn
          mode="horizontal"
          items={[...items, ...rightItems]} // Kết hợp menu items chính và items bên phải
          className="main-menu"
        />
      </div>
    </div>
  );
}

export default Header;
