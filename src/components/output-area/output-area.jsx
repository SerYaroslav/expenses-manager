import React from 'react';
import { connect } from "react-redux";

const OutputArea = ({ expensesData }) => {
  if (expensesData.length === 0){
    return (`Enter any command`)
  }

  return (
    <div>
      <ul>
      {
        expensesData.map(item => {
          return (
            <li>
              {item.date} {item.expenseBody.join(", ")}
            </li>
          );
        })
      }
      </ul>
    </div>
  )
};

const mapStateToProps = ({ expensesData }) => {
  return {
    expensesData
  }
};

export default connect(mapStateToProps, null)( OutputArea );