import { Router } from "express";
import { createRole, getRole, updateRole, deleteRole } from "../controllers/role.js";
import isAdmin from "../middleware/isAdmin.js";
import isAuth from "../middleware/isAuth.js";
import isRole from "../middleware/isRole.js";
import isUser from "../middleware/isUser.js";
// import isWalletOwner from "../middleware/isWalletOwner.js";

const router = Router();

router.post("/", [isAuth, isUser, isAdmin], createRole);
router.get("/", [isAuth, isUser], getRole);
router.put("/:userId", [isAuth, isUser, isAdmin, isRole], updateRole);
router.delete("/:role", [isAuth, isUser, isAdmin, isRole], deleteRole);

export default router;
