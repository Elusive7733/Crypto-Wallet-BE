import { Router } from "express";
import {
  createWallet,
  getWallet,
  buyCoin,
  sellCoin,
  sendCoin,
  deleteWallet,
} from "../controllers/wallet.js";
import isAuth from "../middleware/isAuth.js";
import isCoin from "../middleware/isCoin.js";
import isUser from "../middleware/isUser.js";
import isWallet from "../middleware/isWallet.js";

const router = Router();

router.post("/", [isAuth, isUser], createWallet);
router.get("/", [isAuth, isUser, isWallet], getWallet);

router.put("/buy", [isAuth, isUser, isWallet, isCoin], buyCoin);
router.put("/sell", [isAuth, isUser, isWallet, isCoin], sellCoin);
router.put("/send", [isAuth, isUser, isWallet, isCoin], sendCoin);

router.delete("/", [isAuth, isUser, isWallet], deleteWallet);

export default router;
