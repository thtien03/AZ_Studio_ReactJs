import MainContent from "../pages/home/Home";
import Service from "../pages/service/Service";


const publicRoutes = [
  {
    path: '/',
    component: MainContent,
  },


  {
    path: '/service',
    component: Service,
  },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
