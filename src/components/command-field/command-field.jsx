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
  wrongCommand,
} from "../../actions";


const CommandField = ({
  addCommand,
  listCommand,
  clearCommand,
  totalCommand,
  wrongCommand,
  fetchRate,
  fixerService,
  expensesData,
  rates
}) => {
  const [commandText, setCommandText] = useState("");

  //formate for "add" command : "add yyyy-mm-dd value carrencyCode productName"
  const commandBody = commandText.split(" ");
  const commandType = commandBody[0].toLowerCase();
  const expenseDate = commandBody[1];
  const addCurCode = commandBody[3];

  //format for "total" command: "total currencyCode"
  const totalCurCode = commandBody[1];
  
  
  useEffect(() => {
    fetchRate(fixerService);
  }, [fetchRate, fixerService]);
  
  
  const onSubmit = (e) => {
    e.preventDefault();
    
    switch (commandType) {
      case "add":

        if (
          commandBody.length < 4 ||
          isNaN(commandBody[2]) ||
          addCurCode.split("").length !== 3 ||
          !rates.hasOwnProperty(addCurCode.toUpperCase())
        ) {
          return wrongCommand();
        }
        setCommandText("");
        return addCommand(commandBody);

      case "list":

        if (commandBody.length > 1) {
          return wrongCommand();
        }

        setCommandText("");
        return listCommand();

      case "clear":

        const idx = expensesData.findIndex((item) => item.date === expenseDate);

        if(idx === -1){
          return wrongCommand()
        }

        setCommandText("");
        return clearCommand(expenseDate);
  
      case "total":

        if (
          commandBody.length > 2 ||
          !rates.hasOwnProperty(totalCurCode.toUpperCase())
        ) {
          return wrongCommand();
        }

        setCommandText("");
        return totalCommand(totalCurCode.toUpperCase());

      default:
        return wrongCommand()
    }

    
  };

  return (
    <div className="w-50 mx-auto mt-3">
      <form onSubmit={onSubmit} className="d-block">
        <div className="d-flex flex-row">
          <input
            type="text"
            onChange={(e) => setCommandText(e.target.value)}
            placeholder="Enter the command"
            value={commandText}
            className="form-control mr-3"
          />
          <button type="submit" className="btn btn-primary w-25">
            Enter
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = ({ expensesData, rates }) => {
  return {
    expensesData,
    rates,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addCommand,
      listCommand,
      clearCommand,
      totalCommand,
      fetchRate,
      wrongCommand,
    },
    dispatch
  );
}


export default withFixerService()(
  connect(mapStateToProps, mapDispatchToProps)(CommandField)
);
