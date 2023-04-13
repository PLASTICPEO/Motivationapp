import { useEffect, useState } from "react";
import Buttons from "../Buttons/Buttons";
import api from "../../../public/services/api";
import { Link, useNavigate } from "react-router-dom";
import "./Compliments.scss";

const Compliments = () => {
  const [compliment, setCompliment] = useState([]);

  useEffect(() => {
    api
      .get() // assuming this is the endpoint to fetch compliments data
      .then((response) => {
        const compliments = response.data; // assuming the array of compliments is under "compliments" property in the response data
        if (compliments && compliments.length > 0) {
          setCompliment(
            compliments[Math.floor(Math.random() * compliments.length)]
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching compliments:", error);
      });
  }, []);

  const nextCompliment = () => {
    api
      .get()
      .then((response) => {
        const compliments = response.data;
        if (compliments && compliments.length > 0) {
          setCompliment(
            compliments[Math.floor(Math.random() * compliments.length)]
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching compliments:", error);
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
        <div className="container">
          <h1 className="container__text" style={{ color: compliment.color }}>
            “ {compliment.text}
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
