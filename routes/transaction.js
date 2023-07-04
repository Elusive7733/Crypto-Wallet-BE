import { Router } from "express";
import { addTransaction, getAllTransactions } from "../controllers/transaction.js";
import isAuth from "../middleware/isAuth.js";
import isCoin from "../middleware/isCoin.js";
import isUser from "../middleware/isUser.js";

const router = Router();

router.post("/", [isAuth, isUser, isCoin], addTransaction);
router.get("/", [isAuth, isUser], getAllTransactions);

export default router;
