import MainContent from "../pages/home/Home";
import Service from "../pages/service/Service";
import Contact from "../pages/contact/Contact";
import Pricing from "../pages/service/Pricing";
import Album from "../pages/service/Album";
import Photography from "../pages/portfolio/Photography";
import DressStyle from "../pages/dress/DressStyle";
import About from "../pages/about/About";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Dashboard from "../pages/admin/Dashboard";
import UserManagement from "../pages/admin/user-management/UserManagement";
import BookingManagement from "../pages/admin/booking-management/BookingManagement";
import OrderManagement from "../pages/admin/OrderManagement";
import ImageStorage from "../pages/admin/image-storage/ImageStorage";
import RevenueReport from "../pages/admin/revenue-report/RevenueReport";
import ProductManagement from "../pages/admin/product-management/ProductManagement";
import PortfolioManagement from "../pages/admin/portfolio-management/PortfolioManagement";
import ShoppingCart from "../pages/shopping-cart/shoppingcart";
import AddProduct from "../pages/admin/add-product/AddProduct";
import NotificationBell from "../pages/admin/notification-management/NotificationBell";
import NotificationDetail from "../pages/admin/notification-management/NotificationDetail"; 


const publicRoutes = [
  {
    path: "/",
    component: MainContent,
  },

  {
    path: "/about",
    component: About,
  },

  {
    path: "/service",
    component: Service,
  },

  {
    path: "/service/pricing",
    component: Pricing,
  },
  {
    path: "/service/album",
    component: Album,
  },
  {
    path: "/contact",
    component: Contact,
  },

  {
    path: "/portfolio/photography",
    component: Photography,
  },

  {
    path: "/dress-style",
    component: DressStyle,
  },

  {
    path: "/auth/login",
    component: Login,
  },

  {
    path: "/auth/register",
    component: Register,
  },

  {
    path: "/auth/forgot-password",
    component: ForgotPassword,
  },

  {
    path: "/admin",
    component: Dashboard,
  },

  {
    path: "/admin/user-management",
    component: UserManagement,
  },

  {
    path: "/admin/bookings-management",
    component: BookingManagement,
  },

  {
    path: "/admin/orders-management",
    component: OrderManagement,
  },

  {
    path: "/admin/images-storage",
    component: ImageStorage,
  },

  {
    path: "/admin/revenue-report",
    component: RevenueReport,
  },
  {
    path: "/admin/product-management",
    component: ProductManagement,
  },
  {
    path: "/admin/portfolio-management",
    component: PortfolioManagement,
  },
  {
    path: "/admin/notifications",
    component: NotificationBell,
  },
  {
    path: "/admin/notifications/:id", 
    component: NotificationDetail,
  },
  {
    path: "/admin/add-product",
    component: AddProduct,
  },
  {
    path: "/shopping-cart/shoppingcart",
    component: ShoppingCart,
  },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
