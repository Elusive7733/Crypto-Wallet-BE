import { throwError } from "../helpers/helperfunctions.js";
import Coin from "../models/coin.js";

export default async (req, res, next) => {
  try {
    const { name, acronym } = req.body;

    const coin = await Coin.findOne({ $or: [{ name }, { acronym }] });
    if (!coin) {
      throwError("Invalid Coin", 404);
    }

    req.coin = coin;
    next();
  } catch (err) {
    next(err);
  }
};
