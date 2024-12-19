import React, { useState } from "react";
import { Menu } from "antd";
import { UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "./Header.css";
import logoImage from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import NotificationBell from "../../pages/admin/notification-management/NotificationBell";

function Header() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState("home");

  const roleAdmin = localStorage.getItem("isAdmin");
  const accessToken = localStorage.getItem("accessToken");

  const handleItemClick = (e) => {
    setCurrent(e.key);
    switch (e.key) {
      case "home":
        navigate("/");
        break;
      case "price":
        navigate("/service/pricing");
        break;
      case "weddingAlbum":
        navigate("/service/album");
        break;
      case "photo":
        navigate("/portfolio/photography");
        break;
      case "store":
        navigate("/dress-style");
        break;
      case "story":
        navigate("/story-tips");
        break;
      case "contact":
        navigate("/contact");
        break;
      case "login":
        navigate("/auth/login");
        break;
      case "logout":
        navigate("/auth/login");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("isAdmin");
        break;
      case "control":
        navigate("/admin/user-management");
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

  const mainMenuItems = [
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

  const rightMenuItems = [
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
      {/* Logo */}
      <div onClick={() => navigate("/")} className="logo">
        <img src={logoImage} alt="A-Z Studio" className="logo-image" />
      </div>

      {/* Navbar */}
      <div className="navbar">
        {/* Menu Chính */}
        <Menu
          onClick={handleItemClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={mainMenuItems}
          className="main-menu"
        />

        {/* Menu Bên Phải */}
        <Menu
          onClick={handleItemClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={rightMenuItems}
          className="right-menu"
        />
      </div>
    </div>
  );
}

export default Header;
