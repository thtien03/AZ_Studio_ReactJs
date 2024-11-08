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

const publicRoutes = [
  {
    path: '/',
    component: MainContent,
  },

  {
    path: '/about',
    component: About,
  },

  {
    path: '/service',
    component: Service,
  },
  
  {
    path: '/service/pricing',
    component: Pricing,
  },
  {
    path: '/service/album',
    component: Album,
  },
  {
    path: '/contact',
    component: Contact,
  },

  {
    path: '/portfolio/photography',
    component: Photography,
  },

  {
    path: '/dress-style',
    component: DressStyle,
  },

  {
    path: '/auth/login',
    component: Login,
  },

  {
    path: '/auth/register',
    component: Register,
  },

  {
    path: '/auth/forgot-password',
    component: ForgotPassword,
  },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
