import { Router } from "express";
import { createCoin, getAllCoins, updateCoin, deleteCoin } from "../controllers/coin.js";
import isAdmin from "../middleware/isAdmin.js";
import isAuth from "../middleware/isAuth.js";
import isUser from "../middleware/isUser.js";

const router = Router();

router.post("/", [isAuth, isUser, isAdmin], createCoin);
router.get("/", [isAuth, isUser], getAllCoins);
router.put("/", [isAuth, isUser, isAdmin], updateCoin);
router.delete("/", [isAuth, isUser, isAdmin], deleteCoin);

export default router;
