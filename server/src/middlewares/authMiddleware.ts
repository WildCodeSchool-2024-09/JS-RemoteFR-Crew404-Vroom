import path from "node:path";
import * as argon2 from "argon2";
import type { RequestHandler } from "express";
import multer from "multer";
import authRepository from "../modules/auth/authRepository";
import jwt from "./jwtMiddleware";

// 🔹 Configuration de Multer pour le stockage des fichiers uploadés
const configMulter = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadDir = "./uploads";

    if (file.fieldname === "event_picture") uploadDir = "./uploads/events";
    if (file.fieldname === "vehicle_picture") uploadDir = "./uploads/vehicles";

    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 99999999)}`;
    const filename = `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`;

    // ✅ Assurer que req.uploadedFiles est bien défini
    if (!req.uploadedFiles) {
      (req as any).uploadedFiles = {}; // ✅ Correction pour que TypeScript reconnaisse `uploadedFiles`
    }
    (req as any).uploadedFiles[file.fieldname] = filename;

    cb(null, filename);
  },
});

export const uploads = multer({ storage: configMulter });

// 🔹 Middleware pour hacher le mot de passe avant de l'enregistrer
const hashPwd: RequestHandler = async (req, res, next) => {
  try {
    if (!req.body.password) {
      await res.status(400).json({ message: "Password is required" });
      return;
    }

    req.body.password = await argon2.hash(req.body.password);
    next();
  } catch (error) {
    console.error("❌ Erreur lors du hachage du mot de passe :", error);
    next(error);
  }
};

// 🔹 Middleware pour vérifier le mot de passe lors de la connexion
const verifyPwd: RequestHandler = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      await res
        .status(400)
        .json({ message: "Email and password are required" });
      return;
    }

    const user = await authRepository.read(req.body.email);
    if (!user || !user.password) {
      // ✅ Vérification du champ facultatif
      await res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const isPasswordValid = await argon2.verify(
      user.password,
      req.body.password,
    );
    if (!isPasswordValid) {
      await res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    console.info("✅ Password is correct");

    const token = jwt.createToken(user);

    await res
      .cookie("user_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .json({
        user: { id: user.id, email: user.email }, // ✅ `password` retiré ici
        message: "Login successful",
      });
  } catch (error) {
    next(error);
  }
};

// 🔹 Middleware pour vérifier la validité du token JWT
const checkToken: RequestHandler = async (req, res, next) => {
  if (!req.cookies?.user_token) {
    await res.status(401).json({ message: "No token provided" });
    return;
  }

  try {
    const decoded = jwt.verifyToken(req.cookies.user_token) as {
      id: number;
      email: string;
    };

    if (!decoded || !decoded.id || !decoded.email) {
      await res.status(401).json({ message: "Invalid token" });
      return;
    }

    (req as any).user = { id: decoded.id, email: decoded.email }; // ✅ Correction pour éviter l'erreur TypeScript
    next();
  } catch (error) {
    await res.status(401).json({ message: "Invalid token" });
  }
};

// 🔹 Middleware pour gérer la déconnexion
const logout: RequestHandler = async (req, res) => {
  await res.clearCookie("user_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  await res.status(200).json({ message: "Déconnexion réussie" });
};

// 🔹 Export du module
export default { hashPwd, verifyPwd, checkToken, logout, uploads };
