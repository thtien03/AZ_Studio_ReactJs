// src/pages/admin/portfolio-management/PortfolioManagement.jsx

import { Button, Form, Input, Modal, Select, Table, Upload, message } from 'antd';
import { useEffect, useState } from 'react';
import UploadFile from 'src/components/upload-file/upload-file';
import { deleteCategoryService, getListCategoriesService } from 'src/services/category.service';
import { createProductService, deleteProductService, getListProductsService, getProductService, updateProductService } from 'src/services/product.service';
import './PortfolioManagement.css'; // Giả sử bạn có file CSS
import { deleteFile } from 'src/services/upload.service';

const { Option } = Select;

const PortfolioManagement = () => {
  const [albums, setAlbums] = useState([]);
  const [categories, setCategories] = useState([]);
  
  const [isModalVisible, setIsModalVisible] = useState(false); // Điều khiển Modal
  const [editingAlbum, setEditingAlbum] = useState(null); // Album đang chỉnh sửa
  const [form] = Form.useForm(); // Form cho Modal
  const [files, setFiles] = useState([]); // Hình đại diện
  const [filesDetail, setFilesDetail] = useState([]); // Hình chi tiết

  const [messageApi, contextHolder] = message.useMessage(); // Sử dụng messageApi

  const [editing, setEditing] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      await fetchDataCategories();
      await fetchDataAlbums();
    };
    fetchData();
  }, []);

  const fetchDataAlbums = async () => {
    try {
      const response = await getListProductsService();
      const albumsData = response.data.filter((product) => product.type === "portfolio").map(album => ({
        ...album,
        category: categories.find(cat => cat._id === album.categoryId) || null,
      }));
      console.log(albumsData);
      setAlbums(albumsData);
    } catch (error) {
      console.error(error);
      message.error('Không thể tải dữ liệu albums');
    }
  };

  const fetchDataCategories = async () => {
    try {
      const response = await getListCategoriesService();
      setCategories(response.data);
    } catch (error) {
      console.error(error);
      message.error('Không thể tải dữ liệu danh mục');
    }
  };

  const handleAdd = (record) => {
    setIsModalVisible(true);
    setEditing(record);
    setFiles([]); // Reset files đại diện
    setFilesDetail([]); // Reset files chi tiết
    form.setFieldsValue({
      ...record,
    });
    if(record){
      setFiles([record.bannerImage]);
    }
  };
  

  const handleDelete = async (_id) => {
    try {
      const resDetail = await getProductService(_id);
      const listImages = resDetail?.images || [];
      const imageBanner = resDetail?.bannerImage;
      const allImages = [...listImages, imageBanner].filter(Boolean); 
      
      if (allImages.length > 0) {
        await Promise.all(
          allImages.map(async (pathImage) => {
            const publicIdMatch = pathImage.match(/\/AzStudio\/([^/.]+)\./);
            if (publicIdMatch) {
              const publicId = publicIdMatch[1];
              await deleteFile(publicId);
            }
          })
        );
      }

          const res = await deleteProductService(_id);
          if (res) {
           fetchDataAlbums();
            messageApi.open({
              type: "success",
              content: "Xóa danh mục thành công",
            });
          }
        } catch (error) {
          console.log("error", error);
          messageApi.open({
            type: "error",
            content: "Xóa danh mục thất bại, vui lòng thử lại!",
          });
        }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditing(null)
    form.resetFields();
  };
console.log(files,filesDetail)
const handleFinishForm = async (value) => {
  console.log(editing)
        try {
            let response = null;
            if (editing) {
                response = await updateProductService(editing?._id, { ...value, type: "portfolio", bannerImage: files[0],images:filesDetail });
            } else {
                response = await createProductService({ ...value, type: "portfolio", bannerImage: files[0],images:filesDetail });
            }
            if (response) {
              fetchDataAlbums()
                messageApi.open({
                    type: 'success',
                    content: editing ? 'Cập nhật thành công' : 'Thêm mới thành công',
                });
                setIsModalVisible(false)
            }
        } catch (error) {
            console.log(error)
            messageApi.open({
                type: 'error',
                content:editing ? 'Cập nhật thất bại' : 'Thêm mới thất bại',
            });
        }
    };

  const columns = [
    {
      title: 'ID Album',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Tên Album',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mô Tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Danh Mục',
      dataIndex: 'categoryId',
      key: 'categoryId',
      render: (category) => category ? category.name : 'Không có',
    },
    {
      title: 'Hình Ảnh Đại Diện',
      dataIndex: 'bannerImage', // Đảm bảo `dataIndex` là `bannerImage`
      key: 'bannerImage', // Đặt key tương tự
      render: (text,record) => {console.log(record)
        return (text ? <img src={text} alt="Hình Ảnh Đại Diện" width={179} /> : 'Không có')
      }
        // text ? <img src={text} alt="Hình Ảnh Đại Diện" width={179} /> : 'Không có',
    },
    

    {
      title: 'Thao Tác',
      key: 'actions',
      render: (text, record) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button type="primary" onClick={() => handleAdd(record)}>Sửa</Button>
          <Button danger onClick={() => handleDelete(record._id)}>Xóa</Button>
        </div>
      )
    }
  ];

  return (
    <div>
      {contextHolder} {/* Đặt contextHolder của message ở đây */}
      <h1>Quản lý Album</h1>
      <Button type="primary" onClick={()=>handleAdd()} style={{ marginBottom: '20px' }}>Thêm Album</Button>
      <Table
        columns={columns}
        dataSource={albums}
        rowKey="_id"
        style={{ marginTop: '20px' }}
      />
      
      {/* Modal Thêm/Sửa Album */}
      <Modal
        title={editingAlbum ? "Sửa Album" : "Thêm Album"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null} // Sử dụng footer của Form
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinishForm} // Sử dụng onFinish
          initialValues={editingAlbum || {}}
        >
          <Form.Item
            label="Tên Album"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên album!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mô Tả"
            name="description"
            rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
          >
            <Input />
          </Form.Item>
          
          {/* Chọn Danh Mục */}
          <Form.Item
            label="Danh Mục"
            name="categoryId"
            rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
          >
            <Select placeholder="Chọn danh mục">
              {categories
                .filter((category) => category.type === "portfolio") // Lọc danh mục theo type "portfolio"
                .map((category) => (
                  <Select.Option key={category._id} value={category._id}>
                    {category.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>

          
          {/* Hình Ảnh Đại Diện */}
          <Form.Item
            label="Hình Ảnh Đại Diện"

          >
            <UploadFile
              setFiles={setFiles}
              files={files}
              maxCount={1}
            />
          </Form.Item>

          {/* Hình Ảnh Chi Tiết */}
          <Form.Item
            label="Hình Ảnh Chi Tiết"
          
          >
            <UploadFile
              setFiles={setFilesDetail}
              files={filesDetail}
            />
          </Form.Item>

          {/* Nút Submit và Hủy */}
          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <Button onClick={handleCancel}>Hủy</Button>
              <Button type="primary" htmlType="submit">Lưu</Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PortfolioManagement;
