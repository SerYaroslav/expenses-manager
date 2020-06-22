const initialState = {
  expensesData: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_COMMAND":
      console.log("add", action.payload);
      const addDate = action.payload[1];
      const addValue = action.payload[2];
      const addCurrency = action.payload[3].toUpperCase()
      const addProductName = action.payload.slice(4).join(' ')
      console.log({addDate, addValue, addCurrency, addProductName});
      console.log(state.expensesData);
      const idx = state.expensesData.findIndex((item) => item.date === addDate);
      
      if (idx === -1){
        return {
          ...state,
          expensesData: [
            ...state.expensesData,
            {
              date: addDate,
              expenseBody: [`${addProductName} ${addValue} ${addCurrency}`],
            },
          ],
        };
      }

      const updatedExpense = {
        date: state.expensesData[idx].date,
        expenseBody: [
          ...state.expensesData[idx].expenseBody,
          `${addProductName} ${addValue} ${addCurrency}`,
        ],
      };

      return {
        ...state,
        expensesData: [
          ...state.expensesData.slice(0, idx),
          updatedExpense,
          ...state.expensesData.slice(idx + 1),
        ],
      };

    case "LIST_COMMAND":
      console.log("list");
      const sortedExpenses = [...state.expensesData].sort((a, b) => {
        if (a.date < b.date) {
          return -1;
        }
        if (a.date > b.date) {
          return 1;
        }
        return 0;
      });
      return {
        ...state,
        expensesData: [...sortedExpenses],
      };
      return state;

    case "CLEAR_COMMAND":
      console.log("clear", action.payload);
      const clearIdx = state.expensesData.findIndex(
        (item) => item.date === action.payload
      );

      return {
        ...state,
        expensesData: [
          ...state.expensesData.slice(0, clearIdx),
          ...state.expensesData.slice(clearIdx + 1),
        ],
      };

    case "TOTAL_COMMAND":
      console.log("total", action.payload);
      return state;

    default:
      return state;
  }
}

export default reducer;