import jsonwebtoken from "jsonwebtoken";
import { throwError } from "../helpers/helperfunctions.js";

const verify = jsonwebtoken.verify;

export default (req, res, next) => {
  console.log("isAuth");
  try {
    const authHeader = req.get("Authorization");

    if (!authHeader) {
      throwError("Missing Header", 400);
    }

    const token = authHeader.split(" ")[1];
    let decodedToken;
    decodedToken = verify(token, process.env.SERVER_SECRET_KEY);

    if (!decodedToken) {
      throwError("Not Authorized", 401);
    }

    req.userId = decodedToken.userId;

    next();
  } catch (error) {
    next(error);
  }
};

//header

//body

//signature

//authorizaon vs authentication
