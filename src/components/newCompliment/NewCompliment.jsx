import { Button, Form, Input } from "antd";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../../public/services/api";
import "./NewCompliment.scss";

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

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const onFinish = (values) => {
    const color = getRandomColor();

    const newQuoteObj = {
      text: values.user.text,
      author: values.user.author,
      color: color,
    };

    api.post("/api/receiveTexts", newQuoteObj).then((response) => {
      console.log(response);
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
          <h1 className="formContainer__title">{`ციტატის დამატება`}</h1>
        ) : (
          ""
        )}

        {thank ? (
          <h1 className="formContainer__title">
            {`ციტატა წარმატებით გაიგზავნა`}
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
            <Form.Item
              name={["user", "author"]}
              label="Author"
              rules={[
                {
                  type: "Author",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item name={["user", "text"]} label="Text">
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
                style={{
                  alignItems: "center",
                  width: "150px",
                  marginRight: "15px",
                }}
                onClick={() => navigate("/")}
              >
                Back to home page
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  alignItems: "center",
                  width: "150px",
                }}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </div>
  );
};

export default NewCompliment;
