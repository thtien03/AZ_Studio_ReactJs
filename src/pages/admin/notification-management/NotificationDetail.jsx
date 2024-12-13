import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const NotificationDetail = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [notification, setNotification] = useState(null);

  // Giả lập dữ liệu thông báo
  const mockNotifications = [
    {
      id: 1,
      type: 'booking',
      title: 'Thông báo đặt lịch',
      content: 'Nguyễn Văn A đã đặt lịch chụp ảnh cưới vào ngày 15/12/2024.',
      time: '5 phút trước',
      details: {
        name: 'Nguyễn Văn A',
        phone: '0123456789',
        email: 'nguyenvana@gmail.com',
        date: '15/12/2024',
        time: '10:00 AM',
        notes: 'Chụp tại studio chính.',
      },
    },
    {
      id: 2,
      type: 'order',
      title: 'Thông báo đơn hàng',
      content: 'Đơn hàng mới từ Trần Thị B đã được đặt thành công.',
      time: '10 phút trước',
      details: {
        name: 'Trần Thị B',
        phone: '0987654321',
        email: 'tranthib@gmail.com',
        orderItems: ['Váy cưới kiểu A', 'Phụ kiện tóc'],
        totalPrice: '5,000,000 VND',
        notes: 'Giao hàng trước ngày 20/12/2024.',
      },
    },
  ];

  useEffect(() => {
    // Tìm thông báo theo ID
    const foundNotification = mockNotifications.find(
      (n) => n.id === parseInt(id)
    );
    setNotification(foundNotification);
  }, [id]);

  // Nếu không tìm thấy thông báo
  if (!notification) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Không tìm thấy thông báo</h2>
        <p>ID thông báo: {id}</p>
      </div>
    );
  }

  // Hiển thị chi tiết thông báo
  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>{notification.title}</h2>
      <p>{notification.content}</p>
      <p>
        <strong>Thời gian:</strong> {notification.time}
      </p>

      {notification.type === 'booking' && (
        <div>
          <h3>Thông tin đặt lịch</h3>
          <p>
            <strong>Tên khách hàng:</strong> {notification.details.name}
          </p>
          <p>
            <strong>Số điện thoại:</strong> {notification.details.phone}
          </p>
          <p>
            <strong>Email:</strong> {notification.details.email}
          </p>
          <p>
            <strong>Ngày:</strong> {notification.details.date}
          </p>
          <p>
            <strong>Giờ:</strong> {notification.details.time}
          </p>
          <p>
            <strong>Ghi chú:</strong> {notification.details.notes}
          </p>
        </div>
      )}

      {notification.type === 'order' && (
        <div>
          <h3>Thông tin đơn hàng</h3>
          <p>
            <strong>Tên khách hàng:</strong> {notification.details.name}
          </p>
          <p>
            <strong>Số điện thoại:</strong> {notification.details.phone}
          </p>
          <p>
            <strong>Email:</strong> {notification.details.email}
          </p>
          <p>
            <strong>Danh sách sản phẩm:</strong>{' '}
            {notification.details.orderItems.join(', ')}
          </p>
          <p>
            <strong>Tổng giá:</strong> {notification.details.totalPrice}
          </p>
          <p>
            <strong>Ghi chú:</strong> {notification.details.notes}
          </p>
        </div>
      )}
    </div>
  );
};

export default NotificationDetail;
