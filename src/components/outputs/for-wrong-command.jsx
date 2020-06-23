import React from 'react';

const ForWrongCommand = () => {
  return (
    <div className="w-50 mx-auto mt-3">
      <div>Please enter one of the available commands:</div>
      <ul className="list-group">
        <li className="list-group-item">
          add date value currency product name
        </li>
        <li className="list-group-item">list</li>
        <li className="list-group-item">clear date</li>
        <li className="list-group-item">total currency</li>
      </ul>
    </div>
  );
}

export default ForWrongCommand;