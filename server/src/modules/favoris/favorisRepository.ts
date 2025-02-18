import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type { Vehicle } from "../../modules/vehicles/vehicleRepository";

type Favoris = {
  id: number;
  user_id: number;
  vehicle_id: number;
};

class FavorisRepository {
  async addFavoris(userId: number, vehicleId: number): Promise<number> {
    try {
      const [result] = await databaseClient.query<Result>(
        "INSERT INTO favoris (user_id, vehicle_id) VALUES (?, ?)",
        [userId, vehicleId],
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

  async getUserFavoris(
    userId: number,
  ): Promise<(Favoris & { vehicle: Vehicle })[]> {
    try {
      const [rows] = await databaseClient.query<Rows>(
        `SELECT favoris.id AS favoris_id, vehicle.*
         FROM favoris
         INNER JOIN vehicle ON favoris.vehicle_id = vehicle.id
         WHERE favoris.user_id = ?`,
        [userId],
      );
      return rows as (Favoris & { vehicle: Vehicle })[];
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
