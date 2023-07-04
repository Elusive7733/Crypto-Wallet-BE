import Transaction from "../models/transaction.js";

export const createTransaction = async (userId, coin, quantity, type, terminal) => {
  const newTransaction = new Transaction({
    owner: userId,
    coin,
    quantity,
    type,
    terminal,
  });

  await newTransaction.save();
};
