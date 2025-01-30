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

router.get("/api/events", eventActions.browse);
router.get("/api/events/:id", eventActions.read);
router.post("/api/events", authMiddleware.checkToken, eventActions.add);
router.put(
  "/api/events/:id",
  authMiddleware.checkToken,
  eventActions.editEvent,
);
router.delete(
  "/api/events/:id",
  authMiddleware.checkToken,
  eventActions.deleteEvent,
);

/* ************************************************************************* */

/** vehicules */
import vehiculeActions from "./modules/vehicules/vehiculeActions";

router.get("/api/vehicules", vehiculeActions.browse);
router.get("/api/vehicules/:id", vehiculeActions.read);
router.post("/api/vehicules", authMiddleware.checkToken, vehiculeActions.add);
router.put(
  "/api/vehicules/:id",
  authMiddleware.checkToken,
  vehiculeActions.editVehicule,
);
router.delete(
  "/api/vehicules/:id",
  authMiddleware.checkToken,
  vehiculeActions.deleteVehicule,
);

/* ************************************************************************* */
export default router;
