"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer_1 = __importDefault(require("nodemailer"));
require("dotenv/config");
var transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    //   port: 587,
    //   secure: false, // true for port 465, false for other ports
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
    },
});
var mailer = transporter;
exports.default = mailer;
