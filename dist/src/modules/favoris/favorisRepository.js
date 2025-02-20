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
var FavorisRepository = /** @class */ (function () {
    function FavorisRepository() {
    }
    FavorisRepository.prototype.addFavoris = function (userId, markerId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, client_1.default.query("INSERT INTO favoris (user_id, marker_id) VALUES (?, ?)", [userId, markerId])];
                    case 1:
                        result = (_a.sent())[0];
                        return [2 /*return*/, result.insertId];
                    case 2:
                        error_1 = _a.sent();
                        console.error("Erreur lors de l'ajout du favori:", error_1);
                        throw new Error("Impossible d'ajouter le favori.");
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FavorisRepository.prototype.deleteFavoris = function (id, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, client_1.default.query("DELETE FROM favoris WHERE id = ? AND user_id = ?", [id, userId])];
                    case 1:
                        result = (_a.sent())[0];
                        return [2 /*return*/, result.affectedRows > 0];
                    case 2:
                        error_2 = _a.sent();
                        console.error("Erreur lors de la suppression du favori:", error_2);
                        throw new Error("Impossible de supprimer le favori.");
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FavorisRepository.prototype.getUserFavoris = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var rows, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, client_1.default.query("SELECT \n          f.id AS favoris_id, \n          m.id, \n          ST_X(m.position) AS lat,\n          ST_Y(m.position) AS lng,\n          m.user_id,\n          m.label,\n          m.details\n         FROM favoris f\n         INNER JOIN marker m ON f.marker_id = m.id\n         WHERE f.user_id = ?", [userId])];
                    case 1:
                        rows = (_a.sent())[0];
                        return [2 /*return*/, rows.map(function (row) { return ({
                                favoris_id: row.favoris_id,
                                id: row.id,
                                lat: row.lat,
                                lng: row.lng,
                                coord: [row.lat, row.lng],
                                user_id: row.user_id,
                                label: row.label,
                                details: row.details, // Ne pas parser, c'est déjà un objet
                            }); })];
                    case 2:
                        error_3 = _a.sent();
                        console.error("Erreur lors de la récupération des favoris de l'utilisateur:", error_3);
                        throw new Error("Impossible de récupérer les favoris de l'utilisateur.");
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FavorisRepository.prototype.getFavorisById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var rows, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, client_1.default.query("SELECT * FROM favoris WHERE id = ?", [id])];
                    case 1:
                        rows = (_a.sent())[0];
                        return [2 /*return*/, rows[0]];
                    case 2:
                        error_4 = _a.sent();
                        console.error("Erreur lors de la récupération du favori par ID:", error_4);
                        throw new Error("Impossible de récupérer le favori par ID.");
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return FavorisRepository;
}());
exports.default = new FavorisRepository();
