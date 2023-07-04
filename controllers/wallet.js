import { throwError, addStrings, subtractStrings } from "../helpers/helperfunctions.js";
import { addCoinToWallet, checkQuantity, coinExists } from "../helpers/walletHelper.js";
import { createTransaction } from "../helpers/transactionHelper.js";
import Wallet from "../models/wallet.js";

export const createWallet = async (req, res, next) => {
  console.log("createWallet");
};

export const deleteWallet = async (req, res, next) => {
  console.log("deleteWallet");
};

export const getWallet = async (req, res, next) => {
  console.log("getWallet");
  try {
    let wallet = req.wallet;
    let populatedWallet = await Wallet.populate(wallet, { path: "coins.coin" });
    res.status(200).json({ wallet: populatedWallet, message: "Wallet Retrieved" });
  } catch (err) {
    next(err);
  }
};

export const buyCoin = async (req, res, next) => {
  console.log("buyCoin");
  try {
    const { quantity, price } = req.body;
    const coinToBuy = req.coin;
    const wallet = req.wallet;

    let populatedWallet = await Wallet.populate(wallet, { path: "coins.coin" });

    let PKR = coinExists("PKR", populatedWallet);
    checkQuantity(price, PKR); //! This throws Error if not enough PKR to Buy Coins
    PKR.quantity = subtractStrings(PKR.quantity, price); // Subtract PKR from wallet

    addCoinToWallet(coinToBuy, quantity, populatedWallet);
    createTransaction(req.userId, coinToBuy, quantity, "receive", "Market");

    res.status(200).json({ wallet: populatedWallet, message: "Coin Bought" });
  } catch (err) {
    next(err);
  }
};

export const sellCoin = async (req, res, next) => {
  console.log("sellCoin");
  try {
    const { quantity, price } = req.body;
    const coinToSell = req.coin;
    const wallet = req.wallet;

    let populatedWallet = await Wallet.populate(wallet, { path: "coins.coin" });

    let filteredCoin = coinExists(coinToSell.acronym, populatedWallet);
    checkQuantity(quantity, filteredCoin); //! This throws Error if not enough Coin.Quantity to Sell
    filteredCoin.quantity = subtractStrings(filteredCoin.quantity, quantity);

    let PKR = coinExists("PKR", populatedWallet);
    PKR.quantity = addStrings(PKR.quantity, price);
    createTransaction(req.userId, coinToSell, quantity, "send", "Market");

    await populatedWallet.save();

    res.status(200).json({ wallet: populatedWallet, message: "Coin Sold" });
  } catch (err) {
    next(err);
  }
};

export const sendCoin = async (req, res, next) => {
  console.log("sendCoin");
  try {
    const { quantity, terminal, type } = req.body;
    const coinToSend = req.coin;
    const wallet = req.wallet;
    const userId = req.userId;

    let receiverWallet = await Wallet.findOne({ address: terminal });

    if (!receiverWallet) {
      throwError("Recipients Wallet not found", 404);
    }

    let senderWallet = await Wallet.populate(wallet, { path: "coins.coin" });

    receiverWallet = await Wallet.populate(receiverWallet, {
      path: "coins.coin",
    });

    let filteredCoin = coinExists(coinToSend.acronym, senderWallet);
    checkQuantity(quantity, filteredCoin); //! This throws Error if not enough Coin.Quantity to Sell
    filteredCoin.quantity = subtractStrings(filteredCoin.quantity, quantity);
    await senderWallet.save();

    addCoinToWallet(coinToSend, quantity, receiverWallet);
    createTransaction(userId, coinToSend, quantity, type, terminal);

    res.status(200).json({ wallet: senderWallet, message: "Coin Sent" });
  } catch (err) {
    next(err);
  }
};
