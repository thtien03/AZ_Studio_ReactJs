import React, { useState, useEffect } from 'react';
import { Badge, Popover, List, Typography, Button } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './NotificationBell.css';

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]); // Danh sách thông báo
  const [unreadCount, setUnreadCount] = useState(0); // Số lượng thông báo chưa đọc
  const navigate = useNavigate(); // Khởi tạo useNavigate

  // Giả lập dữ liệu thông báo
  useEffect(() => {
    const mockNotifications = [
      {
        id: 1,
        type: 'booking',
        message: 'Nguyễn Văn A đã đặt lịch chụp ảnh cưới',
        time: '5 phút trước',
        read: false,
      },
      {
        id: 2,
        type: 'order',
        message: 'Đơn hàng mới từ Trần Thị B',
        time: '10 phút trước',
        read: false,
      },
    ];
    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter((n) => !n.read).length);
  }, []);

  // Xử lý khi nhấn vào thông báo
  const handleNavigate = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    ); // Đánh dấu thông báo là đã đọc
    setUnreadCount((prev) => Math.max(0, prev - 1)); // Giảm số lượng thông báo chưa đọc
    console.log(`Navigating to /admin/notifications/${id}`); // Kiểm tra log
    navigate(`/admin/notifications/${id}`); // Điều hướng đến trang chi tiết
  };

  // Đánh dấu tất cả là đã đọc
  const handleReadAll = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
    setUnreadCount(0);
  };

  // Nội dung hiển thị trong Popover
  const content = (
    <div className="notification-container">
      <div className="notification-header">
        <Typography.Text strong>Thông báo</Typography.Text>
        {unreadCount > 0 && (
          <Button type="link" onClick={handleReadAll}>
            Đánh dấu tất cả đã đọc
          </Button>
        )}
      </div>
      <List
        className="notification-list"
        itemLayout="horizontal"
        dataSource={notifications}
        renderItem={(item) => (
          <List.Item
            className={`notification-item ${!item.read ? 'unread' : ''}`}
            onClick={() => handleNavigate(item.id)} // Chuyển hướng khi nhấn vào thông báo
          >
            <List.Item.Meta title={item.message} description={item.time} />
          </List.Item>
        )}
      />
    </div>
  );

  return (
    <div style={{ marginLeft: 'auto' }}>
      <Popover
        content={content}
        trigger="click"
        placement="bottomRight"
        overlayClassName="notification-popover"
      >
        <Badge count={unreadCount} className="notification-badge">
          <BellOutlined className="notification-icon" />
        </Badge>
      </Popover>
    </div>
  );
};

export default NotificationBell;
