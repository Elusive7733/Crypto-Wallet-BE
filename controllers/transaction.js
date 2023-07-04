import { throwError } from "../helpers/helperfunctions.js";
import Transaction from "../models/transaction.js";
import User from "../models/user.js";

export const addTransaction = async (req, res, next) => {
  const { quantity, type, terminal } = req.body;
  const userId = req.userId;
  const coin = req.coin;

  try {
    const user = await User.findOne({ phoneNumber: terminal });
    if (!user) {
      throwError("Recipient not found", 404);
    }
    if (terminal === req.user.phoneNumber) {
      return;
    }

    const newTransaction = new Transaction({
      owner: userId,
      coin,
      quantity,
      type,
      terminal,
    });
    await newTransaction.save();
    res.status(201).json({ newTransaction, message: "Transaction added successfully!" });
  } catch (err) {
    next(err);
  }
};

export const getAllTransactions = async (req, res, next) => {
  try {
    const userId = req.userId;
    const phoneNumber = req.user.phoneNumber;
    let transactions = await Transaction.find({
      $or: [{ terminal: phoneNumber }, { owner: userId }],
    });

    let populatedTrasactions = await Transaction.populate(transactions, {
      path: "coin owner",
    });
    res
      .status(200)
      .json({ transactions: populatedTrasactions, message: "Transactions Retrieved" });
  } catch (error) {
    next(err);
  }
};
