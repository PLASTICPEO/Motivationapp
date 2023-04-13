import { Button, Form, Input, InputNumber } from "antd";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import api from "../../../public/services/api";
import "./NewCompliment.scss";
import { useState } from "react";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

const NewCompliment = () => {
  const navigate = useNavigate();
  const [thank, setThank] = useState(false);

  const onFinish = (values) => {
    api.post("http://localhost:3001/compliments", values.user).then(() => {
      setThank(true);
      const timer = setTimeout(() => {
        setThank(false);
      }, 5000);

      return () => clearTimeout(timer);
    });
  };

  return (
    <div className="formContainer">
      <div className="formContainer__form">
        {!thank ? (
          <h1 className="formContainer__title">{`კომპლიმენტის დამატება`}</h1>
        ) : (
          ""
        )}

        {thank ? (
          <h1 className="formContainer__title">
            {`კომპლიმენტი წარმატებით გაიგზავნა`}
            <br />
            <CheckCircleTwoTone
              style={{ fontSize: "55px", marginTop: "25px" }}
              twoToneColor="#52c41a"
            />
          </h1>
        ) : (
          <Form
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            style={{
              maxWidth: 600,
              marginRight: "200px",
            }}
            validateMessages={validateMessages}
          >
            <Form.Item
              style={{ width: "600px" }}
              name={["user", "name"]}
              label="Full name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["user", "email"]}
              label="Email"
              rules={[
                {
                  type: "email",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item name={["user", "introduction"]} label="Compliment">
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                ...layout.wrapperCol,
                offset: 8,
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  alignItems: "center",
                  width: "150px",
                }}
              >
                {thank ? "Go back" : "Submit"}
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </div>
  );
};

export default NewCompliment;
