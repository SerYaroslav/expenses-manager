import React, { useState } from "react";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';

import {
  addCommand,
  listCommand,
  clearCommand,
  totalCommand,
} from "../../actions";


const CommandField = ({addCommand, listCommand, clearCommand, totalCommand}) => {
  
  const [commandText, setCommandText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    const commandBody = commandText.split(" ");
    const commandType = commandBody[0].toLowerCase();
    const expenseDate = commandBody[1];
    const currencyCode = commandBody[2];

    switch (commandType) {
      case "add":
        addCommand(commandBody);
        break;
      case "list":
        listCommand()
        break;
      case "clear":
        clearCommand(expenseDate);
        break;
      case "total":
        totalCommand(currencyCode.toUpperCase());
        break;

      default:
        console.log("try again");
        break;
    }
    setCommandText("");
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        onChange={(e) => setCommandText(e.target.value)}
        placeholder="Enter the command"
        value={commandText}
      />
      <button type="submit">Enter</button>
    </form>
  );
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    addCommand,
    listCommand,
    clearCommand,
    totalCommand,
  },
    dispatch
  );
}


export default connect(null, mapDispatchToProps)( CommandField );
