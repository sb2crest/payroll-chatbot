import React from "react";
import "./Options.css";

const ManagerOptions = (props) => {
  const options = [
    {
      text: "By ID",
      handler: props.actionProvider.handleGetEmployeeByID,
      id: 1,
    },
    {
      text: "By Name",
      handler: props.actionProvider.handleGetEmployeeByName,
      id: 2,
    }
  ];

  const buttonsMarkup = options.map((option) => (
    <button key={option.id} onClick={option.handler} className="option-button">
      {option.text}
    </button>
  ));

  return <div className="options-container" style={{flexDirection:'row',justifyContent:'center',columnGap:'12px'}}>{buttonsMarkup}</div>;
};

export default ManagerOptions;
