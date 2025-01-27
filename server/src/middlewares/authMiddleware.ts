import * as argon2 from "argon2";
import type { RequestHandler } from "express";
import authRepository from "../modules/auth/authRepository";
import jwt from "./jwtMiddleware";

const hashPwd: RequestHandler = async (req, res, next) => {
  try {
    const hash = await argon2.hash(req.body.password);
    req.body.password = hash;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const verifyPwd: RequestHandler = async (req, res, next) => {
  try {
    const user = await authRepository.read(req.body.email);

    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    if (await argon2.verify(user.password, req.body.password)) {
      console.info("Password is correct");

      const token = jwt.createToken(user);

      res
        .cookie("user_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        })
        .json({
          user: { ...user, password: undefined },
          message: "Login successful",
        });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    next(error);
  }
};

const checkToken: RequestHandler = async (req, res, next) => {
  if (!req.cookies.user_token) {
    res.status(401).json({ message: "No token provided" });
    return;
  }
  try {
    const decoded = jwt.verifyToken(req.cookies.user_token) as {
      id: number;
      email: string;
      password: string;
    };
    if (
      typeof decoded !== "string" &&
      decoded.id &&
      decoded.email &&
      decoded.password
    ) {
      req.user = decoded;
      next();
    } else {
      res.status(401).json({ message: "Invalid token" });
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

const logout: RequestHandler = (req, res) => {
  res.clearCookie("user_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });
  res.status(200).json({ message: "Déconnexion réussie" });
};

export default { hashPwd, verifyPwd, checkToken, logout };
