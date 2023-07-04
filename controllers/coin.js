import { throwError } from "../helpers/helperfunctions.js";
import Coin from "../models/coin.js";

export const createCoin = async (req, res, next) => {
  try {
    const { name, acronym } = req.body;

    const coin = await Coin.findOne({ $or: [{ name }, { acronym }] });
    if (coin) {
      throwError("Coin Already Exits", 409);
    }

    const newCoin = new Coin({ name, acronym });
    await newCoin.save();

    res.status(200).json({ newCoin, message: "Coin Created" });
  } catch (err) {
    next(err);
  }
};

export const getAllCoins = (req, res) => {
  console.log("getAllCoins");
  Coin.find({}, (err, coins) => {
    if (err) {
      throwError("Error Retrieving Coins", 500);
    }
    res.status(200).json({ coins, message: "Coins Retrieved" });
  });
};

export const updateCoin = (req, res) => {
  console.log("updateCoin");
};

export const deleteCoin = async (req, res, next) => {
  console.log("deleteCoin");
};
