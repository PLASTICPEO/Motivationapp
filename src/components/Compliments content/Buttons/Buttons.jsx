import React from "react";
import { FileAddOutlined, CaretRightOutlined } from "@ant-design/icons";
import "./Buttons.scss";

const Buttons = ({ nextCompliment, color, value }) => {
  return (
    <div className="btnContainer">
      <button
        className="btnContainer__btn"
        type="primary"
        onClick={nextCompliment}
        style={{ backgroundColor: color, color: "white" }}
      >
        {value}
        {value === "შემდეგი" ? (
          <CaretRightOutlined style={{ marginLeft: "5px" }} />
        ) : (
          <FileAddOutlined style={{ marginLeft: "5px" }} />
        )}
      </button>
    </div>
  );
};

export default Buttons;
