import fs from "node:fs";
import path from "node:path";
import type { RequestHandler } from "express";
import authRepository from "./authRepository";

const register: RequestHandler = async (req, res, next) => {
  try {
    const user = await authRepository.create(req.body);
    await res.status(201).json(user);
  } catch (err) {
    console.error("❌ Erreur lors de l'inscription:", err);
    res.status(400).json({ message: "Email ou pseudo invalide" });
  }
};

const login: RequestHandler = async (req, res, next) => {
  try {
    if (req.user) {
      const { password, ...safeUser } = req.user;
      await res.status(200).json(safeUser);
    } else {
      res.status(401).json({ message: "Authentication failed" });
    }
  } catch (err) {
    next(err);
  }
};

const browse: RequestHandler = async (req, res, next) => {
  try {
    const users = await authRepository.readAll();
    await res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const user = await authRepository.read(req.params.id);
    if (user) {
      const { password, ...safeUser } = user;
      await res.status(200).json(safeUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    next(err);
  }
};

const editUser: RequestHandler = async (req, res, next) => {
  try {
    const userId = (req as any).user.id;
    const { message, ...updateData } = req.body;

    const user = await authRepository.readById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (req.file) {
      const defaultImages = [
        "cancel-img.png",
        "person_15439869.png",
        "default-event-img.png",
      ];
      if (
        user.profile_picture &&
        !defaultImages.includes(user.profile_picture)
      ) {
        const oldImagePath = path.join(
          __dirname,
          "..",
          "..",
          "..",
          "uploads",
          user.profile_picture,
        );
        fs.unlink(oldImagePath, (err) => {
          if (err)
            console.error(
              "❌ Erreur lors de la suppression de l'ancienne image :",
              err,
            );
        });
      }
      updateData.profile_picture = req.file.filename;
    }

    if (updateData.birthdate === "") {
      updateData.birthdate = undefined;
    }

    const updatedUser = await authRepository.update(userId, updateData);
    if (updatedUser) {
      await res.status(200).json({
        message: "User updated successfully",
        profile_picture: updateData.profile_picture,
        ...updateData,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    next(err);
  }
};

const deleteUser: RequestHandler = async (req, res, next) => {
  try {
    const deleted = await authRepository.delete(Number(req.params.id));
    if (deleted) {
      await res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    next(err);
  }
};

const getCurrentUser: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user?.email) {
      res.status(401).json({ message: "Utilisateur non authentifié" });
      return;
    }

    const user = await authRepository.read(req.user.email);
    if (user) {
      const { password, ...safeUser } = user; // ✅ Suppression propre du `password`
      await res.json(safeUser);
    } else {
      res.status(404).json({ message: "Utilisateur non trouvé" });
    }
  } catch (err) {
    next(err);
  }
};

const deleteProfilePicture: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);
    const user = await authRepository.readById(userId);

    if (!user) {
      res.status(404).json({ message: "Utilisateur non trouvé" });
      return;
    }

    const defaultImages = [
      "cancel-img.png",
      "person_15439869.png",
      "default-event-img.png",
    ];

    if (user.profile_picture && !defaultImages.includes(user.profile_picture)) {
      const filePath = path.join(
        __dirname,
        "..",
        "..",
        "..",
        "uploads",
        user.profile_picture,
      );
      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        console.error("❌ Erreur lors de la suppression du fichier :", err);
      }
    }

    await authRepository.update(userId, { profile_picture: "cancel-img.png" });

    await res.status(200).json({ message: "Image supprimée avec succès" });
  } catch (err) {
    next(err);
  }
};

const getMyEvents: RequestHandler = async (req, res, next) => {
  try {
    if (!(req as any).user?.id) {
      res.status(401).json({ message: "User not authenticated" });
    }

    const myEvents = await authRepository.getMyEvent(req.user.id);
    await res.json(myEvents);
  } catch (error) {
    next(error);
  }
};

export default {
  browse,
  read,
  editUser,
  deleteUser,
  register,
  login,
  getCurrentUser,
  deleteProfilePicture,
  getMyEvents,
};
