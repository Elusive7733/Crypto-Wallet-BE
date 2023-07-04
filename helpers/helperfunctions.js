export const throwError = (errorMessage, statusCode) => {
  const error = new Error(errorMessage);
  error.statusCode = statusCode;
  throw error;
};

export const addStrings = (arg0, arg1) => {
  let total = parseFloat(arg0) + parseFloat(arg1);
  return total.toString();
};

export const subtractStrings = (arg0, arg1) => {
  let total = parseFloat(arg0) - parseFloat(arg1);
  return total.toString();
};

export const getCoinPrice = async (acronym) => {
  const sendRequest = async () => {
    return await axios.get(`https://api.coinbase.com/v2/prices/${acronym}-PKR/buy`);
  };

  try {
    const response = await sendRequest();
    return response.data.data.amount;
  } catch (err) {
    console.log(err);
  }
};
