import React, { useState } from "react";
import { Badge, Modal, List, Select, Tag } from "antd";
import { BellOutlined } from "@ant-design/icons";
import "./NotificationBell.css";
import NotificationDetail from "./NotificationDetail"; // Component hiển thị chi tiết thông báo

const { Option } = Select;

const NotificationBell = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filter, setFilter] = useState("all");
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Đơn hàng của bạn đã được xác nhận.", isRead: true, time: "2024-12-19T08:00:00" },
    { id: 2, message: "Đơn hàng của bạn đang được giao.", isRead: false, time: "2024-12-19T10:00:00" },
    { id: 3, message: "Đơn hàng đã được giao thành công.", isRead: false, time: "2024-12-18T15:30:00" },
  ]);

  const handleOpenModal = (e) => {
    e.stopPropagation(); // Ngăn chặn click event ảnh hưởng bên ngoài
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const handleNotificationClick = (notification) => {
    // Đánh dấu thông báo là đã đọc
    setNotifications((prevNotifications) =>
      prevNotifications.map((n) =>
        n.id === notification.id ? { ...n, isRead: true } : n
      )
    );
    setSelectedNotification(notification); // Gán thông báo được chọn
  };

  const handleCloseDetail = () => {
    setSelectedNotification(null);
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "all") return true;
    return filter === "read" ? n.isRead : !n.isRead;
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
      onClick={(e) => e.stopPropagation()} // Ngăn chặn click ảnh hưởng parent
    >
      {/* Badge hiển thị số thông báo chưa đọc */}
      <Badge count={unreadCount} offset={[10, 0]}>
        <BellOutlined
          style={{ fontSize: "20px", cursor: "pointer" }}
          onClick={handleOpenModal}
        />
      </Badge>

      {/* Modal hiển thị danh sách thông báo */}
      <Modal
        title="Thông Báo"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
        className="notification-modal"
      >
        {/* Bộ lọc thông báo */}
        <div className="filter-container">
          <Select
            defaultValue="all"
            onChange={handleFilterChange}
            style={{ width: "100%", marginBottom: "10px" }}
          >
            <Option value="all">Tất cả</Option>
            <Option value="read">Đã xem</Option>
            <Option value="unread">Chưa xem</Option>
          </Select>
        </div>

        {/* Danh sách thông báo */}
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

      {/* Hiển thị chi tiết thông báo */}
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
