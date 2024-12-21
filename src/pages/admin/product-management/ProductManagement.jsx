// src/pages/admin/productManagement.jsx
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select,Popconfirm, DatePicker, message } from 'antd';
import moment from 'moment';
import './ProductManagement.css';
import {
  createProductService,
  deleteProductService,
  updateProductService,
  getListProductsService,
} from "src/services/product.service";
import { usePagination } from "src/hook/usePagination.hook";
import { getListCategoriesService } from 'src/services/category.service';


const ProductManagement = () => {
  const [products, setProduct] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingproduct, setEditingproduct] = useState(null);
  const [form] = Form.useForm();
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [setId, setID] = useState(0);

    const {
      data: listProducts,
      loading,
      refresh,
    } = usePagination(
      "listProducts",
      {
        page: page,
        pageSize: pageSize,
      },
      getListProductsService
    );

    const {
      data: listCategories,
    
    } = usePagination(
      "listCategories",
      {
        page: 1,
      },
      getListCategoriesService
    );

    const showAddModal = () => {
      setEditingproduct(null);
      form.resetFields();
      setIsModalVisible(true);
    };

  const handleAddNewProduct = async (values) => {
    try {
      console.log(values);
      const res = await createProductService(values);
      console.log(res);
      message.success('Thêm sản phẩm thành công');
      setIsModalVisible(false);
      form.resetFields();
      refresh();
    } catch (error) {
      message.error('Có lỗi xảy ra khi thêm sản phẩm');
    }
  };


  
  const handleEditShowModal = (product) => {
    setID(product._id);
    setEditingproduct(product);
    setIsModalVisible(true);
    form.setFieldsValue({
      ...product,
      categoryId: product.categoryId?._id,
    });
  };

  const handleEditProduct = async (values) => {
    try {
      const res = await updateProductService(setId, values);
      if (res) {
        message.success('Cập nhật sản phẩm thành công');
        setIsModalVisible(false);
        form.resetFields();
        refresh();
      }
    } catch (error) {
      message.error('Có lỗi xảy ra khi cập nhật sản phẩm');
    }
  };

  const handleDelete = (id) => {
    try {
      deleteProductService(id);
      refresh();
      message.success('Xóa sản phẩm thành công');
      refresh();
    } catch (error) {
      message.error('Có lỗi xảy ra khi xóa sản phẩm');
    }
  };



  const filteredProducts = products.filter(product =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="product-management-container">
      <h2 className="product-management-title">Quản Lý Sản Phẩm</h2>
      
      <div style={{ position: 'relative' }}>
        <Input
          placeholder="Tìm kiếm sản phẩm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginBottom: '20px' }}
        />
       
        {suggestions.length > 0 && (
          <div className="suggestion-list">
            {suggestions.map((product) => (
              <div
                key={product?.id}
                className="suggestion-item"
                // onClick={() => handleSuggestionClick(product.productName)}
              >
                {product.productName}
              </div>
            ))}
          </div>
        )}
      </div>
      
        <Button 
          type="primary" 
          onClick={showAddModal} 
          style={{ marginBottom: '20px' }}
        >
          Thêm sản phẩm mới
        </Button>
      
      {/* <Table columns={columns} dataSource={listProducts} /> */}
      <Table
        columns={[
          {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
          },
          {
            title: 'Loại',
            dataIndex: 'type',
            key: 'type',
          },
          {
            title: 'Danh mục',
            dataIndex: ['categoryId', 'name'],
            key: 'categoryId',
          },
          {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
              <span>
              <Button className="action-button" onClick={() => handleEditShowModal(record) }>
                Sửa
              </Button>
              <Popconfirm
                title="Bạn có chắc muốn xóa?"
                onConfirm={() => handleDelete(record?._id)}
              >
                <Button className="action-button" danger>
                  Xóa
                </Button>
              </Popconfirm>
            </span>
            ),
          },
        ]} 
        dataSource={listProducts?.data}
        loading={loading}
        pagination={{
          total: listProducts?.total,
          pageSize: pageSize,
          current: page,
          onChange: (page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          }
        }}
      />

      <Modal
        title={editingproduct ?  "Chỉnh sửa thông tin sản phẩm" : "Thêm sản phẩm mới"}
        visible={isModalVisible}
        onOk={editingproduct ? handleEditProduct : handleAddNewProduct}
        footer={false}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setEditingproduct(null);
        }}
      >
    <Form initialValues={editingproduct} onFinish={ editingproduct ?handleEditProduct :handleAddNewProduct } form={form} layout="vertical">
      <Form.Item
        name="name"
        label="Tên sản phẩm"
        rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="description"
        label="Mô tả"
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        name="images"
        label="Hình ảnh"
      >
        <Input placeholder="URL hình ảnh" />
      </Form.Item>

      <Form.Item
        name="categoryId"
        label="Danh mục"
        rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
      >
        <Select placeholder="Chọn danh mục">
          {listCategories?.data?.map((category) => (
            <Select.Option key={category?._id} value={category?._id}>
              {category?.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="price"
        label="Giá"
        rules={[{ required: true, message: 'Vui lòng nhập giá' }]}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item
        name="type"
        label="Loại"
        rules={[{ required: true, message: 'Vui lòng chọn loại' }]}
      >
        <Select placeholder="Chọn loại">
          <Select.Option value="portfolio">Portfolio</Select.Option>
          <Select.Option value="product">Product</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="bannerImage"
        label="Ảnh banner"
      >
        <Input placeholder="URL ảnh banner" />
      </Form.Item>

      <Form.Item
        name="size"
        label="Kích thước"
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="detail"
        label="Chi tiết"
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingproduct ? "Cập nhật" : "Thêm"}
            </Button>
          </Form.Item>
    </Form>
      </Modal>
    </div>
  );
};

export default ProductManagement;
