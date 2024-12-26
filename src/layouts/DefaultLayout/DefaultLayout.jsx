import './defaultlayout.css';
import AppFooter from '../footer/Footer';
import Header from '../header/Header';
import FloatingBookingButton from '../../components/FloatingBookingButton/FloatingBookingButton';

function DefaultLayout({ children }) {
  return (
    <div className={'wrapper-default'}>
      <Header />
      <div className="container-client">
        <div className={'content'}>{children}</div>
        <FloatingBookingButton />
      </div>
      <AppFooter />
    </div>
  );
}

export default DefaultLayout;