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

/** events */
import eventActions from "./modules/event/eventActions";

router.get("/api/events", eventActions.browse);
router.get("/api/events/:id", eventActions.read);
router.post("/api/events", eventActions.add);
router.put("/api/events/:id", eventActions.editEvent);
router.delete("/api/events/:id", eventActions.deleteEvent);

/* ************************************************************************* */

export default router;
