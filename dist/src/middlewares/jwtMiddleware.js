"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
// Ici, je créer dans ma variable d'environnement un mdp pour mon encodage de mon token
var APP_SECRET = process.env.APP_SECRET;
/**
 * Je créer un token grâce au package jsonwebtoken.
 */
var createToken = function (payload) {
    return jsonwebtoken_1.default.sign(payload, APP_SECRET, { expiresIn: "8h" });
};
/**
 * Je vais vérifier mon token
 */
var verifyToken = function (token) {
    return jsonwebtoken_1.default.verify(token, APP_SECRET);
};
exports.default = { createToken: createToken, verifyToken: verifyToken };
