import BorderColorIcon from "@mui/icons-material/BorderColor";
import LockIcon from "@mui/icons-material/Lock";
import { Popconfirm, Table, Tag, Tooltip } from "antd";
import "./UserManagement.css";
import { usePagination } from "src/hook/usePagination.hook";
import { getListUsers } from "src/services/user.service";

const UserManagement = () => {
  const { data: listUsers, refresh } = usePagination(
    "ListUsers",
    {
      page: 1,
      pageSize: 10,
    },
    getListUsers
  );
  console.log(listUsers);

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
        dataSource={listUsers?.data}
      />
    </div>
  );
};

export default UserManagement;
