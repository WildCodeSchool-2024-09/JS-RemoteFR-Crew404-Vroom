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
var config_1 = __importDefault(require("../../database/config"));
function Verify_Crypto_Middleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var dataToken, deleteToken, dataUser, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    // Vérification supplémentaire, les clé token et newPassword sont-elles présentes ?
                    if (!req.body.token || !req.body.newPassword) {
                        res.status(400).json({ error: "Requête invalide." });
                        console.error({
                            identity: "Verify_Crypto_Middleware.ts",
                            type: "middleware",
                            chemin: "/server/src/middleware/Verify_Crypto_Middleware.ts",
                            "❌ Nature de l'erreur": "Requête invalide.",
                            cause1: "Les champs token et ou newPassword sont absents.",
                        });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, config_1.default.query("SELECT * FROM reset_password WHERE token = ?", [req.body.token])];
                case 1:
                    dataToken = (_a.sent())[0];
                    // Vérification si le token est valide
                    // Si la DB nous renvois quelque chose, c'est que le token est valide et existe
                    if (!Array.isArray(dataToken) || dataToken.length === 0) {
                        res.status(403).json({ error: "Token invalide." });
                        console.error({
                            identity: "Verify_Crypto_Middleware.ts",
                            type: "middleware",
                            chemin: "/server/src/middleware/Verify_Crypto_Middleware.ts",
                            "❌ Nature de l'erreur": "Token invalide.",
                            cause1: "Le token n'existe pas dans la DB.",
                            explication1: "La requête SQL n'a pas retourné de résultat.",
                            explication2: "Le token n'existe donc pas dans la DB.",
                            explication3: "On n'a pas besoin de vérifier la date d'expiration si le token n'existe pas.",
                        });
                        return [2 /*return*/];
                    }
                    if (!(new Date(dataToken[0].expires_at) < new Date())) return [3 /*break*/, 3];
                    return [4 /*yield*/, config_1.default.query("DELETE FROM reset_password WHERE token = ?", [req.body.token])];
                case 2:
                    deleteToken = (_a.sent())[0];
                    if (deleteToken.length === 0) {
                        res.status(500).json({
                            error: "Erreur interne serveur + Token expiré. Veuillez refaire la demande.",
                        });
                        console.error({
                            identity: "Verify_Crypto_Middleware.ts",
                            type: "middleware",
                            chemin: "/server/src/middleware/Verify_Crypto_Middleware.ts",
                            "❌ Nature de l'erreur": "Erreur interne serveur.",
                            cause1: "La requête SQL DELETE n'a pas fonctionné.",
                            explication1: "La date d'expiration du token est inférieure à la date actuelle.",
                            explication2: "Le token n'est plus valide.",
                            explication3: "Le server a essayé de supprimer le token de la DB et cela a échoué.",
                            explication4: "Le token n'a donc pas été supprimé de la DB.",
                        });
                        return [2 /*return*/];
                    }
                    res
                        .status(403)
                        .json({ message: "Token expiré. Veuillez refaire la demande." });
                    console.error({
                        identity: "Verify_Crypto_Middleware.ts",
                        type: "middleware",
                        chemin: "/server/src/middleware/Verify_Crypto_Middleware.ts",
                        "❌ Nature de l'erreur": "Token expiré.",
                        cause1: "Le token est expiré.",
                        explication1: "La date d'expiration du token est inférieure à la date actuelle.",
                        explication2: "Le token n'est plus valide.",
                        action: "Le server va donc supprimer le token de la DB.",
                    });
                    return [2 /*return*/];
                case 3:
                    // Préparation du passwort à être transmis au middleware Hash_Password.ts
                    req.body.password = req.body.newPassword;
                    return [4 /*yield*/, config_1.default.query("SELECT * FROM user WHERE id = ?", [dataToken[0].user_id])];
                case 4:
                    dataUser = (_a.sent())[0];
                    // Mise a disposition des données de l'utilisateur dans le général
                    req.body.dataUser = dataUser[0];
                    // Ajout des champs obligatoir pour l'envoi de l'email
                    req.body.to = dataUser[0].email;
                    req.body.subject = "Réinitialisation de votre mot de passe";
                    req.body.html = "<p>Bonjour,</p>\n                    <p>Votre mot de passe a \u00E9t\u00E9 r\u00E9initialis\u00E9 avec succ\u00E8s.</p>\n                    <p>Si vous n'\u00EAtes pas \u00E0 l'origine de cette demande, veuillez contacter notre service client.</p>";
                    next();
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    console.error({
                        identity: "Verify_Crypto_Middleware.ts",
                        type: "middleware",
                        chemin: "/server/src/middleware/Verify_Crypto_Middleware.ts",
                        "❌ Nature de l'erreur": "Erreur non gérée dans le serveur !",
                        details: error_1,
                    });
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.default = Verify_Crypto_Middleware;
