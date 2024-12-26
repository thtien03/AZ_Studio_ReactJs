import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Badge, Menu, Modal, List, Tag, Select } from "antd";
import { useState } from "react";
import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logoImage from "../../assets/images/logo.png";
import NotificationBell from "../../pages/admin/notification-management/NotificationBell";
import "./Header.css";
const notifications = [
  {
    id: 1,
    message: "Đơn hàng của bạn đã được xác nhận.",
    status: "Đã xem",
    time: "19/12/2024 08:00",
    isRead: true,
  },
  {
    id: 2,
    message: "Đơn hàng của bạn đang được giao.",
    status: "Chưa xem",
    time: "19/12/2024 10:00",
    isRead: false,
  },
  {
    id: 3,
    message: "Đơn hàng đã được giao thành công.",
    status: "Chưa xem",
    time: "18/12/2024 15:30",
    isRead: false,
  },
];
function Header() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState("home"); // Set giá trị mặc định cho current
  const roleAdmin = localStorage.getItem("isAdmin");
  const accessToken = localStorage.getItem("accessToken");
  const [open, setOpen] = useState(false);
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
      children: [{ label: "Photography", key: "photo" }],
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
        <Badge count={3}>
          <FaBell
            onClick={() => setOpen(true)}
            size={20}
            className="cursor-pointer"
          />
        </Badge>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          onOk={() => setOpen(false)}
          title="Thông báo"
        >
          <div className="p-4 max-w-md mx-auto">
            <Select
              defaultValue={"all"}
              className="w-full"
              placeholder="Filter"
              options={[
                {
                  value: "all",
                  label: "Tất cả",
                },
                {
                  value: "isRead",
                  label: "Đã xem",
                },
                {
                  value: "isNotRead",
                  label: "Chưa xem",
                },
              ]}
            />
            <List
              dataSource={notifications}
              renderItem={(item) => (
                <List.Item className="border-b last:border-none w-full">
                  <div className="flex flex-col w-full">
                    <div className="flex justify-between items-center mb-2 justify-between w-full ">
                      <span>{item.message}</span>
                      <Tag color={item.isRead ? "green" : "red"}>
                        {item.isRead ? "Đã xem" : "Chưa xem"}
                      </Tag>
                    </div>
                    <div className="text-gray-500 text-sm">{item.time}</div>
                  </div>
                </List.Item>
              )}
            />
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Header;
