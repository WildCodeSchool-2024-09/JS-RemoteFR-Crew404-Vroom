"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_fs_1 = __importDefault(require("node:fs"));
var node_path_1 = __importDefault(require("node:path"));
var authRepository_1 = __importDefault(require("./authRepository"));
var register = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, authRepository_1.default.create(req.body)];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, res.status(201).json(user)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.error("❌ Erreur lors de l'inscription:", err_1);
                res.status(400).json({ message: "Email ou pseudo invalide" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var login = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, password, safeUser, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                if (!req.user) return [3 /*break*/, 2];
                _a = req.user, password = _a.password, safeUser = __rest(_a, ["password"]);
                return [4 /*yield*/, res.status(200).json(safeUser)];
            case 1:
                _b.sent();
                return [3 /*break*/, 3];
            case 2:
                res.status(401).json({ message: "Authentication failed" });
                _b.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                err_2 = _b.sent();
                next(err_2);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var browse = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var users, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, authRepository_1.default.readAll()];
            case 1:
                users = _a.sent();
                return [4 /*yield*/, res.status(200).json(users)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                next(err_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var read = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, password, safeUser, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, authRepository_1.default.read(req.params.id)];
            case 1:
                user = _a.sent();
                if (!user) return [3 /*break*/, 3];
                password = user.password, safeUser = __rest(user, ["password"]);
                return [4 /*yield*/, res.status(200).json(safeUser)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                res.status(404).json({ message: "User not found" });
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                err_4 = _a.sent();
                next(err_4);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
var editUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, _a, message, updateData, user, defaultImages, oldImagePath, updatedUser, err_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, , 7]);
                userId = req.user.id;
                _a = req.body, message = _a.message, updateData = __rest(_a, ["message"]);
                return [4 /*yield*/, authRepository_1.default.readById(userId)];
            case 1:
                user = _b.sent();
                if (!user) {
                    res.status(404).json({ message: "User not found" });
                    return [2 /*return*/];
                }
                if (req.file) {
                    defaultImages = ["cancel-img.png", "person_15439869.png", "default-event-img.png"];
                    if (user.profile_picture && !defaultImages.includes(user.profile_picture)) {
                        oldImagePath = node_path_1.default.join(__dirname, "..", "..", "..", "uploads", user.profile_picture);
                        node_fs_1.default.unlink(oldImagePath, function (err) {
                            if (err)
                                console.error("❌ Erreur lors de la suppression de l'ancienne image :", err);
                        });
                    }
                    updateData.profile_picture = req.file.filename;
                }
                if (updateData.birthdate === "") {
                    updateData.birthdate = undefined;
                }
                return [4 /*yield*/, authRepository_1.default.update(userId, updateData)];
            case 2:
                updatedUser = _b.sent();
                if (!updatedUser) return [3 /*break*/, 4];
                return [4 /*yield*/, res.status(200).json(__assign({ message: "User updated successfully", profile_picture: updateData.profile_picture }, updateData))];
            case 3:
                _b.sent();
                return [3 /*break*/, 5];
            case 4:
                res.status(404).json({ message: "User not found" });
                _b.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                err_5 = _b.sent();
                next(err_5);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
var deleteUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var deleted, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, authRepository_1.default.delete(Number(req.params.id))];
            case 1:
                deleted = _a.sent();
                if (!deleted) return [3 /*break*/, 3];
                return [4 /*yield*/, res.status(200).json({ message: "User deleted successfully" })];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                res.status(404).json({ message: "User not found" });
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                err_6 = _a.sent();
                next(err_6);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
var getCurrentUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, password, safeUser, err_7;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.email)) {
                    res.status(401).json({ message: "Utilisateur non authentifié" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, authRepository_1.default.read(req.user.email)];
            case 1:
                user = _b.sent();
                if (!user) return [3 /*break*/, 3];
                password = user.password, safeUser = __rest(user, ["password"]);
                return [4 /*yield*/, res.json(safeUser)];
            case 2:
                _b.sent();
                return [3 /*break*/, 4];
            case 3:
                res.status(404).json({ message: "Utilisateur non trouvé" });
                _b.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                err_7 = _b.sent();
                next(err_7);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
var deleteProfilePicture = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user, defaultImages, filePath, err_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                userId = Number(req.params.id);
                return [4 /*yield*/, authRepository_1.default.readById(userId)];
            case 1:
                user = _a.sent();
                if (!user) {
                    res.status(404).json({ message: "Utilisateur non trouvé" });
                    return [2 /*return*/];
                }
                defaultImages = ["cancel-img.png", "person_15439869.png", "default-event-img.png"];
                if (user.profile_picture && !defaultImages.includes(user.profile_picture)) {
                    filePath = node_path_1.default.join(__dirname, "..", "..", "..", "uploads", user.profile_picture);
                    try {
                        node_fs_1.default.unlinkSync(filePath);
                    }
                    catch (err) {
                        console.error("❌ Erreur lors de la suppression du fichier :", err);
                    }
                }
                return [4 /*yield*/, authRepository_1.default.update(userId, { profile_picture: "cancel-img.png" })];
            case 2:
                _a.sent();
                return [4 /*yield*/, res.status(200).json({ message: "Image supprimée avec succès" })];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                err_8 = _a.sent();
                next(err_8);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var getMyEvents = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var myEvents, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
                    res.status(401).json({ message: "User not authenticated" });
                }
                return [4 /*yield*/, authRepository_1.default.getMyEvent(req.user.id)];
            case 1:
                myEvents = _b.sent();
                return [4 /*yield*/, res.json(myEvents)];
            case 2:
                _b.sent();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                next(error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.default = {
    browse: browse,
    read: read,
    editUser: editUser,
    deleteUser: deleteUser,
    register: register,
    login: login,
    getCurrentUser: getCurrentUser,
    deleteProfilePicture: deleteProfilePicture,
    getMyEvents: getMyEvents,
};
