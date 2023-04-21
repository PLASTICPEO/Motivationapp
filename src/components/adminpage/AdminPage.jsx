import { useEffect, useState } from "react";
import { MailOutlined, SettingOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
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
      [getItem("შემოსული ტექსტები"), getItem("Back to homepage")],
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
  const [deleteQuote, setDeleteQuote] = useState(false);
  const [receivedQuotes, setReceivedQuotes] = useState([]);
  const [actionNotification, setActionNotification] = useState("");

  useEffect(() => {
    api
      .get("/api/receiveTexts")
      .then((response) => setReceivedQuotes(response.data));
  }, [deleteQuote]);

  const addQuote = (quote) => {
    console.log(quote);
    const getRandomColor = () => {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

    const color = getRandomColor();

    const newQuoteObj = {
      text: quote.text,
      source: quote.author,
      color: color,
    };

    api.post(`/api/compliments`, newQuoteObj).then(() => {
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

    api.delete(`/api/receiveTexts/${quote.id}`).then(() => {
      setDeleteQuote(!deleteQuote);
    });
  };

  const removeQuote = (quote) => {
    api.delete(`/api/receiveTexts/${quote.id}`).then(() => {
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
      navigate("/");
    }
  };

  useEffect(() => {
    console.log(actionNotification);
  }, [actionNotification]);

  return (
    <div className="adminContainer">
      <div className="admincontainer_menu">
        <Menu
          onClick={onClick}
          style={{
            width: "256px",
            backgroundColor: "#E6E8E6",
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
