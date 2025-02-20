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
var node_crypto_1 = __importDefault(require("node:crypto"));
var config_1 = __importDefault(require("../../database/config"));
function Create_Crypto_Middleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, token, expiresAt, results, resetLink, error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    userId = (_a = req.body.dataUser) === null || _a === void 0 ? void 0 : _a.id;
                    if (!userId) {
                        res.status(500).json({ error: "Erreur interne serveur." });
                        console.error({
                            identity: "Create_Crypto_Middleware.ts",
                            type: "middleware",
                            chemin: "/server/src/middleware/Create_Crypto_Middleware.ts",
                            "❌ Nature de l'erreur": "Le middleware VerifyEmailTrue.ts n'a pas mis a disposition dataUser.",
                            cause1: "Le middleware VerifyEmailTrue.ts n'a pas été exécuté",
                            cause2: "L'id de l'utilisateur n'est pas présent et n'a pas été récupéré dans la DB.",
                        });
                        return [2 /*return*/];
                    }
                    token = node_crypto_1.default.randomBytes(32).toString("hex");
                    expiresAt = new Date(Date.now() + 3600000);
                    return [4 /*yield*/, config_1.default.query("INSERT INTO reset_password (user_id, token, expires_at) VALUES (?, ?, ?)", [userId, token, expiresAt])];
                case 1:
                    results = (_b.sent())[0];
                    if (results.affectedRows === 0) {
                        res
                            .status(400)
                            .json({ reponse: "La requête a été rejeté par la base de donnée" });
                        console.error({
                            identity: "Create_Crypto_Middleware.ts",
                            type: "middleware",
                            chemin: "/server/src/middleware/Create_Crypto_Middleware.ts",
                            "❌ Nature de l'erreur": "Rejet des infos à enregistrer par la DB SQL",
                            analyse: "A ce stade, les Keys obligatoire demandé par la table son ok",
                            cause1: "Les paramètres de la table ont changé",
                            cause2: "Le middleware VerifyKeys.ts à été modifié ou mal paramétré",
                        });
                        return [2 /*return*/];
                    }
                    resetLink = "".concat(process.env.CLIENT_URL, "/reset-password/confirm?token=").concat(token);
                    // Préparation des données pour l'envoi par email
                    // Stocker la réponse de la DB pour l'envoyer par email
                    req.body.to = req.body.email;
                    req.body.subject = "Réinitialisation de votre mot de passe";
                    req.body.html = "<p>Bonjour,</p>\n                   <p>Cliquez sur le lien ci-dessous pour r\u00E9initialiser votre mot de passe :</p>\n                   <a href=\"".concat(resetLink, "\">").concat(resetLink, "</a>\n                   <p>Ce lien expirera dans 1 heure.</p>");
                    next();
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _b.sent();
                    console.error({
                        identity: "Create_Crypto_Middleware.ts",
                        type: "middleware",
                        chemin: "/server/src/middleware/Create_Crypto_Middleware.ts",
                        "❌ Nature de l'erreur": "Erreur non gérée dans le serveur !",
                        details: error_1,
                    });
                    res.status(500).json({ error: "Erreur interne server." });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.default = Create_Crypto_Middleware;
