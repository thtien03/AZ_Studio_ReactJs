import {
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Table,
  Tag,
  message,
} from "antd";
import { useState } from "react";
import { usePagination } from "src/hook/usePagination.hook";
import {
  createCategoryService,
  deleteCategoryService,
  getListCategoriesService,
  updateCategoryService,
} from "src/services/category.service";
import "./category-management.css"; // Import file CSS

const CategoryManagement = () => {
  const [form] = Form.useForm();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [messageApi, contextHolder] = message.useMessage();

  const {
    data: listCategories,
    loading,
    refresh,
  } = usePagination(
    "listCategories",
    {
      page: page,
      pageSize: pageSize,
    },
    getListCategoriesService
  );

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Tên danh mục",
      dataIndex: "name",
    },
    {
      title: "Loại danh mục",
      dataIndex: "type",
      align: "center",
      key: "type",
      render: (_, record) => (
        <>
          {record?.type === "portfolio" ? (
            <Tag color="pink">Portfolio</Tag>
          ) : (
            <Tag color="blue">Sản phẩm</Tag>
          )}
        </>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      align: "center",
      render: (_, record) => (
        <span>
          <Button className="action-button" onClick={() => showModal(record)}>
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
  ];

  const showModal = (record) => {
    setEditingCategory(record)
    setIsModalVisible(true);
    form.setFieldsValue({
      ...record,
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingCategory(null)
    form.resetFields();
  };

  const handleSave = async (values) => {
    try {
      let res;
      if (editingCategory) {
        res = await updateCategoryService(editingCategory._id,values);
      } else {
        res = await createCategoryService(values);
      }
      if (res) {
        refresh();
        setIsModalVisible(false);
        form.resetFields();
        messageApi.open({
          type: "success",
          content: editingCategory
            ? "Cập nhật danh mục thành công"
            : "Tạo danh mục thành công",
        });
      }
    } catch (error) {
      console.log("error", error);
      messageApi.open({
        type: "error",
        content: editingCategory
          ? "Cập nhật danh mục thất bại, vui lòng thử lại!"
          : "Tạo danh mục thất bại, vui lòng thử lại!",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteCategoryService(id);
      if (res) {
        refresh();
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

  return (
    <div>
      {contextHolder}
      <Button type="primary" onClick={() => showModal()}>
        Thêm danh mục
      </Button>
      <Table
        className="category-table"
        columns={columns}
        dataSource={listCategories?.data}
        rowKey="id"
        loading={loading}
        pagination={{
          current: page,
          pageSize: pageSize,
          total: listCategories?.total,
          onChange: (current, size) => {
            setPage(current);
            setPageSize(size);
          },
        }}
      />

      <Modal
        title={editingCategory ? "Chỉnh sửa danh mục" : "Thêm danh mục"}
        open={isModalVisible}
        centered
        onCancel={handleCancel}
        footer={null}
      >
        <Form initialValues={editingCategory} onFinish={handleSave} form={form}>
          <Form.Item
            name="name"
            label="Tên danh mục"
            rules={[{ required: true, message: "Vui lòng nhập tên danh mục!" }]}
          >
            <Input placeholder="Tên danh mục" style={{ height: "30px" }} />
          </Form.Item>
          <Form.Item
            name="type"
            label="Loại danh mục"
            rules={[
              { required: true, message: "Vui lòng nhập loại danh mục!" },
            ]}
          >
            <Select
              placeholder="Chọn loại danh mục"
              allowClear
              options={[
                { value: "portfolio", label: "Portfolio" },
                { value: "product", label: "Sản phẩm" },
              ]}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingCategory ? "Cập nhật" : "Thêm"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoryManagement;
