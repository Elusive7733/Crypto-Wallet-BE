import { addStrings, throwError } from "./helperfunctions.js";

export const checkQuantity = (quantity, coin) => {
  if (parseFloat(coin.quantity) < parseFloat(quantity)) {
    throwError("Not enough quantity for this transaction", 403);
  }
};

export const coinExists = (acronym, wallet) => {
  let coin = wallet.coins.find((coin) => coin.coin.acronym === acronym);
  if (coin) {
    return coin;
  } else {
    throwError(`Coin [${acronym}] not found in wallet`, 404);
  }
};

export const addCoinToWallet = async (coinToAdd, quantity, wallet) => {
  let filteredCoin = wallet.coins.find((coin) => coin.coin.acronym === coinToAdd.acronym);

  if (filteredCoin) {
    filteredCoin.quantity = addStrings(filteredCoin.quantity, quantity);
  } else {
    wallet.coins.push({ coin: coinToAdd, quantity });
  }
  await wallet.save();
};
