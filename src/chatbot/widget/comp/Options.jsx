import React from "react";
import "./Options.css";
import addEmployeeIcon from "../icons/addIcon.svg";
import getEmployeeIcon from "../icons/getIcon.svg";
import generateIcon from "../icons/pdf.svg";

const Options = (props) => {
  const { userType } = props;

  const options = userType === "Manager"
    ? [
        {
          text: "Add Employee",
          icon: addEmployeeIcon,
          handler: props.actionProvider.handleAddEmployee,
          id: 1,
        },
        {
          text: "Get Employee",
          icon: getEmployeeIcon,
          handler: props.actionProvider.handleGetEmployee,
          id: 2,
        },
      ]
    : [
        {
          text: "Generate Form16",
          icon: generateIcon,
          handler: props.actionProvider.handleGenerateForm16,
          id: 1,
        },
      ];

  const buttonsMarkup = options.map((option) => (
    <button
      key={option.id}
      onClick={option.handler}
      className="option-button"
    >
      <div className="option-content">
        <img src={option.icon} alt={option.text} className="option-icon" />
        <span>{option.text}</span>
      </div>
    </button>
  ));

  return <div className="options-container">{buttonsMarkup}</div>;
};

export default Options;
