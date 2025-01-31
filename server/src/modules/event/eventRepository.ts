import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

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
};

class EventRepository {
  // The C of CRUD - Create operation

  async create(event: Omit<Event, "id">) {
    // Execute the SQL INSERT query to add a new event to the "event" table
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO event (title, type, event_picture, date_start, date_end, location, address, description, link, user_id) VALUES (?, ?, ?, ?, ?, POINT(?, ?), ?, ?, ?, ?)",
      [
        event.title,
        event.type,
        event.event_picture,
        event.date_start,
        event.date_end,
        event.location.x,
        event.location.y,
        event.address,
        event.description,
        event.link,
        event.user_id,
      ],
    );

    // Return the ID of the newly inserted event
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific event by its ID
    const [rows] = await databaseClient.query<Rows>(
      `SELECT e.*, u.username as creator_username
       FROM event e
       JOIN user u ON e.user_id = u.id
       WHERE e.id = ?`,
      [id],
    );

    // Return the first row of the result, which represents the event
    return rows[0] as Event & { creator_username: string };
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all events from the "event" table
    const [rows] = await databaseClient.query<Rows>(`
      SELECT e.*, u.username as creator_username
      FROM event e
      JOIN user u ON e.user_id = u.id
    `);

    // Return the array of events
    return rows as (Event & { creator_username: string })[];
  }

  //   The U of CRUD - Update operation

  async update(id: number, eventUpdate: Partial<Event>) {
    let updateFields = Object.entries(eventUpdate)
      .filter(([key, value]) => value !== undefined && key !== "location")
      .map(([key, _]) => `${key} = ?`)
      .join(", ");

    const updateValues = Object.entries(eventUpdate)
      .filter(([key, value]) => value !== undefined && key !== "location")
      .map(([_, value]) => value);

    if (eventUpdate.location) {
      updateFields += ", location = ST_GeomFromText(?)";
      updateValues.push(
        `POINT(${eventUpdate.location.x} ${eventUpdate.location.y})`,
      );
    }

    updateValues.push(id);

    const [result] = await databaseClient.query<Result>(
      `UPDATE event SET ${updateFields} WHERE id = ?`,
      updateValues,
    );

    return result.affectedRows > 0;
  }

  // The D of CRUD - Delete operation
  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM event WHERE id = ?",
      [id],
    );

    return result.affectedRows > 0;
  }

  async getEventWithCreator(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT e.*, u.username as creator_username
      FROM event e
      JOIN user u ON e.user_id = u.id
      WHERE e.id = ?
    `,
      [id],
    );
    return rows[0] as Event & { creator_username: string };
  }
}

export default new EventRepository();
