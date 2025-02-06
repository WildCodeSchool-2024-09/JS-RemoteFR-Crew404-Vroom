import type { Result, Rows } from "../../../database/client";
import databaseClient from "../../../database/client";
import type { Marker } from "../../types";

class MarkerRepository {
  async createMarker(marker: Omit<Marker, "id">): Promise<number> {
    const query = `
      INSERT INTO marker (position, label, details, user_id)
      VALUES (ST_GeomFromText(?), ?, ?, ?)
    `;
    const values = [
      `POINT(${marker.lat} ${marker.lng})`,
      marker.label || null,
      marker.details ? JSON.stringify(marker.details) : null, // Ensure details is a valid JSON string
      marker.user_id,
    ];

    console.info("Executing query:", query);
    console.info("With values:", values);

    const [result] = await databaseClient.query<Result>(query, values);
    return result.insertId; // Return the ID of the newly created marker
  }

  async getMarkers(): Promise<Marker[]> {
    const query = `
      SELECT id, ST_X(position) AS lat, ST_Y(position) AS lng, label, details, user_id
      FROM marker
    `;
    const [rows] = await databaseClient.query<Rows>(query);

    return rows.map((row) => {
      let details = null;
      try {
        details = row.details ? JSON.parse(row.details) : null;
      } catch (error) {
        console.error("Failed to parse details:", row.details);
      }

      return {
        id: row.id,
        lat: row.lat,
        lng: row.lng,
        label: row.label,
        details,
        user_id: row.user_id,
      };
    });
  }

  async getMarkerById(id: number): Promise<Marker | null> {
    const query = `
      SELECT id, ST_X(position) AS lat, ST_Y(position) AS lng, label, details, user_id
      FROM marker
      WHERE id = ?
    `;
    const [rows] = await databaseClient.query<Rows>(query, [id]);

    if (rows.length === 0) return null;

    const row = rows[0];
    let details = null;
    try {
      details = row.details ? JSON.parse(row.details) : null;
    } catch (error) {
      console.error("Failed to parse details:", row.details);
    }

    return {
      id: row.id,
      lat: row.lat,
      lng: row.lng,
      label: row.label,
      details,
      user_id: row.user_id,
    };
  }

  async updateMarker(marker: Marker): Promise<boolean> {
    const query = `
      UPDATE marker
      SET position = ST_GeomFromText(?), label = ?, details = ?, user_id = ?
      WHERE id = ?
    `;
    const values = [
      `POINT(${marker.lat} ${marker.lng})`,
      marker.label || null,
      marker.details ? JSON.stringify(marker.details) : null,
      marker.user_id,
      marker.id,
    ];

    const [result] = await databaseClient.query<Result>(query, values);
    return result.affectedRows > 0;
  }

  async deleteMarker(id: number): Promise<boolean> {
    const query = "DELETE FROM marker WHERE id = ?";
    const [result] = await databaseClient.query<Result>(query, [id]);
    return result.affectedRows > 0;
  }

  async searchMarkers(query: string): Promise<Marker[]> {
    const sql = `
      SELECT id, ST_X(position) AS lat, ST_Y(position) AS lng, label, details, user_id
      FROM marker
      WHERE label LIKE ? OR JSON_EXTRACT(details, '$.eventCategory') LIKE ?
    `;
    const [rows] = await databaseClient.query<Rows>(sql, [
      `%${query}%`,
      `%${query}%`,
    ]);

    return rows.map((row) => {
      let details = null;
      try {
        // Ensure details is parsed correctly
        details = row.details ? JSON.parse(row.details) : null;
      } catch (error) {
        console.error("Failed to parse details:", row.details);
        details = row.details; // Fallback to the raw string if parsing fails
      }

      return {
        id: row.id,
        lat: row.lat,
        lng: row.lng,
        label: row.label,
        details,
        user_id: row.user_id,
      };
    });
  }
}

export default new MarkerRepository();
