import { Router } from "express";
import { login, register } from "../controllers/auth.js";
import isRole from "../middleware/isRole.js";

const router = Router();

router.post("/login", login);
router.post("/register", isRole, register);

export default router;
