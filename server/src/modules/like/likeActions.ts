import type { RequestHandler } from "express";
import eventRepository from "../event/eventRepository";
import vehicleRepository from "../vehicles/vehicleRepository";
import likeRepository from "./likeRepository";

const addLike: RequestHandler = async (req, res, next) => {
  try {
    const newLike = {
      user_id: req.user.id,
      content_id: req.body.content_id,
      content_type: req.body.content_type,
    };
    const insertId = await likeRepository.create(newLike);
    res.status(201).json({ message: "Like ajouté avec succès!", id: insertId });
  } catch (err) {
    next(err);
  }
};

const deleteLike: RequestHandler = async (req, res, next) => {
  try {
    const likeId = Number(req.params.id);
    const result = await likeRepository.delete(likeId);
    if (result) {
      res.status(200).json({ message: "Like supprimé avec succès!" });
    } else {
      res.status(404).json({ message: "Like non trouvé" });
    }
  } catch (err) {
    next(err);
  }
};

const getUserLikes: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const likes = await likeRepository.readAllByUserId(userId);

    const favorites = [];
    for (const like of likes) {
      try {
        if (like.content_type === "vehicle") {
          const vehicle = await vehicleRepository.read(like.content_id);
          if (vehicle) {
            favorites.push({ ...vehicle, content_type: "vehicle" });
          }
        } else if (like.content_type === "event") {
          const event = await eventRepository.read(like.content_id);
          if (event) {
            favorites.push({ ...event, content_type: "event" });
          }
        }
      } catch (error) {
        console.error(
          `Erreur lors de la récupération du contenu ${like.content_type} avec l'ID ${like.content_id}:`,
          error,
        );
      }
    }

    res.json(favorites);
  } catch (err) {
    next(err);
  }
};

export default {
  addLike,
  deleteLike,
  getUserLikes,
};
