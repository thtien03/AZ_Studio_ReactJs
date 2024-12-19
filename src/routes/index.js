

import CategoryManagement from "src/pages/admin/category-management/category-management";
import ImageDetail from "src/pages/portfolio/ImageDetail";
import About from "../pages/about/About";
import BookingManagement from "../pages/admin/booking-management/BookingManagement";
import ImageStorage from "../pages/admin/image-storage/ImageStorage";
import OrderManagement from "../pages/admin/OrderManagement";
import PortfolioManagement from "../pages/admin/portfolio-management/PortfolioManagement";
import ProductManagement from "../pages/admin/product-management/ProductManagement";
import RevenueReport from "../pages/admin/revenue-report/RevenueReport";
import UserManagement from "../pages/admin/user-management/UserManagement";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Contact from "../pages/contact/Contact";
import DressStyle from "../pages/dress/DressStyle";
import MainContent from "../pages/home/Home";
import Photography from "../pages/portfolio/Photography";
import Album from "../pages/service/Album";
import Pricing from "../pages/service/Pricing";
import Service from "../pages/service/Service";
import ShoppingCart from "../pages/shopping-cart/shoppingcart";
import AlbumManagement from "../pages/admin/portfolio-management/PortfolioManagement";
import { Component } from "react";
import ProductDetail from '../pages/product-detail/ProductDetail';
import DefaultLayout from "src/layouts/DefaultLayout/DefaultLayout";
import Gallery from "src/pages/gallery/Gallery";
import PaymentPage from "src/pages/shopping-cart/PaymentPage";
import { Payment } from "@mui/icons-material";
import PaymentResult from "src/pages/payment/payment-result";
import AdminDiscount from "src/pages/admin/discount-management/discount";
import AdminLayout from "src/layouts/AdminLayout/AdminLayout";




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
    path: "/admin/user-management",
    component: UserManagement,
    layout: "AdminLayout",
  },

  {
    path: "/admin/bookings-management",
    component: BookingManagement,
    layout: "AdminLayout",
  },

  {
    path: "/admin/orders-management",
    component: OrderManagement,
    layout: "AdminLayout",
  },

  {
    path: "/admin/images-storage",
    component: ImageStorage,
    layout: "AdminLayout",
  },


  {
    path: "/admin/portfolio-management",
    component: PortfolioManagement,
    layout: "AdminLayout",
  },

  {
    path: "/admin/revenue-report",
    component: RevenueReport,
    layout: "AdminLayout",
  },
  {
    path: "/admin/product-management",
    component: ProductManagement,
    layout: "AdminLayout",
  },
  {
    path: "/admin/portfolio-management",
    component: PortfolioManagement,
  },
  {
    path: "/shopping-cart/shoppingcart",
    component: ShoppingCart,
  },
  {
    path: "/portfolio/imagedetail",
    component: ImageDetail,
  },

  {
    path: "/admin/category-management",
    component: CategoryManagement,
    layout: "AdminLayout",
  },
  {
    path: "/product-detail/:id",
    component: ProductDetail,layout:DefaultLayout
  },
  {
    path: "/gallery/gallery",
    component: Gallery,
  },

  {
    path: "/shopping-cart/paymentpage",
    component: PaymentPage,
    layout:DefaultLayout
  },


  {
    path: "/payment/payment-result",
    component: PaymentResult,
    layout:DefaultLayout
  },

  {
    path: "/admin/discount",
    component: AdminDiscount,
    layout:"AdminLayout",
  }


  
  
];

const privateRoutes = [];

export { privateRoutes, publicRoutes };
