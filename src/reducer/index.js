const initialState = {
  lastCommand: null,
  isWrongCommand: false,
  loading: false,
  error: false,
  expensesData: [],
  valCode: null,
  currencyValues: {},
  rates: [],
  totalValue: {
    value: null,
    currency: null
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_COMMAND":

      //formate for "add" command : "add yyyy-mm-dd value carrencyCode productName"

      const addDate = action.payload[1];
      const addValue = action.payload[2];
      const addCurrency = action.payload[3].toUpperCase();
      const addProductName = action.payload.slice(4).join(" ");
      const idx = state.expensesData.findIndex((item) => item.date === addDate);

      const newExpense = [addProductName, addValue, addCurrency];
      let currencyValues = state.currencyValues;

      if(!currencyValues.hasOwnProperty(addCurrency)){
        currencyValues[addCurrency] = +addValue;
      }else{
        currencyValues[addCurrency] += +addValue;
      }

      if (idx === -1) {
        return {
          ...state,
          lastCommand: "add",
          isWrongCommand: false,
          currencyValues: currencyValues,
          expensesData: [
            ...state.expensesData,
            {
              date: addDate,
              expenseBody: [newExpense],
            },
          ],
        };
      }

      const updatedExpense = {
        date: state.expensesData[idx].date,
        expenseBody: [...state.expensesData[idx].expenseBody, newExpense],
      };

      return {
        ...state,
        lastCommand: "add",
        isWrongCommand: false,
        currencyValues: currencyValues,
        expensesData: [
          ...state.expensesData.slice(0, idx),
          updatedExpense,
          ...state.expensesData.slice(idx + 1),
        ],
      };

    case "LIST_COMMAND":

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
        isWrongCommand: false,
        lastCommand: "list",
        expensesData: [...sortedExpenses],
      };

    case "CLEAR_COMMAND":

      const clearedDate = action.payload;
      const clearIdx = state.expensesData.findIndex(
        (item) => item.date === clearedDate
      );
      const toSubtract = state.expensesData[clearIdx].expenseBody;
      const currentCurVal = state.currencyValues;

      let subtractedValue = {}
      
      for (let i = 0; i < toSubtract.length; i++) {
        if(!subtractedValue.hasOwnProperty(toSubtract[i][2])){
          subtractedValue[toSubtract[i][2]] = +toSubtract[i][1];
        }else{
          subtractedValue[toSubtract[i][2]] += +toSubtract[i][1];
        }
      }

       for (const key in subtractedValue) {

         if (
           currentCurVal.hasOwnProperty(key) &&
           subtractedValue.hasOwnProperty(key)
         ) {
             currentCurVal[key] -= subtractedValue[key];
           }

       }

      return {
        ...state,
        lastCommand: "clear",
        isWrongCommand: false,
        currencyValues: currentCurVal,
        expensesData: [
          ...state.expensesData.slice(0, clearIdx),
          ...state.expensesData.slice(clearIdx + 1),
        ],
      };

    case "TOTAL_COMMAND":

      const curNeeded = action.payload; 
      const curCurrent = state.currencyValues;

      const otherRate = state.rates[curNeeded]

      let resValue = 0;

      if (curNeeded === "EUR") {

        for (const key in curCurrent) {
          if(key === "EUR") {
            resValue += +curCurrent[key];
          } else {
            resValue += curCurrent[key] / state.rates[key];
          }
        }

      }else{

          for (const key in curCurrent) {
            resValue += (otherRate * curCurrent[key]) / state.rates[key];
          }

        }

      return {
        ...state,
        lastCommand: "total",
        isWrongCommand: false,
        totalValue: {
          value: resValue.toFixed(2),
          currency: curNeeded,
        },
      };

    case "WRONG_COMMAND":

      return {
        ...state,
        isWrongCommand: true,
      }

    case "FETCH_RATE_DATA_REQUESTED":

      return{
        ...state,
        loading: true,
      }

    case "FETCH_RATE_DATA_FAILURE":

      return{
        ...state,
        error: action.payload
      }

    case "FETCH_RATE_DATA_SUCCESS":

      const resRates = action.payload.rates;

      return {
        ...state,
        rates: resRates,
      };

    default:
      return state;
  }
}

export default reducer;