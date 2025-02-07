import type { RequestHandler } from "express";
import type { Marker } from "../../types";
import markerRepository from "./markerRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    const markers = await markerRepository.getMarkers();
    res.json(markers); // No return statement
  } catch (err) {
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    const markerId = Number(req.params.id);
    if (Number.isNaN(markerId)) {
      res.status(400).json({ error: "Invalid marker ID" }); // No return statement
      return; // Use return to exit the function
    }

    const marker = await markerRepository.getMarkerById(markerId);
    if (marker == null) {
      res.sendStatus(404); // No return statement
    } else {
      res.json(marker); // No return statement
    }
  } catch (err) {
    next(err);
  }
};

// The A of BREAD - Add operation
const add: RequestHandler = async (req, res, next) => {
  try {
    const newMarker: Omit<Marker, "id"> = {
      lat: req.body.lat,
      lng: req.body.lng,
      label: req.body.label,
      details: req.body.details,
      user_id: req.body.user_id,
    };

    const insertId = await markerRepository.createMarker(newMarker);
    const createdMarker = await markerRepository.getMarkerById(insertId);

    if (!createdMarker) {
      throw new Error("Failed to fetch the newly created marker");
    }

    res.status(201).json(createdMarker); // No return statement
  } catch (err) {
    next(err);
  }
};

// The E of BREAD - Edit operation
const edit: RequestHandler = async (req, res, next) => {
  try {
    const markerId = Number(req.params.id);
    if (Number.isNaN(markerId)) {
      res.status(400).json({ error: "Invalid marker ID" }); // No return statement
      return; // Use return to exit the function
    }

    const updatedMarker: Marker = {
      id: markerId,
      lat: req.body.lat,
      lng: req.body.lng,
      label: req.body.label,
      details: req.body.details,
      user_id: req.body.userId,
    };

    const result = await markerRepository.updateMarker(updatedMarker);
    if (result) {
      res.status(200).json({ message: "Marker updated successfully 🎉" }); // No return statement
    } else {
      res.status(404).json({ message: "Marker not found 👀" }); // No return statement
    }
  } catch (err) {
    next(err);
  }
};

// The D of BREAD - Delete operation
const remove: RequestHandler = async (req, res, next) => {
  try {
    const markerId = Number(req.params.id);
    if (Number.isNaN(markerId)) {
      res.status(400).json({ error: "Invalid marker ID" }); // No return statement
      return; // Use return to exit the function
    }

    const result = await markerRepository.deleteMarker(markerId);
    if (result) {
      res.status(200).json({ message: "Marker deleted successfully 💥" }); // No return statement
    } else {
      res.status(404).json({ message: "Marker not found 👀" }); // No return statement
    }
  } catch (err) {
    next(err);
  }
};

const search: RequestHandler = async (req, res, next) => {
  try {
    const { query } = req.query;

    // Ensure the query is a non-empty string
    if (typeof query !== "string" || query.trim() === "") {
      res.status(400).json({ error: "Invalid query parameter" });
      return;
    }

    const markers = await markerRepository.searchMarkers(query);
    res.json(markers);
  } catch (err) {
    console.error("Failed to search markers:", err);
    next(err);
  }
};
export default { browse, read, add, edit, remove, search };
