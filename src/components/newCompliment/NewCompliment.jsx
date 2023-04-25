import { Button, Form, Input } from "antd";
import {
  CheckCircleTwoTone,
  LinkedinOutlined,
  GithubOutlined,
} from "@ant-design/icons";
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

  const onFinish = (values) => {
    let randColor = [
      "#16a085",
      "#27ae60",
      "#2c3e50",
      "#f39c12",
      "#e74c3c",
      "#FB6964",
      "#342224",
      "#472E32",
      "#BDBB99",
      "#77B1A9",
      "#73A857",
      "#454E9E",
      "#AC92A6",
      "#A5C882",
      "#514F59",
      "#EDB88B",
      "#FAD8D6",
      "#AF5D63",
      "#119DA4",
    ];
    const color = randColor[Math.floor(Math.random() * randColor.length)];

    const newQuoteObj = {
      text: values.user.text,
      author: values.user.author,
      approved: false,
      color: color,
    };

    api.post("/api/compliments/create", newQuoteObj).then((response) => {
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
            validateMessages={validateMessages}
          >
            <Form.Item
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
              <Input.TextArea
                style={{ resize: "none", height: "100px" }}
                placeholder="Type a quote ..."
              />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                ...layout.wrapperCol,
                offset: 8,
              }}
            >
              <div className="formContainer__buttonsContainer">
                <Button
                  type="primary"
                  onClick={() => navigate("/")}
                  className="formContainer__btpButton"
                >
                  Back to home page
                </Button>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </div>
            </Form.Item>
          </Form>
        )}
        <div className="formContainer__social">
          <button className="formContainer__linkedin">
            <a href="https://www.linkedin.com/in/gio-davlasheridze-56b770228/">
              <LinkedinOutlined className="formContainer__linkedin" />
            </a>
          </button>
          <button className="formContainer__github">
            <a href="https://github.com/PLASTICPEO">
              <GithubOutlined className="formContainer__github" />
            </a>
          </button>
        </div>
      </div>
      <span className="formContainer__appAuthor">by plastic</span>
    </div>
  );
};

export default NewCompliment;
