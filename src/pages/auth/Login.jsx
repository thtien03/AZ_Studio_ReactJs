/* eslint-disable no-template-curly-in-string */
import { Button, Checkbox, Form, Input, message } from "antd";
import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import "./Login.css";
import { loginService } from "src/services/auth.service";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const fetchLogin = await loginService(values);
      if (fetchLogin) {
        form.resetFields();
        navigate("/");
        localStorage.setItem("accessToken", fetchLogin.accessToken);
        localStorage.setItem("isAdmin", fetchLogin.isAdmin);
        messageApi.open({
          type: "success",
          content: "Đăng nhập thành công",
        });
      }
    } catch (error) {
      console.log("error", error);
      messageApi.open({
        type: "error",
        content: "Đăng nhập thất bại, vui lòng thử lại sau!",
      });
    }
  };

  return (
    <div className="login-container" style={{ marginTop: "100px" }}>
      {contextHolder}
      <h2 className="login-title">Đăng Nhập</h2>
      <Form
        name="basic"
        initialValues={{
          remember: false,
        }}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          rules={[{ required: true, message: "Vui lòng nhập vào ${label}" }]}
          label="Username"
          name="username"
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[{ required: true, message: "Vui lòng nhập vào ${label}" }]}
          hasFeedback
        >
          <Input.Password placeholder="Mật khẩu" />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" label={null}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Đăng Nhập
          </Button>
        </Form.Item>
      </Form>

      <div className="separator">
        <span>OR</span>
      </div>

      <MDBBtn className="social-button google" tag="a">
        <MDBIcon fab icon="google" size="lg" />
        CONTINUE WITH GOOGLE
      </MDBBtn>

      <p className="text-center mt-3">
        Chưa có tài khoản? <a href="/auth/register">Đăng ký</a>
      </p>
    </div>
  );
};

export default Login;
