import { useEffect, useState } from "react";
import { MailOutlined, SettingOutlined, MenuOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useContext } from "react";
import { AuthContext } from "../../context/useContext";
import { useNavigate } from "react-router-dom";
import { AUTH_PROPS } from "../../../public/services/constants/constants";
import api from "../../../public/services/api";
import "./AdminPage.scss";

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
      [getItem("შემოსული ტექსტები"), getItem("Log out")],
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
  const { setIsAuthenticated } = useContext(AuthContext);
  const [menuToggle, setMenuToggle] = useState(false);
  const [deleteQuote, setDeleteQuote] = useState(false);
  const [receivedQuotes, setReceivedQuotes] = useState([]);
  const [actionNotification, setActionNotification] = useState("");

  useEffect(() => {
    api.get("/api/compliments").then((response) => {
      const noApprovedQuotes = response.data.filter((res) => !res.approved);
      setReceivedQuotes(noApprovedQuotes);
    });
  }, [deleteQuote]);

  const addQuote = (quote) => {
    let randColor = [
      "#16a085",
      "#27ae60",
      "#2c3e50",
      "#f39c12",
      "#e74c3c",
      "#9b59b6",
      "#FB6964",
      "#342224",
      "#472E32",
      "#BDBB99",
      "#77B1A9",
      "#73A857",
    ];
    const color = randColor[Math.floor(Math.random() * randColor.length)];

    const newQuoteObj = {
      text: quote.text,
      source: quote.author,
      color: color,
    };

    api.post(`/api/compliments/approve/${quote.id}`, newQuoteObj).then(() => {
      setDeleteQuote(!deleteQuote);
      setActionNotification(
        `added "${newQuoteObj.text.slice(
          0,
          newQuoteObj.text.length / 2.3
        )}" ...`
      );
      const notificationTimer = setTimeout(() => {
        setActionNotification("");
      }, 5000);
      return () => clearTimeout(notificationTimer);
    });
  };

  const removeQuote = (quote) => {
    api.delete(`/api/compliments/remove/${quote.id}`).then(() => {
      setActionNotification(
        `Removed "${quote.text.slice(0, quote.text.length / 2.3)}" ...`
      );
      const notificationTimer = setTimeout(() => {
        setActionNotification("");
      }, 5000);
      setDeleteQuote(!deleteQuote);
      return () => clearTimeout(notificationTimer);
    });
  };

  const navigate = useNavigate();

  const onClick = (e) => {
    if (e.key === "tmp-1") {
      setIsAuthenticated(false);
      localStorage.removeItem(AUTH_PROPS);
      navigate("/");
    }
  };

  return (
    <div className="adminContainer">
      <div className="admincontainer__menu">
        <MenuOutlined
          style={{
            position: "absolute",
            left: "0.3%",
            top: "1%",
            fontSize: "22px",
            color: "gray",
          }}
          onClick={() => setMenuToggle(!menuToggle)}
        />
        <Menu
          onClick={onClick}
          style={{
            display: menuToggle ? "block" : "none",
            width: "256px",
            backgroundColor: "#E3E4DB",
            height: "100%",
            paddingLeft: "25px",
          }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          items={items}
        />
      </div>

      <div className="adminContainer__content">
        <h1 className="adminContainer__title">Received Texts</h1>
        <div className="adminContainer__notification">
          <p>{actionNotification ? actionNotification : ""}</p>
        </div>
        {receivedQuotes.map((quote) => {
          return (
            <div
              key={quote.id}
              style={{ maxWidth: "700px" }}
              className="adminContainer__texts"
            >
              {quote.text}{" "}
              <strong className="adminContainer__author">
                - {quote.author}
              </strong>
              <button
                className="adminContainer__addBtn"
                onClick={() => addQuote(quote)}
              >
                Add
              </button>
              <button
                className="adminContainer__removeBtn"
                onClick={() => removeQuote(quote)}
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminPage;
