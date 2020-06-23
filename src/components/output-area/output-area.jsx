import React from 'react';
import { connect } from "react-redux";

const OutputArea = ({ expensesData, lastCommand, totalValue }) => {
  if (expensesData.length === 0) {
    return `Enter any command`;
  }

  if (lastCommand === "total") {
    return (
      <div>
        {totalValue.value} {totalValue.currency}
      </div>
    );
  }

  return (
    <div>
      <ul>
        {expensesData.map((item, idx) => {
          let expense = "";
          for (let i = 0; i < item.expenseBody.length; i++) {
            expense += `${item.expenseBody[i].join(" ")} `;
          }
          return (
            <li key={idx}>
              {item.date} {expense}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const mapStateToProps = ({ expensesData, lastCommand, totalValue }) => {
  return {
    expensesData,
    lastCommand,
    totalValue,
  };
};

export default connect(mapStateToProps, null)( OutputArea );