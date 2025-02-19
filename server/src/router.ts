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
import markerRepository from "./modules/marker/markerRepository";

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

import SendMailer_Middleware from "./middlewares/SendMailer_Middleware";
/* ************************************************************************* */
/**email */
import VerifyKeys from "./middlewares/VerifyKeys";
import authEmail from "./modules/email/authEmail";

router.post(
  "/api/email",
  VerifyKeys(["to", "subject", "text"]),
  SendMailer_Middleware,
  authEmail,
);

import Create_Crypto_Middleware from "./middlewares/Create_Crypto_Middleware";
/* ************************************************************************* */
/**reset-password */
import VerifyEmailTrue from "./middlewares/VerifyEmailTrue";
import authResetPassword from "./modules/reset_password/authResetPassword";

router.post(
  "/api/reset-password",
  VerifyKeys(["email"]),
  VerifyEmailTrue,
  Create_Crypto_Middleware,
  SendMailer_Middleware,
  authResetPassword,
);

router.post("api/reset-password", VerifyKeys(["token", "newPassword"]));
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
// In your router.ts or wherever the route is defined
router.get("/api/markers/search", async (req, res, next) => {
  try {
    console.info("Request Query Parameters:", req.query);

    const { query, criterion, types } = req.query;

    // Ensure query is a string or undefined
    const queryParam = typeof query === "string" ? query : undefined;
    const criterionParam =
      typeof criterion === "string" ? criterion : undefined;
    const typesParam = typeof types === "string" ? types : undefined;

    console.info("Extracted Parameters in Route Handler:", {
      query: queryParam,
      criterion: criterionParam,
      types: typesParam,
    });

    const markers = await markerRepository.searchMarkers(
      queryParam,
      criterionParam,
      typesParam,
    );

    res.json(markers);
  } catch (err) {
    console.error("Error in /api/markers/search route:", err);
    next(err);
  }
});
router.get("/api/markers/:id(\\d+)", markerActions.read);

/* ************************************************************************* */
export default router;
