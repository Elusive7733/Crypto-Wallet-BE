import { throwError } from "../helpers/helperfunctions.js";
import Wallet from "../models/wallet.js";

export default async (req, res, next) => {
  console.log("isWallet");
  const user = req.user;

  try {
    let wallet = await Wallet.findById(user.wallet);

    if (!wallet) {
      throwError("Wallet does not exist", 404);
    }

    req.wallet = wallet;
    next();
  } catch (err) {
    next(err);
  }
};
