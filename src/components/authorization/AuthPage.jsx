import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/useContext";
import { useContext, useState } from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";

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
        const admin = response.data.find(
          (findAdmin) =>
            findAdmin.email === values.email &&
            findAdmin.password === values.password
        );

        if (admin) {
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
      .catch(() => console.log("error info"));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="authContainer">
      <div className="authContainer__authForm">
        <div className="authContainer__form">
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
                offset: 8,
                span: 16,
              }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
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
