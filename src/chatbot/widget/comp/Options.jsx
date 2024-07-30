import React from "react";
import "./Options.css";

const Options = (props) => {
  const options = [
    {
      text: "Add Employee",
      handler: props.actionProvider.handleAddEmployee,
      id: 1,
    },
    {
      text: "Get Employee",
      handler: props.actionProvider.handleGetEmployee,
      id: 2,
    }
  ];

  const buttonsMarkup = options.map((option) => (
    <button key={option.id} onClick={option.handler} className="option-button">
      {option.text}
    </button>
  ));

  return <div className="options-container">{buttonsMarkup}</div>;
};

export default Options;
