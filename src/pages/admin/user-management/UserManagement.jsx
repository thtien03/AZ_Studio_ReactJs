import { useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import { Popconfirm, Table, Tag, Tooltip } from "antd";
import "./UserManagement.css";
import { usePagination } from "src/hook/usePagination.hook";
import { getListUsers, lockUserService } from "src/services/user.service";

const UserManagement = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

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
