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

router.post("/api/register", authMiddleware.hashPwd, authActions.register);
router.post("/api/login", authMiddleware.verifyPwd, authActions.login);
router.get("/api/check", authMiddleware.checkToken);

/** events */
import eventActions from "./modules/event/eventActions";

router.get("/api/events", authMiddleware.checkToken, eventActions.browse);
router.get("/api/events/:id", authMiddleware.checkToken, eventActions.read);
router.post("/api/events", authMiddleware.checkToken, eventActions.add);
router.put("/api/events/:id", authMiddleware.checkToken, eventActions.editEvent, authMiddleware.checkToken);
router.delete("/api/events/:id", eventActions.deleteEvent, authMiddleware.checkToken);

/* ************************************************************************* */

export default router;
