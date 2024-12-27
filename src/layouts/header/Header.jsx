import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Badge, List, Menu, Modal, Select, Tag,message } from "antd";
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

  const [currentMain, setCurrentMain] = useState("home");
  const [currentRight, setCurrentRight] = useState("");

  // Utility functions to get values from localStorage
  const getIsAdmin = () => localStorage.getItem("isAdmin") === "true";
  const getAccessToken = () => localStorage.getItem("accessToken");

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
      label: <UserOutlined style={{ fontSize: "20px" }} className="btnlogin" />,
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
          : [
              {
                key: "gallery",
                label: "Thư viện ảnh",
              },
            ]),
      ],
    },
  ];

  const submenuKeyToParentKey = {
    price: "service",
    weddingAlbum: "service",
    photo: "portfolio",
  };

  const handleItemClick = (e) => {
    if (submenuKeyToParentKey[e.key]) {
      setCurrentMain(submenuKeyToParentKey[e.key]);
      setCurrentRight(e.key);
    } else if (mainMenuKeys.includes(e.key)) {
      setCurrentMain(e.key);
      setCurrentRight("");
    } else {
      setCurrentRight(e.key);
    }

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
        localStorage.removeItem("accessToken");
        localStorage.removeItem("isAdmin");
        navigate("/auth/login");
        break;
      case "control":
        navigate("/admin/user-management");
        break;
      case "gallery":
        if (!accessToken) {
          message.warning("Vui lòng đăng nhập để truy cập thư viện ảnh.", 2);
          navigate("/auth/login");
        } else {
          navigate("/gallery/gallery");
        }
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
        {/* <Badge count={3}>
          <FaBell
            onClick={() => setOpen(true)}
            size={20}
            className="cursor-pointer"
          />
        </Badge> */}
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
