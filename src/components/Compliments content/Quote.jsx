import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SettingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Buttons from "./Buttons/Buttons";
import api from "../../../public/services/api";
import "./Quote.scss";
import AudioPlayer from "../newCompliment/Audio/AudioPlayer";

const Quote = () => {
  const navigate = useNavigate();
  const [compliment, setCompliment] = useState([]);

  useEffect(() => {
    api.get("/api/compliments").then((response) => {
      const compliments = response.data;
      if (compliments && compliments.length > 0) {
        setCompliment(
          compliments[Math.floor(Math.random() * compliment.length)]
        );
      }
    });
  }, []);

  const nextCompliment = () => {
    api.get("/api/compliments").then((response) => {
      const compliments = response.data;
      const dataDelay = setTimeout(() => {
        setCompliment(
          compliments[Math.floor(Math.random() * compliments.length)]
        );
      }, 1000);
      const container = document.querySelector(".container");
      container.style.opacity = 0;
      container.style.transform = "scale(0.9)";
      setTimeout(() => {
        container.style.opacity = 1;
        container.style.transform = "scale(1)";
      }, 1000);
      return () => clearTimeout(dataDelay);
    });
  };

  return (
    <>
      <div
        className="main"
        style={{
          backgroundColor: compliment.color,
        }}
      >
        <button
          onClick={() => navigate("/authpage")}
          className="main__adminBtn"
        >
          <SettingOutlined /> manager
        </button>
        <div className="main__audioBtn">
          <AudioPlayer />
        </div>

        <div className="container">
          <p className="container__text" style={{ color: compliment.color }}>
            <span
              class="material-symbols-outlined"
              style={{ fontSize: "26px" }}
            >
              format_quote
            </span>{" "}
            {compliment.text}
          </p>
          <span className="container__author" style={{ color: "black" }}>
            - {compliment.author}
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

export default Quote;
