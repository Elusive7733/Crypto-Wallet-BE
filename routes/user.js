import { Router } from "express";
import { getUser, getAllUsers } from "../controllers/user.js";
import isAuth from "../middleware/isAuth.js";
import isUser from "../middleware/isUser.js";
import isAdmin from "../middleware/isAdmin.js";

const router = Router();

router.get("/", [isAuth, isUser], getUser);
router.get("/getAllUsers", [isAuth, isUser, isAdmin], getAllUsers);

export default router;
