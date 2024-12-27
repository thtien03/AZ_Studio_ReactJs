import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "./Header.css";
import logoImage from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import NotificationBell from "../../pages/admin/notification-management/NotificationBell";

function Header() {
  const navigate = useNavigate();
  const [currentMain, setCurrentMain] = useState("home");
  const [currentRight, setCurrentRight] = useState("");

  // Utility functions to get values from localStorage
  const getIsAdmin = () => localStorage.getItem("isAdmin") === "true";
  const getAccessToken = () => localStorage.getItem("accessToken");

  const roleAdmin = getIsAdmin();
  const accessToken = getAccessToken();

  // Define mainMenuItems first
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

  // Define mainMenuKeys after mainMenuItems
  const mainMenuKeys = mainMenuItems.map((item) => item.key);

  // Define rightMenuItems
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
          key: !accessToken ? "login" : "logout",
          label: !accessToken ? "Đăng nhập" : "Đăng xuất",
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

  // Define mainMenuKeys and rightMenuKeys if necessary
  // Mapping submenu keys to their parent keys
  const submenuKeyToParentKey = {
    price: "service",
    weddingAlbum: "service",
    photo: "portfolio",
  };

  const handleItemClick = (e) => {
    if (submenuKeyToParentKey[e.key]) {
      // Nếu là submenu, set selected key cho Main Menu là parent key
      setCurrentMain(submenuKeyToParentKey[e.key]);
      setCurrentRight(e.key);
    } else if (mainMenuKeys.includes(e.key)) {
      // Nếu là main menu, set selected key cho Main Menu
      setCurrentMain(e.key);
      setCurrentRight("");
    } else {
      // Nếu là right menu, set selected key cho Right Menu
      setCurrentRight(e.key);
    }

    // Xử lý điều hướng dựa trên key
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
        navigate("/story-tips/StoryTips");
        break;
      case "contact":
        navigate("/contact");
        break;
      case "login":
        navigate("/auth/login");
        break;
      case "logout":
        localStorage.removeItem("accessToken");
        localStorage.removeItem("isAdmin");
        navigate("/auth/login");
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

  return (
    <div className="header-container">
      {/* Logo */}
      <div onClick={() => navigate("/")} className="logo">
        <img src={logoImage} alt="A-Z Studio" className="logo-image" />
      </div>

      {/* Navbar */}
      <div className="navbar">
        {/* Main Menu */}
        <Menu
          onClick={handleItemClick}
          selectedKeys={[currentMain]}
          mode="horizontal"
          items={mainMenuItems}
          className="main-menu"
        />

        {/* Right Menu */}
        <Menu
          onClick={handleItemClick}
          selectedKeys={[currentRight]}
          mode="horizontal"
          items={rightMenuItems}
          className="right-menu"
        />
      </div>
    </div>
  );
}

export default Header;
