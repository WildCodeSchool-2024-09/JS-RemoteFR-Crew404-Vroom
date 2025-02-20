"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.uploads = void 0;
var node_path_1 = __importDefault(require("node:path"));
var argon2 = __importStar(require("argon2"));
var multer_1 = __importDefault(require("multer"));
var authRepository_1 = __importDefault(require("../modules/auth/authRepository"));
var jwtMiddleware_1 = __importDefault(require("./jwtMiddleware"));
// 🔹 Configuration de Multer pour le stockage des fichiers uploadés
var configMulter = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        var uploadDir = "./uploads";
        if (file.fieldname === "event_picture")
            uploadDir = "./uploads/events";
        if (file.fieldname === "vehicle_picture")
            uploadDir = "./uploads/vehicles";
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        var uniqueSuffix = "".concat(Date.now(), "-").concat(Math.round(Math.random() * 99999999));
        var filename = "".concat(file.fieldname, "-").concat(uniqueSuffix).concat(node_path_1.default.extname(file.originalname));
        // ✅ Assurer que req.uploadedFiles est bien défini
        if (!req.uploadedFiles) {
            req.uploadedFiles = {}; // ✅ Correction pour que TypeScript reconnaisse `uploadedFiles`
        }
        req.uploadedFiles[file.fieldname] = filename;
        cb(null, filename);
    },
});
exports.uploads = (0, multer_1.default)({ storage: configMulter });
// 🔹 Middleware pour hacher le mot de passe avant de l'enregistrer
var hashPwd = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                if (!!req.body.password) return [3 /*break*/, 2];
                return [4 /*yield*/, res.status(400).json({ message: "Password is required" })];
            case 1:
                _b.sent();
                return [2 /*return*/];
            case 2:
                _a = req.body;
                return [4 /*yield*/, argon2.hash(req.body.password)];
            case 3:
                _a.password = _b.sent();
                next();
                return [3 /*break*/, 5];
            case 4:
                error_1 = _b.sent();
                console.error("❌ Erreur lors du hachage du mot de passe :", error_1);
                next(error_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
// 🔹 Middleware pour vérifier le mot de passe lors de la connexion
var verifyPwd = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, isPasswordValid, token, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 10, , 11]);
                if (!(!req.body.email || !req.body.password)) return [3 /*break*/, 2];
                return [4 /*yield*/, res.status(400).json({ message: "Email and password are required" })];
            case 1:
                _a.sent();
                return [2 /*return*/];
            case 2: return [4 /*yield*/, authRepository_1.default.read(req.body.email)];
            case 3:
                user = _a.sent();
                if (!(!user || !user.password)) return [3 /*break*/, 5];
                return [4 /*yield*/, res.status(401).json({ message: "Invalid email or password" })];
            case 4:
                _a.sent();
                return [2 /*return*/];
            case 5: return [4 /*yield*/, argon2.verify(user.password, req.body.password)];
            case 6:
                isPasswordValid = _a.sent();
                if (!!isPasswordValid) return [3 /*break*/, 8];
                return [4 /*yield*/, res.status(401).json({ message: "Invalid email or password" })];
            case 7:
                _a.sent();
                return [2 /*return*/];
            case 8:
                console.info("✅ Password is correct");
                token = jwtMiddleware_1.default.createToken(user);
                return [4 /*yield*/, res
                        .cookie("user_token", token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "production",
                        sameSite: "strict",
                    })
                        .json({
                        user: { id: user.id, email: user.email }, // ✅ `password` retiré ici
                        message: "Login successful",
                    })];
            case 9:
                _a.sent();
                return [3 /*break*/, 11];
            case 10:
                error_2 = _a.sent();
                next(error_2);
                return [3 /*break*/, 11];
            case 11: return [2 /*return*/];
        }
    });
}); };
// 🔹 Middleware pour vérifier la validité du token JWT
var checkToken = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var decoded, error_3;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!!((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.user_token)) return [3 /*break*/, 2];
                return [4 /*yield*/, res.status(401).json({ message: "No token provided" })];
            case 1:
                _b.sent();
                return [2 /*return*/];
            case 2:
                _b.trys.push([2, 5, , 7]);
                decoded = jwtMiddleware_1.default.verifyToken(req.cookies.user_token);
                if (!(!decoded || !decoded.id || !decoded.email)) return [3 /*break*/, 4];
                return [4 /*yield*/, res.status(401).json({ message: "Invalid token" })];
            case 3:
                _b.sent();
                return [2 /*return*/];
            case 4:
                req.user = { id: decoded.id, email: decoded.email }; // ✅ Correction pour éviter l'erreur TypeScript
                next();
                return [3 /*break*/, 7];
            case 5:
                error_3 = _b.sent();
                return [4 /*yield*/, res.status(401).json({ message: "Invalid token" })];
            case 6:
                _b.sent();
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
// 🔹 Middleware pour gérer la déconnexion
var logout = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, res.clearCookie("user_token", {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    path: "/",
                })];
            case 1:
                _a.sent();
                return [4 /*yield*/, res.status(200).json({ message: "Déconnexion réussie" })];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
// 🔹 Export du module
exports.default = { hashPwd: hashPwd, verifyPwd: verifyPwd, checkToken: checkToken, logout: logout, uploads: exports.uploads };
