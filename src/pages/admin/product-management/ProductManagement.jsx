// src/pages/admin/ProductDashboard.jsx
import React, { useState } from 'react';
import { Button, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import AddProduct from '../add-product/AddProduct'; 
import './ProductManagement.css';

const ProductDashboard = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 
'Sản phẩm A', category: 'Áo', image: 'image1.jpg', detailsImage: ['details1.jpg'], quantity: 10 },
    { id: 2, name: 'Sản phẩm B', category: 'Quần', image: 'image2.jpg', detailsImage: ['details2.jpg'], quantity: 5 },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddProduct = (product) => {
    setProducts([...products, product]);
  };

  return (
    <div className="product-dashboard">
      <h1>Quản lý Sản Phẩm</h1>
      <Button variant="contained" color="primary" onClick={() => setIsModalVisible(true)} style={{ marginBottom: '20px' }}>
        Thêm Sản Phẩm
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Tên Sản Phẩm</strong></TableCell>
              <TableCell><strong>Danh Mục</strong></TableCell>
              <TableCell><strong>Hình Ảnh</strong></TableCell>
              <TableCell><strong>Số Lượng</strong></TableCell>
              <TableCell><strong>Thao Tác</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map(product => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <img src={product.image} alt={product.name} style={{ width: '50px', height: '50px' }} />
                </TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" style={{ marginRight: '10px' }}>
                    Sửa
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={() => setProducts(products.filter(p => p.id !== product.id))}>
                    Xóa
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AddProduct
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onAddProduct={handleAddProduct}
      />
    </div>
  );
};

export default ProductDashboard;
