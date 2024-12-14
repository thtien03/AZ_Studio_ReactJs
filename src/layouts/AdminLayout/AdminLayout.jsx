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
    FileOutlined,
    PieChartOutlined,
    UserOutlined
} from '@ant-design/icons';
import { BrowseGallerySharp, PictureInPicture, StoreOutlined } from '@mui/icons-material';
import { Layout, Menu, theme } from 'antd';
import { useState } from 'react';
import AppFooter from '../footer/Footer';
import Header from '../header/Header';
const {  Content, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('Thống kê', '1', <PieChartOutlined />),
  getItem('Quản lý đặt lịch', '2', <CalendarOutlined />),
  getItem('Quản lý tài khoản ', 'sub1', <UserOutlined />), 
  getItem('Quản lý đơn hàng', 'sub2', <StoreOutlined />, ),
  getItem('Quản lý Portfolio', '9', <PictureInPicture />),
];
const AdminLayout = ({children}) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: '100vh'
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
      <Header />
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>

        </Content>
        <AppFooter />
      </Layout>
    </Layout>
  );
};
export default AdminLayout;