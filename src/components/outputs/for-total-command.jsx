import React from 'react';
import { connect } from "react-redux";

const ForTotalCommand = ({ totalValue }) => {
  return (
    <div className="w-50 mx-auto mt-3">
      <ul className="list-group">
        <li className="list-group-item">
          {totalValue.value} {totalValue.currency}
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = ({ totalValue }) => {
  return{
    totalValue
  }
};

export default connect(mapStateToProps, null)(ForTotalCommand);