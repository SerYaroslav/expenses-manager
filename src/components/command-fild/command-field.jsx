import React, { useState } from "react";

const CommandField = () => {
  const [label, setLabel] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(label);
    setLabel('');
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        onChange={(e) => setLabel(e.target.value)}
        placeholder="Enter the command"
        value={label}
      />
      <button type="submit">Enter</button>
    </form>
  );
};

export default CommandField;
