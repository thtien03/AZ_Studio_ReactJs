import React, { useState } from 'react';
import { Button } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import ModalAppointment from '../../pages/home/components/ModalAppointment/ModalAppointment';
import './FloatingBookingButton.css';

const FloatingBookingButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        type="primary"
        icon={<CalendarOutlined />}
        className="floating-booking-button"
        onClick={() => setIsModalOpen(true)}
      >
        ĐặT HẸN
      </Button>

      <ModalAppointment 
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default FloatingBookingButton;