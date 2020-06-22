const addCommand = (payload) => {
  return {
    type: "ADD_COMMAND",
    payload: payload,
  }
}

const listCommand = () => {
  return {
    type: "LIST_COMMAND"
  }
}

const clearCommand = (date) => {
  return {
    type: "CLEAR_COMMAND",
    payload: date,
  }
}

const totalCommand = (currencyCode) => {
  return {
    type: "TOTAL_COMMAND",
    payload: currencyCode,
  };
}

export { addCommand, listCommand, clearCommand, totalCommand };