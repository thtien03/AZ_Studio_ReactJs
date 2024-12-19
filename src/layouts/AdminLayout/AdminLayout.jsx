import {
  CalendarOutlined,
  PieChartOutlined,
  ProductOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  CategoryOutlined,
  PictureInPicture,
  StoreOutlined,
  AttachMoneyOutlined, // Thay thế cho DollarOutlined
} from "@mui/icons-material";
import { Layout, Menu } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImage from "../../assets/images/logo.png";
import "./AdminLayout.css";
import Header from "../header/Header";
import AppFooter from "../footer/Footer";

const { Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

// Cập nhật menu
const items = [
  getItem("Thống kê", "1", <PieChartOutlined />),
  getItem("Quản lý đặt lịch", "2", <CalendarOutlined />),
  getItem("Quản lý tài khoản", "sub1", <UserOutlined />),
  getItem("Quản lý đơn hàng", "sub2", <StoreOutlined />),
  getItem("Quản lý Portfolio", "9", <PictureInPicture />),
  getItem("Quản lý danh mục", "category", <CategoryOutlined />),
  getItem("Quản lý sản phẩm", "product", <ProductOutlined />),
  getItem("Quản lý mã giảm giá", "discount", <AttachMoneyOutlined />), // Thay thế biểu tượng
];

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout
      className="admin-layout"
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          position: "sticky",
          top: 0,
        }}
      >
        <div
          onClick={() => navigate("/admin")}
          style={{
            cursor: "pointer",
            height: "120px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={logoImage} alt="Logo" className="logo-image" />
        </div>
        <Menu
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onClick={({ key }) => {
            switch (key) {
              case "1":
                navigate("/admin/revenue-report");
                break;
              case "2":
                navigate("/admin/bookings-management");
                break;
              case "sub1":
                navigate("/admin/user-management");
                break;
              case "sub2":
                navigate("/admin/orders-management");
                break;
              case "9":
                navigate("/admin/portfolio-management");
                break;
              case "category":
                navigate("/admin/category-management");
                break;
              case "product":
                navigate("/admin/product-management");
                break;
              case "discount":
                navigate("/admin/discount");
                break;
              default:
                break;
            }
          }}
        />
      </Sider>
      <Layout>
      <Header />
        <div className="content-admin">{children}</div>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
