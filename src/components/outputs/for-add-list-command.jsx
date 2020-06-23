import React from "react";
import { connect } from "react-redux";

const ForAddListCommand = ({ expensesData }) => {
  return (
    <div className="w-50 mx-auto mt-3">
      <ul className="list-group">
        {expensesData.map((item, idx) => {
          let expense = "";
          for (let i = 0; i < item.expenseBody.length; i++) {
            expense += `, ${item.expenseBody[i].join(" ")}`;
          }
          return (
            <li key={idx} className="list-group-item">
              {item.date} {expense}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const mapStateToProps = ({ expensesData }) => {
  return {
    expensesData
  }
};

export default connect(mapStateToProps, null)(ForAddListCommand);
