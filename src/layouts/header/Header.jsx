import React, { useState } from "react";
import { Menu } from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  BellOutlined,
} from "@ant-design/icons";
import "./Header.css";
import logoImage from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState("home"); // Set giá trị mặc định cho current
  const roleAdmin = localStorage.getItem("isAdmin");
  console.log("roleAdmin", roleAdmin);
  // Hàm xử lý sự kiện cho từng mục và chuyển hướng bằng navigate
  const handleItemClick = (e) => {
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
      case "users":
        navigate("/admin/user-management"); // Quản lý người dùng
        break;
      case "appointment-manage":
        navigate("/admin/bookings-management"); // Quản lý đặt lịch
        break;
      case "order-manage":
        navigate("/admin/orders-management"); // Quản lý đơn hàng
        break;
      case "product-manage":
        navigate("/admin/product-management"); // Quản lý mặt hàng
        break;

      case "portfolio-manage":
        navigate("/admin/portfolio-management"); // Quản lý portfolio
        break;
      case "iconCart":
        navigate("/shopping-cart/shoppingcart"); // Giỏ hàng
        break;

      default:
        navigate("/404"); // Trang không tìm thấy
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
        { label: "Videography", key: "video" },
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

    ...(roleAdmin
      ? [
          {
            label: <BellOutlined style={{ fontSize: "20px" }} />,
            key: "iconBell",
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
        { key: "login", label: "Đăng nhập" },
        ...(roleAdmin
          ? [
              {
                key: "control",
                label: "Bảng điều khiển",
                children: [
                  { key: "users", label: "Quản lý người dùng" },
                  { key: "appointment-manage", label: "Quản lý đặt lịch" },
                  { key: "order-manage", label: "Quản lý Đơn hàng" },
                  { key: "category-manage", label: "Quản lý Danh mục" },
                  { key: "product-manage", label: "Quản lý Mặt hàng" },
                  { key: "portfolio-manage", label: "Quản lý Portfolio" },
                ],
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
          items={items} // Sử dụng items cho Menu
        />
      </div>
    </div>
  );
}

export default Header;
