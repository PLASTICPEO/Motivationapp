import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SettingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Buttons from "./Buttons/Buttons";
import api from "../../../public/services/api";
import "./Compliments.scss";

const Compliments = () => {
  const navigate = useNavigate();
  const [compliment, setCompliment] = useState([]);

  useEffect(() => {
    api.get("/api/compliments").then((response) => {
      const compliments = response.data;

      if (compliments && compliments.length > 0) {
        setCompliment(
          compliments[Math.floor(Math.random() * compliments.length)]
        );
      }
    });
  }, []);

  const nextCompliment = () => {
    api.get("/api/compliments").then((response) => {
      const compliments = response.data;

      if (compliments && compliments.length > 0) {
        setCompliment(
          compliments[Math.floor(Math.random() * compliments.length)]
        );
      }
    });
  };

  return (
    <>
      <div
        className="mainContainer"
        style={{
          backgroundColor: compliment.color,
        }}
      >
        <button
          onClick={() => navigate("/authpage")}
          className="mainContainer__adminBtn"
        >
          <SettingOutlined /> admin
        </button>
        <div className="container">
          <h1 className="container__text" style={{ color: compliment.color }}>
            <span style={{ fontSize: "38px" }}> “ </span>
            {compliment.text}
          </h1>
          <span
            className="container__author"
            style={{ color: compliment.color }}
          >
            - {compliment.source}
          </span>
          <div className="container__buttons">
            <Link to={"/addcompliment"} style={{ textDecoration: "none" }}>
              <Buttons color={compliment.color} value={"დამატება"} />
            </Link>

            <Buttons
              nextCompliment={nextCompliment}
              color={compliment.color}
              value={"შემდეგი"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Compliments;
