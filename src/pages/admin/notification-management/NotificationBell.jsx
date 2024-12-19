import React, { useState } from "react";
import { Badge } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { Modal, List, Select, Tag } from "antd";
import "./NotificationBell.css";
import NotificationDetail from "./NotificationDetail"; // Import detail component

const { Option } = Select;

const NotificationBell = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filter, setFilter] = useState("all");
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Thông báo 1: Đơn hàng của bạn đã được xác nhận.", isRead: true, time: "2024-12-19T08:00:00" },
    { id: 2, message: "Thông báo 2: Đơn hàng của bạn đang được giao.", isRead: false, time: "2024-12-19T10:00:00" },
    { id: 3, message: "Thông báo 3: Đơn hàng đã được giao thành công.", isRead: false, time: "2024-12-18T15:30:00" },
  ]);

  const handleOpenModal = (e) => {
    e.stopPropagation(); // Ngăn chặn sự kiện click lan rộng
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const handleNotificationClick = (notification) => {
    // Mark notification as read
    setNotifications((prevNotifications) =>
      prevNotifications.map((n) =>
        n.id === notification.id ? { ...n, isRead: true } : n
      )
    );
    setSelectedNotification(notification); // Set the selected notification
  };

  const handleCloseDetail = () => {
    setSelectedNotification(null); // Clear selected notification
  };

  const unreadCount = notifications.filter((notification) => !notification.isRead).length;

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "all") return true;
    return filter === "read" ? notification.isRead : !notification.isRead;
  });

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation(); // Ngăn chặn sự kiện click dẫn tới điều hướng
      }}
    >
      <Badge count={unreadCount} offset={[10, 0]}>
        <BellOutlined
          style={{ fontSize: "20px", cursor: "pointer" }}
          onClick={handleOpenModal}
        />
      </Badge>
      <Modal
        title="Thông Báo"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
        className="notification-modal"
        onClick={(e) => e.stopPropagation()} // Ngăn chặn click trên modal lan rộng
      >
        <div className="filter-container">
          <Select
            defaultValue="all"
            onChange={(value) => handleFilterChange(value)}
            style={{ width: "100%", marginBottom: "10px" }}
          >
            <Option value="all">Tất cả</Option>
            <Option value="read">Đã xem</Option>
            <Option value="unread">Chưa xem</Option>
          </Select>
        </div>
        <List
          dataSource={filteredNotifications}
          renderItem={(item) => (
            <List.Item key={item.id} onClick={() => handleNotificationClick(item)}>
              <List.Item.Meta
                description={
                  <div>
                    <span>{item.message}</span>
                    <br />
                    <Tag color={item.isRead ? "green" : "red"} style={{ marginTop: "5px" }}>
                      {item.isRead ? "Đã xem" : "Chưa xem"}
                    </Tag>
                    <div className="notification-time" style={{ marginTop: "5px", fontSize: "12px", color: "#888" }}>
                      {formatDateTime(item.time)}
                    </div>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </Modal>
      {selectedNotification && (
        <NotificationDetail
          notification={selectedNotification}
          onClose={handleCloseDetail}
        />
      )}
    </div>
  );
};

export default NotificationBell;
