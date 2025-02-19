import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type { Marker } from "../../types/index";

interface FavoriteItem {
  favoris_id: number;
  id: number;
  lat: number;
  lng: number;
  coord: [number, number];
  user_id: number;
  label: string;
  details: {
    eventType: string;
    date: string;
    brand: string;
    model: string;
    year: number;
    address: string;
  }; // Vous pouvez définir une interface plus précise si la structure est connue
}

type Favoris = {
  id: number;
  user_id: number;
  marker_id: number;
};

class FavorisRepository {
  async addFavoris(userId: number, markerId: number): Promise<number> {
    try {
      const [result] = await databaseClient.query<Result>(
        "INSERT INTO favoris (user_id, marker_id) VALUES (?, ?)",
        [userId, markerId],
      );
      return result.insertId;
    } catch (error: unknown) {
      console.error("Erreur lors de l'ajout du favori:", error);
      throw new Error("Impossible d'ajouter le favori.");
    }
  }

  async deleteFavoris(id: number, userId: number): Promise<boolean> {
    try {
      const [result] = await databaseClient.query<Result>(
        "DELETE FROM favoris WHERE id = ? AND user_id = ?",
        [id, userId],
      );
      return result.affectedRows > 0;
    } catch (error: unknown) {
      console.error("Erreur lors de la suppression du favori:", error);
      throw new Error("Impossible de supprimer le favori.");
    }
  }

  async getUserFavoris(userId: number): Promise<FavoriteItem[]> {
    try {
      const [rows] = await databaseClient.query<Rows>(
        `SELECT 
          f.id AS favoris_id, 
          m.id, 
          ST_X(m.position) AS lat,
          ST_Y(m.position) AS lng,
          m.user_id,
          m.label,
          m.details
         FROM favoris f
         INNER JOIN marker m ON f.marker_id = m.id
         WHERE f.user_id = ?`,
        [userId],
      );
      return (rows as FavoriteItem[]).map((row: FavoriteItem) => ({
        favoris_id: row.favoris_id,
        id: row.id,
        lat: row.lat,
        lng: row.lng,
        coord: [row.lat, row.lng],
        user_id: row.user_id,
        label: row.label,
        details: row.details, // Ne pas parser, c'est déjà un objet
      }));
    } catch (error: unknown) {
      console.error(
        "Erreur lors de la récupération des favoris de l'utilisateur:",
        error,
      );
      throw new Error("Impossible de récupérer les favoris de l'utilisateur.");
    }
  }

  async getFavorisById(id: number): Promise<Favoris | undefined> {
    try {
      const [rows] = await databaseClient.query<Rows>(
        "SELECT * FROM favoris WHERE id = ?",
        [id],
      );
      return (rows as Favoris[])[0];
    } catch (error: unknown) {
      console.error("Erreur lors de la récupération du favori par ID:", error);
      throw new Error("Impossible de récupérer le favori par ID.");
    }
  }
}

export default new FavorisRepository();
