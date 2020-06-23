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

const totalCommand = (curCode) => {
  return {
    type: "TOTAL_COMMAND",
    payload: curCode,
  };
}

const wrongCommand = () => {
  return {
    type: "WRONG_COMMAND"
  }
}

const rateDataRequested = () => {
  return {
    type: "FETCH_RATE_DATA_REQUESTED",
  };
};

const rateDataLoaded = (newRateData) => {
  return {
    type: "FETCH_RATE_DATA_SUCCESS",
    payload: newRateData,
  };
};

const rateDataError = (error) => {
  return {
    type: "FETCH_RATE_DATA_FAILURE",
    payload: error,
  };
};

const fetchRate = ( service) => {
  return (dispatch) => {
    dispatch(rateDataRequested());
    service
      .getRates()
      .then((res) => {
        if (res.error) {
          throw res.error;
        }

        dispatch(rateDataLoaded(res));
        return res;
      })
      .catch((error) => {
        dispatch(rateDataError(error));
      });
  };
};

export {
  addCommand,
  listCommand,
  clearCommand,
  totalCommand,
  fetchRate,
  wrongCommand,
};