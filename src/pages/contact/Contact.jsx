import React, { useState } from 'react';
import { blue, green, yellow, grey } from '@mui/material/colors';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import './Contact.css';
 import nenContact from '../../assets/images/bg-contact.jpg';

const Contact = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    if (selectedDate < new Date()) {
      alert('Không thể đặt lịch cho ngày đã qua.');
      setDate('');
    } else {
      setDate(e.target.value);
    }
  };

  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;
    const startTime = '09:00';
    const endTime = '22:30';
    if (selectedTime < startTime || selectedTime > endTime) {
      alert('Thời gian đặt lịch chỉ từ 9:00 sáng đến 22:30 tối.');
      setTime('');
    } else {
      setTime(e.target.value);
    }
  };

  return (
    <div className="contact-container">
      {/* Cover Image Section */}
      <div className="cover-image-container">
        <img src={nenContact} alt="Contact Cover" className="cover-image" />
      </div>

      <header>
        <h2>A-Z Studio</h2>
      </header>
      <main>
        <section className="contact-section">
          <div className="contact-info">
            <p>Để lại thông tin của bạn, và A-Z Studio sẽ liên hệ với bạn để chuẩn bị cho hành trình cưới sắp tới.</p>
            <div className="contact-item">
              <div className="icon-wrapper" style={{ backgroundColor: green[500] }}>
                <PhoneIcon className="icon" />
              </div>
              <div>
                <strong>Phone</strong><br />
                0123.322.222
              </div>
            </div>
            <div className="contact-item">
              <div className="icon-wrapper" style={{ backgroundColor: blue[500] }}>
                <EmailIcon className="icon" />
              </div>
              <div>
                <strong>Email</strong><br />
                azstudio@gmail.com
              </div>
            </div>
            <div className="contact-item">
              <div className="icon-wrapper" style={{ backgroundColor: yellow[700] }}>
                <LocationOnIcon className="icon" />
              </div>
              <div>
                <strong>Địa chỉ</strong><br />
                130 Hồ Văn Huế, Phường 9, Quận Phú Nhuận, TP. Hồ Chí Minh
              </div>
            </div>
            <div className="contact-item">
              <div className="icon-wrapper" style={{ backgroundColor: grey[700] }}>
                <AccessTimeIcon className="icon" />
              </div>
              <div>
                <strong>Thời gian hoạt động</strong><br />
                9:00 - 21:30
              </div>
            </div>
          </div>
         <div className='googlemap'> 
         <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4276767170654!2d106.78212887570389!3d10.855040057737428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527006db97ff1%3A0x8ed7036831a229d3!2sHUTECH%20E%202!5e0!3m2!1svi!2s!4v1734205269493!5m2!1svi!2s" ></iframe>
         </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;
