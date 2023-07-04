import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { throwError } from "../helpers/helperfunctions.js";
import Wallet from "../models/wallet.js";
import Coin from "../models/coin.js";

export const register = async (req, res, next) => {
  const { name, phoneNumber, password, confirmPassword } = req.body;

  // Non required fields
  const email = req.body.email;

  try {
    const user = await User.findOne({ phoneNumber });
    if (user) throwError("Phone Number already in use.", 409);

    if (!confirmPassword || !/\S/.test(confirmPassword))
      throwError("Confirm Password field incorrect", 403);

    if (password !== confirmPassword) throwError("Passwords do NOT match", 403);

    const hashedPassword = await bcrypt.hash(password, 12);

    const wallet = new Wallet({ address: phoneNumber });
    await wallet.save();

    const PKR = await Coin.findOne({ name: "Rupees" });
    let populatedWallet = await Wallet.populate(wallet, { path: "coins.coin" });
    populatedWallet.coins.push({ coin: PKR, quantity: "50000" });
    populatedWallet.save();

    const newUser = new User({
      name,
      phoneNumber,
      email,
      password: hashedPassword,
      role: req.role,
      wallet,
    });
    await newUser.save();

    res.status(201).json({ message: "User Registered!" });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  const phoneNumber = req.body.phoneNumber;
  const password = req.body.password;

  try {
    const user = await User.findOne({ phoneNumber });
    if (!user) throwError("User not found", 404);

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) throwError("Wrong Password!", 401);

    // If everything checks out, send back JWT and the message we wish to send.
    // TOKEN ===================================
    const token = jwt.sign(
      {
        name: user.name,
        userId: user._id.toString(),
      },
      process.env.SERVER_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      token: token,
      user,
      message: "Logged in Successfully",
    });
  } catch (err) {
    next(err);
  }
};
