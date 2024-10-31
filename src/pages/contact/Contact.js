import React, { useState } from 'react';
import { blue, green, yellow, grey } from '@mui/material/colors';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import './Contact.css';
import coverImage from '../../assets/images/Nen-contact.jpg';

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
        <img src={coverImage} alt="Contact Cover" className="cover-image" />
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
          <form className="booking-form">
            <div className="form-group">
              <input type="text" placeholder="Nhập tên của bạn" required />
            </div>
            <div className="form-group">
              <input type="tel" placeholder="Nhập số điện thoại" required />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Nhập email" required />
            </div>
            <div className="form-group">
              <input type="date" value={date} onChange={handleDateChange} required />
            </div>
            <div className="form-group">
              <input type="time" value={time} onChange={handleTimeChange} required />
            </div>
            <div className="form-group">
              <textarea placeholder="Nhập ghi chú" rows="4"></textarea>
            </div>
            <button type="submit" className="submit-btn">Gửi</button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Contact;
