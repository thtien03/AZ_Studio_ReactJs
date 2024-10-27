import './defaultlayout.css';
import AppFooter from '../footer/Footer';
import Header from '../header/Header';
function DefaultLayout({ children }) {
//   const user = useSelector((state) => state.auth.login.currentUser);
//   const navigate = useNavigate();
//   const refreshTokenStudent = Cookies.get('refreshTokenStudent');
//   useEffect(() => {
//     if (!refreshTokenStudent || !user) {
//       navigate('/login');
//     }
//   }, []);

  return (
    <div className={'wrapper-default'}>
      <Header />
      <div className="container-client">
        {/* <Sidebar /> */}
        <div className={'content'}>{children}</div>
      </div>
      <AppFooter />
    </div>
  );
}

export default DefaultLayout;