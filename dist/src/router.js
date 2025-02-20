"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */
// Define item-related routes
var itemActions_1 = __importDefault(require("./modules/item/itemActions"));
router.get("/api/items", itemActions_1.default.browse);
router.get("/api/items/:id", itemActions_1.default.read);
router.post("/api/items", itemActions_1.default.add);
/** login / register /logout */
var authMiddleware_1 = __importDefault(require("./middlewares/authMiddleware"));
var authActions_1 = __importDefault(require("./modules/auth/authActions"));
var markerRepository_1 = __importDefault(require("./modules/marker/markerRepository"));
router.post("/api/register", authMiddleware_1.default.hashPwd, authActions_1.default.register);
router.post("/api/login", authMiddleware_1.default.verifyPwd, authActions_1.default.login);
router.get("/api/logout", authMiddleware_1.default.logout);
router.get("/api/check", authMiddleware_1.default.checkToken); // pour vérifier le token
/* ************************************************************************* */
/** users */
router.get("/api/users/me", authMiddleware_1.default.checkToken, authActions_1.default.getCurrentUser); //recupère l'utilisateur connecté
router.get("/api/users/me/events", authMiddleware_1.default.checkToken, authActions_1.default.getMyEvents); //recupère l'utilisateur connecté
router.get("/api/users", authMiddleware_1.default.checkToken, authActions_1.default.browse); //recupère tous les utilisateurs
router.get("/api/users/:id", authActions_1.default.read); //recupère un seul utilisateur
router.put("/api/users/:id", authMiddleware_1.default.checkToken, authMiddleware_1.default.uploads.single("profile_picture"), authActions_1.default.editUser); // pour modifier un utilisateur
router.delete("/api/users/:id", authMiddleware_1.default.checkToken, authActions_1.default.deleteUser); // pour supprimer un utilisateur
router.delete("/api/users/:id/profile-picture", authMiddleware_1.default.checkToken, authActions_1.default.deleteProfilePicture); // pour supprimer une photo de profil
/* ************************************************************************* */
/** events */
var eventActions_1 = __importDefault(require("./modules/event/eventActions"));
router.get("/api/events", eventActions_1.default.browse); //recupère tous les événements
router.get("/api/events/:id", eventActions_1.default.read); //recupère un seul événement
router.get("/api/users/me/events", authMiddleware_1.default.checkToken, eventActions_1.default.getUserEvents);
router.post("/api/events", authMiddleware_1.default.checkToken, eventActions_1.default.add); // pour ajouter un événement
router.put("/api/events/:id", authMiddleware_1.default.checkToken, eventActions_1.default.editEvent); // pour modifier un événement
router.put("/api/events/:id/upload", authMiddleware_1.default.checkToken, authMiddleware_1.default.uploads.single("event_picture"), eventActions_1.default.uploadEventImage);
router.delete("/api/events/:id", authMiddleware_1.default.checkToken, eventActions_1.default.deleteEvent); // pour supprimer un événement
router.delete("/api/event/:id/event-picture", authMiddleware_1.default.checkToken, eventActions_1.default.deleteEventPicture); // pour supprimer une photo d'événement
/* ************************************************************************* */
/** vehicules */
var vehicleActions_1 = __importDefault(require("./modules/vehicles/vehicleActions"));
router.get("/api/vehicles", vehicleActions_1.default.browse); //recupère tous les véhicles
router.get("/api/vehicles/:id", vehicleActions_1.default.read); //recupère un seul véhicle
router.get("/api/users/me/vehicles", authMiddleware_1.default.checkToken, vehicleActions_1.default.readUserVehicles);
router.post("/api/vehicles", authMiddleware_1.default.checkToken, vehicleActions_1.default.add); // pour ajouter un véhicle
router.put("/api/vehicles/:id", authMiddleware_1.default.checkToken, vehicleActions_1.default.editVehicle); // pour modifier un véhicle
router.put("/api/vehicles/:id/upload", authMiddleware_1.default.checkToken, authMiddleware_1.default.uploads.single("vehicle_picture"), vehicleActions_1.default.uploadVehicleImage);
router.delete("/api/vehicles/:id", authMiddleware_1.default.checkToken, vehicleActions_1.default.deleteVehicle);
router.delete("/api/vehicle/:id/vehicle-picture", authMiddleware_1.default.checkToken, vehicleActions_1.default.deleteVehiclePicture); // pour supprimer une photo de véhicule
/* ************************************************************************* */
/** markers */
var markerActions_1 = __importDefault(require("./modules/marker/markerActions"));
// Marker-related routes
router.get("/api/markers", markerActions_1.default.browse); // Fetch all markers
router.post("/api/markers", authMiddleware_1.default.checkToken, markerActions_1.default.add); // Add markers
router.put("/api/markers/:id(\\d+)", authMiddleware_1.default.checkToken, markerActions_1.default.edit); // Edit a marker
router.delete("/api/markers/:id(\\d+)", authMiddleware_1.default.checkToken, markerActions_1.default.remove); // Delete a marker
// In your router.ts or wherever the route is defined
router.get("/api/markers/search", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, query, criterion, types, queryParam, criterionParam, typesParam, markers, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                console.info("Request Query Parameters:", req.query);
                _a = req.query, query = _a.query, criterion = _a.criterion, types = _a.types;
                queryParam = typeof query === "string" ? query : undefined;
                criterionParam = typeof criterion === "string" ? criterion : undefined;
                typesParam = typeof types === "string" ? types : undefined;
                console.info("Extracted Parameters in Route Handler:", {
                    query: queryParam,
                    criterion: criterionParam,
                    types: typesParam,
                });
                return [4 /*yield*/, markerRepository_1.default.searchMarkers(queryParam, criterionParam, typesParam)];
            case 1:
                markers = _b.sent();
                res.json(markers);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _b.sent();
                console.error("Error in /api/markers/search route:", err_1);
                next(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get("/api/markers/:id(\\d+)", markerActions_1.default.read);
/* ************************************************************************* */
/** Favoris */
var favorisActions_1 = __importDefault(require("./modules/favoris/favorisActions"));
router.post("/api/favoris", authMiddleware_1.default.checkToken, favorisActions_1.default.addFavoris); // Ajouter   un véhicule en favoris
router.delete("/api/favoris/:id", authMiddleware_1.default.checkToken, favorisActions_1.default.deleteFavoris); // Supprimer un favoris
router.get("/api/users/me/favoris", authMiddleware_1.default.checkToken, favorisActions_1.default.getUserFavoris); // Récupérer les favoris de l'utilisateur connecté
var Create_Crypto_Middleware_1 = __importDefault(require("./middlewares/Create_Crypto_Middleware"));
var HashPassword_1 = __importDefault(require("./middlewares/HashPassword"));
var SendMailer_Middleware_1 = __importDefault(require("./middlewares/SendMailer_Middleware"));
var VerifyEmailTrue_1 = __importDefault(require("./middlewares/VerifyEmailTrue"));
/* ************************************************************************* */
/**email */
var VerifyKeys_1 = __importDefault(require("./middlewares/VerifyKeys"));
var Verify_Crypto_Middleware_1 = __importDefault(require("./middlewares/Verify_Crypto_Middleware"));
var insertNewPassword_1 = __importDefault(require("./middlewares/insertNewPassword"));
var authEmail_1 = __importDefault(require("./modules/email/authEmail"));
var authConfirmResetPassword_1 = __importDefault(require("./modules/reset_password/authConfirmResetPassword"));
var authResetPassword_1 = __importDefault(require("./modules/reset_password/authResetPassword"));
router.post("/api/email", (0, VerifyKeys_1.default)(["to", "subject", "text"]), SendMailer_Middleware_1.default, authEmail_1.default);
router.post("/api/reset-password", (0, VerifyKeys_1.default)(["email"]), VerifyEmailTrue_1.default, Create_Crypto_Middleware_1.default, SendMailer_Middleware_1.default, authResetPassword_1.default);
router.post("/api/reset-password/confirm", (0, VerifyKeys_1.default)(["token", "newPassword"]), Verify_Crypto_Middleware_1.default, HashPassword_1.default, insertNewPassword_1.default, SendMailer_Middleware_1.default, authConfirmResetPassword_1.default);
exports.default = router;
