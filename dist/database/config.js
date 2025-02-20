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
exports.usePoolConnection = void 0;
exports.useComplexConnection = useComplexConnection;
/**
 * Import des .env pour l'utilisation
 */
require("dotenv/config");
var promise_1 = __importDefault(require("mysql2/promise"));
// ✅ Stockage du pool dans une variable globale
var pool = null;
/**
 * Fonction pour initialiser le pool avec gestion des erreurs
 */
function initializePool() {
    if (!pool) {
        try {
            pool = promise_1.default.createPool({
                host: process.env.DB_HOST || "localhost",
                port: Number(process.env.DB_PORT || "3306"),
                user: process.env.DB_USER || "root",
                password: process.env.DB_PASSWORD || "password",
                database: process.env.DB_NAME || "DB_AESF",
                waitForConnections: true, // ✅ Attend qu'une connexion soit disponible au lieu de planter
                connectionLimit: 10, // ✅ Maximum 10 connexions simultanées
                queueLimit: 0, // ✅ Aucune limite d'attente (les requêtes attendent leur tour)
            });
        }
        catch (error) {
            console.error("❌ Erreur lors de la création du pool MySQL :", error);
            throw error; // 🔥 Permet de stopper l'application si le pool ne peut pas être créé
        }
    }
    return pool;
}
/**
 * Fonction pour récupérer une connexion du pool avec `try/catch`
 */
function useComplexConnection() {
    return __awaiter(this, void 0, void 0, function () {
        var connection, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!pool) {
                        console.error("❌ Le pool de connexions MySQL n'a pas été initialisé !");
                        throw new Error("Le pool de connexions MySQL n'a pas été initialisé !");
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, pool.getConnection()];
                case 2:
                    connection = _a.sent();
                    return [2 /*return*/, connection];
                case 3:
                    error_1 = _a.sent();
                    console.error("❌ Erreur lors de la récupération d'une connexion MySQL :", error_1);
                    throw error_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
// ✅ Initialisation du pool au démarrage
exports.usePoolConnection = initializePool();
exports.default = exports.usePoolConnection;
/* Note d'utilisation : */
// usePoolConnection
// Utilisation pour des requête simple comme :
// SELECT avec ou sans WHERE, INSERT, UPDATE, DELETE
// useComplexConnection
// Utile pour : Transactions ou plusieurs requêtes dans la même route
// Permet une utilisation manuel d'une des 10 connections possible dans le pool
// Il est cependant necessaire de refermer la connection avec :
//  finally {
//     if (connection) connection.release(); // ✅ Toujours libérer la connexion
//  }
