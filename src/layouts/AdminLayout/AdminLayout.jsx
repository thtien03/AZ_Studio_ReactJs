// import React from 'react';
// import { Layout, Menu } from 'antd';
// import { Link } from 'react-router-dom';
// import { UserOutlined, FileTextOutlined, ShoppingCartOutlined, PictureOutlined, BarChartOutlined } from '@ant-design/icons';
// import './Dashboard.css';

// const { Sider } = Layout;

// const AdminLayout = () => {
//   return (
//     <Layout style={{ minHeight: '100vh' }}>
//       {/* Sidebar */}
//       <Sider width={200} className="site-layout-background">
//         <Menu
//           mode="inline"
//           defaultSelectedKeys={['1']}
//           style={{ height: '100%', borderRight: 0 }}
//         >
//           <Menu.Item key="1" icon={<UserOutlined />}>
//             <Link to="/admin/user-management">User Management</Link>
//           </Menu.Item>
//           <Menu.Item key="2" icon={<FileTextOutlined />}>
//             <Link to="/admin/bookings-management">Booking Management</Link>
//           </Menu.Item>
//           <Menu.Item key="3" icon={<ShoppingCartOutlined />}>
//             <Link to="/admin/orders-management">Order Management</Link>
//           </Menu.Item>
//           <Menu.Item key="4" icon={<PictureOutlined />}>
//             <Link to="/admin/images-storage">Image Storage</Link>
//           </Menu.Item>
//           <Menu.Item key="5" icon={<BarChartOutlined />}>
//             <Link to="/admin/revenue-report">Revenue Report</Link>
//           </Menu.Item>
//         </Menu>
//       </Sider>

//     </Layout>
//   );
// };

// export default AdminLayout;
import {
  CalendarOutlined,
  PieChartOutlined,
  ProductOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Category,
  CategoryOutlined,
  PictureInPicture,
  StoreOutlined,
} from "@mui/icons-material";
import { Layout, Menu } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImage from "../../assets/images/logo.png";
import AppFooter from "../footer/Footer";
import Header from "../header/Header";
import "./AdminLayout.css";
import ProductDashboard from "src/pages/admin/product-management/ProductManagement";

const { Content, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Thống kê", "1", <PieChartOutlined />),
  getItem("Quản lý đặt lịch", "2", <CalendarOutlined />),
  getItem("Quản lý tài khoản ", "sub1", <UserOutlined />),
  getItem("Quản lý đơn hàng", "sub2", <StoreOutlined />),
  getItem("Quản lý Portfolio", "9", <PictureInPicture />),
  getItem("Quản lý danh mục", "category", <CategoryOutlined />),
  getItem("Quản lý sản phẩm", "product", <ProductOutlined />),
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
          onClick={() => navigate("/user-management")}
          style={{
            cursor: "pointer",
            height: "120px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={logoImage} alt="A-Z Studio" className="logo-image" />
        </div>
        <Menu
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onClick={({ key }) => {
            switch (key) {
              case "1":
                // navigate("/admin/statistics");
                navigate("/admin/bookings-management");
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
              default:
                break;
            }
          }}
        />
      </Sider>
      <Layout>
        <Header />
        <div className="content-admin">{children}</div>
        {/* <AppFooter /> */}
      </Layout>
    </Layout>
  );
};
export default AdminLayout;
