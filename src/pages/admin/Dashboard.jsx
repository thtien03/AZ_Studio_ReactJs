import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>Admin Dashboard</h1>
      <ul>
        <li><Link to="/admin/user-management">User Management</Link></li>
        <li><Link to="/admin/bookings-management">Booking Management</Link></li>
        <li><Link to="/admin/orders-management">Order Management</Link></li>
        <li><Link to="/admin/images-storage">Image Storage</Link></li> 
        <li><Link to="/admin/revenue-report">Revenue Report</Link></li>
      </ul>
    </div>
  );
};

export default Dashboard;
