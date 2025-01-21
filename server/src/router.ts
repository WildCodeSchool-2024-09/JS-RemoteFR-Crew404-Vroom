import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import itemActions from "./modules/item/itemActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

/** login / register */
import authMiddleware from "./middlewares/authMiddleware";
import authActions from "./modules/auth/authActions";

router.post("/api/login", authMiddleware.verifyPwd, authActions.login);
router.post("/api/register", authMiddleware.hashPwd, authActions.register);

/* ************************************************************************* */

export default router;
