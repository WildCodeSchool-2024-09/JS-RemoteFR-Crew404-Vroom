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
var client_1 = __importDefault(require("../../../database/client"));
var AuthRepository = /** @class */ (function () {
    function AuthRepository() {
    }
    // 🔹 CREATE - Ajouter un nouvel utilisateur
    AuthRepository.prototype.create = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, client_1.default.query("INSERT INTO user (profile_picture, username, firstname, lastname, email, password) VALUES (?, ?, ?, ?, ?, ?)", [
                                "person_15439869.png", // Valeur par défaut
                                user.username,
                                user.firstname,
                                user.lastname,
                                user.email,
                                user.password,
                            ])];
                    case 1:
                        result = (_a.sent())[0];
                        return [2 /*return*/, result.insertId];
                    case 2:
                        error_1 = _a.sent();
                        console.error("❌ Erreur lors de la création de l'utilisateur:", error_1);
                        throw new Error("Erreur lors de la cr\u00E9ation de l'utilisateur: ".concat(error_1));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // 🔹 READ - Récupérer un utilisateur par email
    AuthRepository.prototype.read = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var rows, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, client_1.default.query("SELECT id, username, email, profile_picture, firstname, lastname, birthdate, phone_number, sold, is_admin FROM user WHERE email = ?", [email])];
                    case 1:
                        rows = (_a.sent())[0];
                        return [2 /*return*/, rows.length > 0 ? rows[0] : null];
                    case 2:
                        error_2 = _a.sent();
                        console.error("❌ Erreur lors de la récupération de l'utilisateur:", error_2);
                        throw error_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // 🔹 READ - Récupérer un utilisateur par ID
    AuthRepository.prototype.readById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var rows, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, client_1.default.query("SELECT id, username, email, profile_picture, firstname, lastname, birthdate, phone_number, sold, is_admin FROM user WHERE id = ?", [id])];
                    case 1:
                        rows = (_a.sent())[0];
                        return [2 /*return*/, rows.length > 0 ? rows[0] : null];
                    case 2:
                        error_3 = _a.sent();
                        console.error("❌ Erreur lors de la récupération de l'utilisateur par ID:", error_3);
                        throw error_3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // 🔹 READ - Récupérer tous les utilisateurs
    AuthRepository.prototype.readAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rows, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, client_1.default.query("SELECT id, username, email, profile_picture, firstname, lastname, birthdate, phone_number, sold, is_admin FROM user")];
                    case 1:
                        rows = (_a.sent())[0];
                        return [2 /*return*/, rows];
                    case 2:
                        error_4 = _a.sent();
                        console.error("❌ Erreur lors de la récupération de tous les utilisateurs:", error_4);
                        throw error_4;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // 🔹 UPDATE - Modifier un utilisateur
    AuthRepository.prototype.update = function (id, userUpdate) {
        return __awaiter(this, void 0, void 0, function () {
            var updateEntries, updateFields, updateValues, result, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        updateEntries = Object.entries(userUpdate).filter(function (_a) {
                            var _ = _a[0], value = _a[1];
                            return value !== undefined;
                        });
                        if (updateEntries.length === 0) {
                            console.warn("⚠️ Aucun champ à mettre à jour pour l'utilisateur", id);
                            return [2 /*return*/, false];
                        }
                        updateFields = updateEntries.map(function (_a) {
                            var key = _a[0];
                            return "".concat(key, " = ?");
                        }).join(", ");
                        updateValues = updateEntries.map(function (_a) {
                            var _ = _a[0], value = _a[1];
                            return value;
                        });
                        updateValues.push(id);
                        return [4 /*yield*/, client_1.default.query("UPDATE user SET ".concat(updateFields, " WHERE id = ?"), updateValues)];
                    case 1:
                        result = (_a.sent())[0];
                        return [2 /*return*/, result.affectedRows > 0];
                    case 2:
                        error_5 = _a.sent();
                        console.error("❌ Erreur lors de la mise à jour de l'utilisateur:", error_5);
                        throw error_5;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // 🔹 DELETE - Supprimer un utilisateur
    AuthRepository.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, client_1.default.query("DELETE FROM user WHERE id = ?", [id])];
                    case 1:
                        result = (_a.sent())[0];
                        return [2 /*return*/, result.affectedRows > 0];
                    case 2:
                        error_6 = _a.sent();
                        console.error("❌ Erreur lors de la suppression de l'utilisateur:", error_6);
                        throw error_6;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // 🔹 READ - Récupérer les événements de l'utilisateur
    AuthRepository.prototype.getMyEvent = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var rows, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, client_1.default.query("SELECT * FROM event WHERE user_id = ?", [id])];
                    case 1:
                        rows = (_a.sent())[0];
                        return [2 /*return*/, rows];
                    case 2:
                        error_7 = _a.sent();
                        console.error("❌ Erreur lors de la récupération des événements de l'utilisateur:", error_7);
                        throw error_7;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return AuthRepository;
}());
exports.default = new AuthRepository();
