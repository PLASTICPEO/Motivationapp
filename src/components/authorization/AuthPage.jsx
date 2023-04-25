import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/useContext";
import { useContext, useState } from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { AUTH_PROPS } from "../../../public/services/constants/constants";
import api from "../../../public/services/api";
import "./AuthPage.scss";

const AuthPage = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const [errNotification, setErrNotification] = useState(false);

  const navigate = useNavigate();

  const onFinish = (values) => {
    api
      .get("/api/admins")
      .then((response) => {
        const emailRecognition =
          values.email.trim().slice(0, 1).toLowerCase() +
          values.email.trim().slice(1, values.length);

        const admin = response.data.find(
          (findAdmin) =>
            findAdmin.email === emailRecognition &&
            findAdmin.password.toLowerCase() === values.password.toLowerCase()
        );

        if (admin) {
          localStorage.setItem(AUTH_PROPS, admin.id);
          setIsAuthenticated(true);
          navigate("/adminpage");
        } else {
          setErrNotification(true);
          const notificationTimer = setTimeout(() => {
            setErrNotification(false);
          }, 4000);
          return () => clearTimeout(notificationTimer);
        }
      })
      .catch((err) => console.log(err));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="authContainer">
      <div className="authContainer__authForm">
        <div className="authContainer__form">
          <h1 className="authContainer__title">Authorization</h1>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
              height: 250,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="email"
              name="email"
              className="authContainer__email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              className="authContainer__password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 6,
                span: 16,
              }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 9,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Log in
              </Button>
            </Form.Item>
          </Form>
          <div className="authContainer__errNotification">
            {errNotification ? (
              <p style={{ color: "#BF1A2F" }}>
                <ExclamationCircleOutlined style={{ color: "#BF1A2F" }} /> Admin
                not found ...
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
