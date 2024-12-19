import React from "react";
import { Modal } from "antd";

const NotificationDetail = ({ notification, onClose }) => {
  return (
    <Modal
      title="Chi Tiết Thông Báo"
      visible={!!notification}
      onCancel={onClose}
      footer={null}
    >
      <p><strong>Nội dung:</strong> {notification.message}</p>
      <p><strong>Thời gian:</strong> {new Date(notification.time).toLocaleString()}</p>
      <p><strong>Trạng thái:</strong> {notification.isRead ? "Đã xem" : "Chưa xem"}</p>
    </Modal>
  );
};

export default NotificationDetail;