import React from 'react';
import { Link } from 'react-router-dom';


const Service = () => {
    return (
        <div className="service-dropdown">
            <h2>Dịch vụ</h2>
            <ul>
                <li><Link to="/service/pricing">Bảng giá</Link></li>
                <li><Link to="/service/album">Chụp Album Cưới</Link></li>
            </ul>
        </div>
    );
};

export default Service;
