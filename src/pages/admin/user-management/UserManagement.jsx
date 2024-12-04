import BorderColorIcon from "@mui/icons-material/BorderColor";
import LockIcon from "@mui/icons-material/Lock";
import { Popconfirm, Table, Tag, Tooltip } from "antd";
import "./UserManagement.css";

const UserManagement = () => {
  const users = [
    {
      key: "1",
      username: "user1",
      email: "user1@example.com",
      role: "Khách hàng",
      status: "active",
    },
    {
      key: "2 ",
      username: "user2",
      email: "user2@example.com",
      role: "Quản trị viên",
      status: "active",
    },
  ];

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

  return (
    <div className="user-management-container">
      <h2 className="user-management-title">Quản lý người dùng</h2>

      <Table
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
                <Tooltip title="Sửa">
                  <BorderColorIcon
                    style={{
                      cursor: "pointer",
                      width: 20,
                      height: 20,
                      color: "gray",
                    }}
                  />
                </Tooltip>
                <Tooltip title="Khóa">
                  <Popconfirm
                    title="Khóa tài khoản"
                    description="Bạn có chắc muốn khóa tài khoản này không?"
                    // onConfirm={confirm}
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
              </div>
            ),
            width: 120,
          },
          ...columns,
        ]}
        dataSource={users}
      />
    </div>
  );
};

export default UserManagement;
