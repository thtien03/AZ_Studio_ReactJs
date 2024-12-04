/* eslint-disable no-template-curly-in-string */
import { Button, Form, Input, message } from "antd";
import "./Register.css";
import { registerService } from "src/services/auth.service";

const Register = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmitRegister = async (value) => {
    try {
      const { confirm, ...filteredValue } = value;
      const fetchRegister = await registerService(filteredValue);
      if (fetchRegister) {
        form.resetFields();
        messageApi.open({
          type: "success",
          content: "Đăng ký thành công",
        });
      }
    } catch (error) {
      console.log("error", error);
      messageApi.open({
        type: "error",
        content: "Đăng ký thất bại, vui lòng thử lại sau!",
      });
    }
  };

  return (
    <div className="register-container">
      {contextHolder}
      <h2 className="register-title">Đăng Ký</h2>
      <Form
        form={form}
        onFinish={handleSubmitRegister}
        style={{
          maxWidth: 600,
        }}
        scrollToFirstError
        layout="vertical"
      >
        <Form.Item
          rules={[{ required: true, message: "Vui lòng nhập vào ${label}" }]}
          label="Họ và tên"
          name="name"
        >
          <Input placeholder="Họ và tên" />
        </Form.Item>

        <Form.Item
          rules={[{ required: true, message: "Vui lòng nhập vào ${label}" }]}
          label="Username"
          name="username"
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          rules={[
            { required: true, message: "Vui lòng nhập vào ${label}" },
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
          ]}
          label="Email"
          name="email"
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[{ required: true, message: "Vui lòng nhập vào ${label}" }]}
          hasFeedback
        >
          <Input.Password placeholder="Mật khẩu" />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Nhập lại mật khẩu"
          dependencies={["password"]}
          hasFeedback
          rules={[
            { required: true, message: "Vui lòng nhập vào ${label}" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Mật khẩu mới bạn nhập không khớp!")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Nhập lại mật khẩu" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
