import { throwError } from "../helpers/helperfunctions.js";
import Role from "../models/role.js";
import User from "../models/user.js";

export const createRole = async (req, res, next) => {
  console.log("createRole");

  try {
    const { role } = req.body;

    const checkRole = await Role.findOne({ name: role });
    if (checkRole) {
      throwError("Role already exists", 409);
    }

    const newRole = new Role({ name: role });
    await newRole.save();

    res.status(201).json({ newRole, message: "Role Created" });
  } catch (err) {
    next(err);
  }
};

export const getRole = async (req, res, next) => {
  console.log("getRole");

  try {
    const role = req.user.role.name;

    res.status(200).json({ role, message: "Role Retrieved" });
  } catch (err) {
    next(err);
  }
};

export const updateRole = async (req, res, next) => {
  console.log("updateRole");
  try {
    const { userId } = req.params;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role: req.role },
      { new: true }
    );

    if (!updatedUser) {
      throwError("User not found", 404);
    }
    await updatedUser.save();

    res.status(200).json({ updatedUser, message: "Role Updated" });
  } catch (err) {
    next(err);
  }
};

export const deleteRole = async (req, res, next) => {
  console.log("deleteRole");
  try {
    await Role.findByIdAndDelete(req.role._id);

    res.status(200).json({ message: "Role Deleted" });
  } catch (err) {
    next(err);
  }
};
