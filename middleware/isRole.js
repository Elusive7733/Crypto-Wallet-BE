import { throwError } from "../helpers/helperfunctions.js";
import Role from "../models/role.js";

export default async (req, res, next) => {
  console.log("isRole");
  try {
    //check role is a valid role
    let role;
    role = req.body.role;
    if (!role) {
      role = req.params.role;
    }

    const isRole = await Role.findOne({ name: role });

    if (!isRole || isRole === null || isRole === undefined || isRole === "") {
      throwError("Invalid Role", 404);
    }
    req.role = isRole;
    next();
  } catch (error) {
    next(error);
  }
};
