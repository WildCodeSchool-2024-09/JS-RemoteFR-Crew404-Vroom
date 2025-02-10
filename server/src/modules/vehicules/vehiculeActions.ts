import type { RequestHandler } from "express";
import markerRepository from "../marker/markerRepository";

type Vehicule = {
  id: number;
  vehicule_picture?: string;
  // type: "moto" | "voiture";
  // status: "vente" | "essai" | "indisponible";
  // energy: "essence" | "diesel" | "electrique";
  user_id: string;
  location: string;
  model_id: number;
  year: number;
  brand: string;
  model: string;
};

// Import access to data
import vehiculeRepository from "./vehiculeRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all vehicules
    const vehicules = await vehiculeRepository.readAll();

    // Respond with the vehicules in JSON format
    res.json(vehicules);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific vehicule based on the provided ID
    const vehiculeId = Number(req.params.id);
    const vehicule = await vehiculeRepository.read(vehiculeId);

    // If the vehicule is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the vehicule in JSON format
    if (vehicule == null) {
      res.sendStatus(404);
    } else {
      res.json(vehicule);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const editVehicule: RequestHandler = async (req, res, next) => {
  try {
    const vehiculeId = Number.parseInt(req.params.id, 10);
    const updatedVehicule: Vehicule = {
      id: vehiculeId,
      vehicule_picture: req.body.vehicule_picture,
      // energy: req.body.energy,
      model_id: req.body.model_id,
      // status: req.body.status,
      // type: req.body.type,
      location: req.body.location,
      user_id: req.body.user_id,
      year: req.body.year,
      brand: req.body.brand,
      model: req.body.model,
    };

    const result = await vehiculeRepository.update(updatedVehicule);

    if (result) {
      res.status(200).json({
        message: "Véhicule mis à jour avec succès",
        vehicule: updatedVehicule,
      });
    } else {
      res.status(404).json({ message: "Véhicule non trouvé" });
    }
  } catch (err) {
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the vehicle data from the request body
    const newVehicule = {
      vehicule_picture: req.body.vehicule_picture,
      // energy: req.body.energy,
      // status: req.body.status,
      // type: req.body.type,
      model_id: 1,
      location: req.body.location,
      user_id: String(req.user.id),
      year: req.body.year,
      brand: req.body.brand,
      model: req.body.model,
      isMap: req.body.isMap,
    };

    if (!newVehicule.isMap) {
      // add marker
      const marker = {
        lat: req.body.coord[1],
        lng: req.body.coord[0],
        label: `Type: ${req.body.type}, Date: ${req.body.date_start} to ${req.body.date_end}`,
        details: req.body.details,
        user_id: req.user.id,
      };

      await markerRepository.createMarker(marker);
    }

    // Create the vehicule
    const insertId = await vehiculeRepository.create(newVehicule);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted vehicle
    res.status(201).json({
      insertId,
      message: "Véhicule créé avec succès! 🚗",
    });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Delete operation
const deleteVehicule: RequestHandler = async (req, res, next) => {
  try {
    const vehiculeId = Number.parseInt(req.params.id, 10);

    const result = await vehiculeRepository.delete(vehiculeId);

    if (result) {
      res.status(200).json({ message: "Véhicule supprimé 💥" });
    } else {
      res.status(404).json({ message: "Véhicule non trouvé 👀" });
    }
  } catch (err) {
    next(err);
  }
};

const readUserVehicules: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const vehicules = await vehiculeRepository.readUserVehicules(userId);

    res.json(vehicules);
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  read,
  editVehicule,
  add,
  deleteVehicule,
  readUserVehicules,
};
