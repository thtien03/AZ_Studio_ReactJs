import React, { useState, useEffect } from 'react';
import { Table, Card, Row, Col, DatePicker } from 'antd';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './RevenueReport.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RevenueReport = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [setSelectedDate] = useState(null);

  useEffect(() => {
    const mockRevenueData = [
      {
        id: 1,
        date: '20/02/2024',
        service: 'Chụp ảnh cưới',
        revenue: 15000000,
        numberOfBookings: 3,
      },
      {
        id: 2,
        date: '21/02/2024',
        service: 'Chụp ảnh kỷ yếu',
        revenue: 8000000,
        numberOfBookings: 2,
      },
      {
        id: 3,
        date: '22/02/2024',
        service: 'Chụp ảnh gia đình',
        revenue: 5000000,
        numberOfBookings: 1,
      },
    ];
    setRevenueData(mockRevenueData);
  }, []);

  const columns = [
    {
      title: 'Ngày',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Dịch vụ',
      dataIndex: 'service',
      key: 'service',
    },
    {
      title: 'Doanh thu',
      dataIndex: 'revenue',
      key: 'revenue',
      render: (revenue) => `${revenue.toLocaleString('vi-VN')}đ`,
    },
    {
      title: 'Số lượng đặt lịch',
      dataIndex: 'numberOfBookings',
      key: 'numberOfBookings',
    },
  ];

  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
  const totalBookings = revenueData.reduce((sum, item) => sum + item.numberOfBookings, 0);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const chartData = {
    labels: revenueData.map((data) => data.date),
    datasets: [
      {
        label: 'Doanh thu',
        data: revenueData.map((data) => data.revenue),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        barThickness: 40, // Đặt độ rộng của các cột
        maxBarThickness: 50, // Giới hạn độ rộng tối đa của cột
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          maxRotation: 45, // Giảm góc xoay của nhãn để các nhãn gần nhau hơn
          minRotation: 45,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value.toLocaleString('vi-VN')}đ`,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  return (
    <div className="booking-management-container">
      <h2 className="booking-management-title">Báo Cáo Doanh Thu</h2>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Card>
            <h3>Tổng doanh thu</h3>
            <p style={{ fontSize: 24, fontWeight: 'bold' }}>
              {totalRevenue.toLocaleString('vi-VN')}đ
            </p>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <h3>Tổng số đặt lịch</h3>
            <p style={{ fontSize: 24, fontWeight: 'bold' }}>{totalBookings}</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <h3>Chọn ngày</h3>
            <DatePicker
              onChange={handleDateChange}
              style={{ width: '100%' }}
              format="DD/MM/YYYY"
            />
          </Card>
        </Col>
      </Row>

      {/* Biểu đồ doanh thu */}
      <div className="chart-container">
        <Card>
          <h3>Biểu đồ Doanh Thu</h3>
          <div className="bar-chart">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </Card>
      </div>

      {/* Bảng dữ liệu doanh thu */}
      <Table
        columns={columns}
        dataSource={revenueData}
        pagination={false}
        className="revenue-table"
      />
    </div>
  );
};

export default RevenueReport;
