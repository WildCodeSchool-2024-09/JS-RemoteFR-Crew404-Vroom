import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Event = {
  id: number;
  title: string;
  event_picture: string | null;
  type:
    | "salon"
    | "course"
    | "musée"
    | "vente aux enchères"
    | "roadtrip"
    | "rassemblement";
  date_start: string;
  date_end: string;
  location: { x: number; y: number };
  address: string;
  description: string | null;
  link: string | null;
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
      "select * from item where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the event
    return rows[0] as Event;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all events from the "event" table
    const [rows] = await databaseClient.query<Rows>("select * from event");

    // Return the array of events
    return rows as Event[];
  }

  //   The U of CRUD - Update operation

  async update(event: Event) {
    const [result] = await databaseClient.query<Result>(
      `UPDATE event 
       SET event_picture = ?, title = ?, type = ?, date_start = ?, date_end = ?, address = ?, description = ?, link = ? 
       WHERE id = ?`,
      [
        event.event_picture,
        event.title,
        event.type,
        event.date_start,
        event.date_end,
        event.address,
        event.description,
        event.link,
        event.id,
      ],
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
}

export default new EventRepository();
