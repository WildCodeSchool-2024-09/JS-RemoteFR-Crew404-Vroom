import type { RequestHandler } from "express";

type Event = {
  id: number;
  title: string;
  event_picture?: string | null;
  type:
    | "salon"
    | "course"
    | "musée"
    | "vente aux enchères"
    | "roadtrip"
    | "rassemblement"
    | "autre";
  date_start: string | Date;
  date_end: string | Date;
  location: {
    x: number;
    y: number;
  };
  address: string;
  description: string;
  link?: string | null;
  user_id: number;
  creator_username?: string;
};

// Import access to data
import eventRepository from "./eventRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all events
    const events = await eventRepository.readAll();

    // Respond with the events in JSON format
    res.json(events);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific event based on the provided ID
    const eventId = Number(req.params.id);
    const event = await eventRepository.getEventWithCreator(eventId);

    // If the event is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the event in JSON format
    if (event == null) {
      res.sendStatus(404);
    } else {
      res.json(event);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const editEvent: RequestHandler = async (req, res, next) => {
  try {
    const eventId = Number.parseInt(req.params.id, 10);
    const updatedEvent: Event = {
      id: eventId,
      title: req.body.title,
      event_picture: req.body.event_picture,
      type: req.body.type,
      date_start: req.body.date_start,
      date_end: req.body.date_end,
      location: {
        x: req.body.location.x,
        y: req.body.location.y,
      },
      address: req.body.address,
      description: req.body.description,
      link: req.body.link,
      user_id: req.body.user_id,
    };

    const result = await eventRepository.update(updatedEvent);

    if (result) {
      res.status(200).json({
        message: "Événement mis à jour avec succès",
        event: updatedEvent,
      });
    } else {
      res.status(404).json({ message: "Événement non trouvé" });
    }
  } catch (err) {
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the event data from the request body
    const newEvent = {
      title: req.body.title,
      type: req.body.type,
      event_picture: req.body.event_picture,
      date_start: req.body.date_start,
      date_end: req.body.date_end,
      location: {
        x: req.body.location.x,
        y: req.body.location.y,
      },
      address: req.body.address,
      description: req.body.description,
      link: req.body.link,
      user_id: req.body.user_id,
    };

    // Create the event
    const insertId = await eventRepository.create(newEvent);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted event
    res
      .status(201)
      .json({ insertId, message: "Événement créé, en route ! 🚗" });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const deleteEvent: RequestHandler = async (req, res, next) => {
  try {
    const eventId = Number.parseInt(req.params.id, 10);

    const result = await eventRepository.delete(eventId);

    if (result) {
      res.status(200).json({ message: "Événement supprimé 💥" });
    } else {
      res.status(404).json({ message: "Événement non trouvé 👀" });
    }
  } catch (err) {
    next(err);
  }
};

export default { browse, read, editEvent, add, deleteEvent };
