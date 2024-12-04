import React, { useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';
import { styled } from '@mui/system';

// Cấu hình bảng
const StyledTableCell = styled(TableCell)({
  backgroundColor: '#f1f1f1',
  fontWeight: 'bold',
});

const ProductManagement = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Sản phẩm A", category: "Áo", image: "image1.jpg", detailsImage: "details1.jpg", quantity: 10 },
    { id: 2, name: "Sản phẩm B", category: "Quần", image: "image2.jpg", detailsImage: "details2.jpg", quantity: 5 }
  ]);

  const handleAdd = () => {
    // Logic để thêm sản phẩm mới
  };

  const handleEdit = (id) => {
    // Logic để sửa sản phẩm
  };

  const handleDelete = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <div>
      <h1>Quản lý Sản Phẩm</h1>
      <Button variant="contained" color="primary" onClick={handleAdd}>Thêm Sản Phẩm</Button>
      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>ID Sản Phẩm</StyledTableCell>
              <StyledTableCell>Tên Sản Phẩm</StyledTableCell>
              <StyledTableCell>Danh Mục</StyledTableCell>
              <StyledTableCell>Hình Ảnh Đại Diện</StyledTableCell>
              <StyledTableCell>Hình Ảnh Chi Tiết</StyledTableCell>
              <StyledTableCell>Số Lượng</StyledTableCell>
              <StyledTableCell>Thao Tác</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map(product => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell><img src={product.image} alt="avatar" width={50} /></TableCell>
                <TableCell><img src={product.detailsImage} alt="details" width={50} /></TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="secondary" onClick={() => handleEdit(product.id)}>Sửa</Button>
                  <Button variant="outlined" color="error" onClick={() => handleDelete(product.id)}>Xóa</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProductManagement;
