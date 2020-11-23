import React from "react";

const StartButton = (props) => {
  return (
    <button className={`start-btn ${props.btnClass}`} onClick={props.startGame}>
      {props.text}
    </button>
  );
};

export default StartButton;
