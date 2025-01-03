import { useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import UploadIcon from "@mui/icons-material/Upload";
import {
  Popconfirm,
  Table,
  Tag,
  Tooltip,
  Modal,
  Form,
  Input,
  Upload,
  Button,
  message,
} from "antd";
import EyeIcon from "@mui/icons-material/Visibility";
import { PlusOutlined } from "@ant-design/icons";
import "./UserManagement.css";
import { usePagination } from "src/hook/usePagination.hook";
import { getListUsers, lockUserService } from "src/services/user.service";
import UploadFile from "src/components/upload-file/upload-file";
import { useNavigate } from "react-router-dom";
import { createLibrary } from "src/services/library.service";

const UserManagement = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [form] = Form.useForm();
  const [filesDetail, setFilesDetail] = useState([]); // Hình ảnh khách hàng
  const [files, setFiles] = useState([]);

  const {
    data: listUsers,
    loading,
    refresh,
  } = usePagination(
    "ListUsers",
    {
      page: page,
      pageSize: pageSize,
    },
    getListUsers
  );

  const columns = [
    {
      title: "Tên đăng nhập",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      align: "center",
      key: "status",
      render: (_, record) => (
        <>
          {record?.status === "active" ? (
            <Tag color="green">Hoạt động</Tag>
          ) : (
            <Tag color="red">Không hoạt động</Tag>
          )}
        </>
      ),
    },
  ];

  const handleConfirmLockUser = async (id) => {
    try {
      const res = await lockUserService(id);
      if (res) {
        refresh();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleUpload = (record) => {
    setCurrentUser(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setCurrentUser(null);
  };

  const handleFinish = async (values) => {
    // // Xử lý dữ liệu từ form tại đây
    // console.log("Thông tin tải lên:", values);
    // message.success("Tải lên thành công!");
    try {
      const res = await createLibrary(
        currentUser?.name,
        values?.category,
        currentUser?.name,
        files
      );
      if (res) {
        message.success("Thêm thư mục hình ảnh khách hàng thành công!");
        handleCancel();
      }
    } catch (error) {
      console.log("error", error);
      message.error("Thêm thư mục hình ảnh khách hàng thất bại!");
    }
  };

  return (
    <div className="user-management-container">
      <h2 className="user-management-title">Quản lý người dùng</h2>

      <Table
        loading={loading}
        columns={[
          {
            title: "Hành động",
            align: "center",
            render: (_, record) => (
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  justifyContent: "space-around",
                }}
              >
                {/* Biểu tượng khóa/mở tài khoản */}
                <Tooltip title={record?.status === "active" ? "Khóa" : "Mở"}>
                  <Popconfirm
                    title={
                      record?.status === "active"
                        ? "Khóa tài khoản"
                        : "Mở tài khoản"
                    }
                    description={
                      record?.status === "active"
                        ? "Bạn có chắc chắn muốn khóa tài khoản này không?"
                        : "Bạn có chắc chắn muốn mở tài khoản này không?"
                    }
                    onConfirm={() => handleConfirmLockUser(record?._id)}
                    okText="Đồng ý"
                    cancelText="Hủy"
                  >
                    <LockIcon
                      style={{
                        cursor: "pointer",
                        width: 20,
                        height: 20,
                        color: "#ff4d4f",
                      }}
                    />
                  </Popconfirm>
                </Tooltip>

                {/* Biểu tượng Upload */}
                <Tooltip title="Tải lên hình ảnh khách hàng">
                  <UploadIcon
                    style={{
                      cursor: "pointer",
                      width: 20,
                      height: 20,
                      color: "#1890ff",
                    }}
                    onClick={() => handleUpload(record)}
                  />
                </Tooltip>
                {/* Biểu tượng Xem chi tiết */}
                <Tooltip title="Xem chi tiết">
                  <EyeIcon
                    style={{
                      cursor: "pointer",
                      width: 20,
                      height: 20,
                      color: "#52c41a",
                    }}
                    onClick={() => {
                      window.open(`/gallery/${record.username}`, "_blank");
                    }}
                  />
                </Tooltip>
              </div>
            ),
            width: 150,
          },
          ...columns,
        ]}
        dataSource={listUsers?.data}
        rowKey="_id"
        pagination={{
          current: page,
          pageSize: pageSize,
          onChange: (page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          },
          total: listUsers?.total,
        }}
      />

      {/* Modal Tải Lên Hình Ảnh */}
      <Modal
        title={`Tải lên hình ảnh cho ${currentUser?.name || "người dùng"}`}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            name="category"
            label="Danh mục"
            rules={[{ required: true, message: "Vui lòng nhập danh mục!" }]}
          >
            <Input placeholder="Nhập danh mục" />
          </Form.Item>

          <UploadFile setFiles={setFiles} files={files} />
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Tải lên
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;
