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
router.get("/api/check", authMiddleware.checkToken); // pour vérifier le token

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

export default router;
