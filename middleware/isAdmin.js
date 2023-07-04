import { throwError } from "../helpers/helperfunctions.js";

export default (req, res, next) => {
  console.log("isAdmin");
  try {
    //check if user is admin
    const user = req.user;

    if (user.role.name !== "admin") {
      throwError("Not Authorized To Manage Roles", 401);
    }
    next();
  } catch (error) {
    next(error);
  }
};
