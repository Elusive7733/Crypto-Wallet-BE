import { throwError } from "../helpers/helperfunctions.js";
import transaction from "../models/transaction.js";
import User from "../models/user.js";

export const getUser = async (req, res, next) => {
  try {
    let user = req.user;
    res.status(200).json({
      message: "User fetched successfully!",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      message: "Users fetched successfully!",
      users,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
