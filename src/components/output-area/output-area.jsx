import React from 'react';
import { connect } from "react-redux";

import {
  ForAddListCommand,
  ForTotalCommand,
  ForWrongCommand,
} from "../outputs";

const OutputArea = ({ lastCommand, isWrongCommand, expensesData }) => {
  if (isWrongCommand || expensesData.length === 0) {
    return <ForWrongCommand />;
  }

  if (lastCommand === "total") {
    return <ForTotalCommand />;
  }

  return <ForAddListCommand />;
};

const mapStateToProps = ({
  expensesData,
  lastCommand,
  isWrongCommand,
}) => {
  return {
    expensesData,
    lastCommand,
    isWrongCommand,
  };
};

export default connect(mapStateToProps, null)( OutputArea );