import type { RequestHandler } from "express";
import favorisRepository from "./favorisRepository";

const addFavoris: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const userId = req.user.id;
    const { vehicleId } = req.body;

    if (!vehicleId) {
      res.status(400).json({ message: "L'ID du véhicule est requis." });
      return;
    }

    const insertId = await favorisRepository.addFavoris(userId, vehicleId);
    res.status(201).json({
      message: "Véhicule ajouté aux favoris avec succès.",
      id: insertId,
    });
  } catch (error: unknown) {
    console.error("Erreur lors de l'ajout du favori:", error);
    next(error);
  }
};

const deleteFavoris: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const userId = req.user.id;
    const favorisId = Number.parseInt(req.params.id, 10);

    if (Number.isNaN(favorisId)) {
      res.status(400).json({ message: "ID de favori invalide." });
      return;
    }

    const result = await favorisRepository.deleteFavoris(favorisId, userId);

    if (result) {
      res.status(200).json({ message: "Favori supprimé avec succès." });
    } else {
      res.status(404).json({ message: "Favori non trouvé ou non autorisé." });
    }
  } catch (error: unknown) {
    console.error("Erreur lors de la suppression du favori:", error);
    next(error);
  }
};

const getUserFavoris: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const favoris = await favorisRepository.getUserFavoris(userId);
    res.status(200).json(favoris);
  } catch (error: unknown) {
    console.error(
      "Erreur lors de la récupération des favoris de l'utilisateur:",
      error instanceof Error ? error.message : error,
    );
    next(error);
  }
};

export default {
  addFavoris,
  deleteFavoris,
  getUserFavoris,
};
