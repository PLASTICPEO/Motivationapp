import "./AdminPage.scss";
import {
  MailOutlined,
  SettingOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem("Received Texts", "sub1", <MailOutlined />, [
    getItem(
      "Item 1",
      "g1",
      null,
      [getItem("Option 1", "1"), getItem("Back to homepage")],
      "group"
    ),
  ]),
  {
    type: "divider",
  },
  getItem("Navigation Three", "sub4", <SettingOutlined />, [
    getItem("Option 9", "9"),
  ]),
];

const AdminPage = () => {
  const navigate = useNavigate();
  const onClick = (e) => {
    if (e.key === "tmp-1") {
      navigate("/");
    }
    console.log("click ", e.key);
  };
  return (
    <div className="adminContainer">
      <Menu
        onClick={onClick}
        style={{
          width: 256,
          height: "100vh",
          backgroundColor: "#E6E8E6",
        }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={items}
      />
      <div className="adminContainer__content">
        <h1>Received Texts</h1>
      </div>
    </div>
  );
};

export default AdminPage;
