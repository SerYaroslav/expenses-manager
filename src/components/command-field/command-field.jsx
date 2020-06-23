import React, { useState, useEffect } from "react";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';

import {withFixerService} from "../hoc";

import {
  addCommand,
  listCommand,
  clearCommand,
  totalCommand,
  fetchRate,
} from "../../actions";


const CommandField = ({ addCommand, listCommand, clearCommand, totalCommand, fetchRate, fixerService}) => {
  const [commandText, setCommandText] = useState("");

  //formate for "add" command : "add yyyy-mm-dd value carrencyCode productName"
  const commandBody = commandText.split(" ");
  const commandType = commandBody[0].toLowerCase();
  const expenseDate = commandBody[1];

  //format for "total" command: "total currencyCode"
  const currencyCode = commandBody[1];
  
  useEffect(() => {
    fetchRate(fixerService);
  }, [fetchRate, fixerService]);

  const onSubmit = (e) => {
    e.preventDefault();

    switch (commandType) {
      case "add":
        addCommand(commandBody);
        break;
      case "list":
        listCommand();
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
  return bindActionCreators(
    {
      addCommand,
      listCommand,
      clearCommand,
      totalCommand,
      fetchRate,
    },
    dispatch
  );
}


export default withFixerService()(connect(null, mapDispatchToProps)(CommandField));
