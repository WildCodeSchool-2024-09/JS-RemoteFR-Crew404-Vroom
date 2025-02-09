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

/** login / register /logout */
import authMiddleware from "./middlewares/authMiddleware";
import authActions from "./modules/auth/authActions";

router.post("/api/register", authMiddleware.hashPwd, authActions.register);
router.post("/api/login", authMiddleware.verifyPwd, authActions.login);
router.get("/api/logout", authMiddleware.logout);
router.get("/api/check", authMiddleware.checkToken); // pour vérifier le token

/* ************************************************************************* */

/** users */
router.get(
  "/api/users/me",
  authMiddleware.checkToken,
  authActions.getCurrentUser,
); //recupère l'utilisateur connecté
router.get("/api/users", authMiddleware.checkToken, authActions.browse); //recupère tous les utilisateurs
router.get("/api/users/:id", authActions.read); //recupère un seul utilisateur
router.put(
  "/api/users/:id",
  authMiddleware.checkToken,
  authMiddleware.uploads.single("profile_picture"),
  authActions.editUser,
); // pour modifier un utilisateur
router.delete(
  "/api/users/:id",
  authMiddleware.checkToken,
  authActions.deleteUser,
); // pour supprimer un utilisateur
router.delete(
  "/api/users/:id/profile-picture",
  authMiddleware.checkToken,
  authActions.deleteProfilePicture,
); // pour supprimer une photo de profil

/* ************************************************************************* */

/** events */
import eventActions from "./modules/event/eventActions";

router.get("/api/events", eventActions.browse); //recupère tous les événements
router.get("/api/events/:id", eventActions.read); //recupère un seul événement
router.post("/api/events", authMiddleware.checkToken, eventActions.add); // pour ajouter un événement
router.put(
  "/api/events/:id",
  authMiddleware.checkToken,
  eventActions.editEvent,
); // pour modifier un événement
router.delete(
  "/api/events/:id",
  authMiddleware.checkToken,
  eventActions.deleteEvent,
); // pour supprimer un événement

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
/** markers */
import markerActions from "./modules/marker/markerActions";

// Marker-related routes

router.get("/api/markers", markerActions.browse); // Fetch all markers
router.post("/api/markers", markerActions.add); // Add markers
router.put(
  "/api/markers/:id(\\d+)",
  authMiddleware.checkToken,
  markerActions.edit,
); // Edit a marker
router.delete(
  "/api/markers/:id(\\d+)",
  authMiddleware.checkToken,
  markerActions.remove,
); // Delete a marker
router.get("/api/markers/search", markerActions.search);
router.get("/api/markers/:id(\\d+)", markerActions.read);

/* ************************************************************************* */
export default router;
