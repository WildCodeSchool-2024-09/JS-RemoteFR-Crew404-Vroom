import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

// 🔹 Définition du type pour un utilisateur (sans mot de passe dans les réponses)
export type AuthUser = {
  id: number;
  username: string;
  email: string;
  profile_picture: string;
  firstname: string;
  lastname: string;
  birthdate: string | Date | null;
  phone_number: number | null;
  sold: number;
  is_admin: boolean;
  password?: string;
};

// 🔹 Type d'entrée pour `create()`, sans `id`
export type NewUser = Omit<AuthUser, "id"> & { password: string };

class AuthRepository {
  // 🔹 CREATE - Ajouter un nouvel utilisateur
  async create(user: NewUser): Promise<number> {
    try {
      const [result] = await databaseClient.query<Result>(
        "INSERT INTO user (profile_picture, username, firstname, lastname, email, password) VALUES (?, ?, ?, ?, ?, ?)",
        [
          "person_15439869.png", // Valeur par défaut
          user.username,
          user.firstname,
          user.lastname,
          user.email,
          user.password,
        ],
      );
      return result.insertId;
    } catch (error) {
      console.error("❌ Erreur lors de la création de l'utilisateur:", error);
      throw new Error(`Erreur lors de la création de l'utilisateur: ${error}`);
    }
  }

  // 🔹 READ - Récupérer un utilisateur par email
  async read(email: string): Promise<AuthUser | null> {
    try {
      const [rows] = await databaseClient.query<Rows>(
        "SELECT id, username, email, profile_picture, firstname, lastname, birthdate, phone_number, sold, is_admin FROM user WHERE email = ?",
        [email],
      );
      return rows.length > 0 ? (rows[0] as AuthUser) : null;
    } catch (error) {
      console.error(
        "❌ Erreur lors de la récupération de l'utilisateur:",
        error,
      );
      throw error;
    }
  }

  // 🔹 READ - Récupérer un utilisateur par ID
  async readById(id: number): Promise<AuthUser | null> {
    try {
      const [rows] = await databaseClient.query<Rows>(
        "SELECT id, username, email, profile_picture, firstname, lastname, birthdate, phone_number, sold, is_admin FROM user WHERE id = ?",
        [id],
      );
      return rows.length > 0 ? (rows[0] as AuthUser) : null;
    } catch (error) {
      console.error(
        "❌ Erreur lors de la récupération de l'utilisateur par ID:",
        error,
      );
      throw error;
    }
  }

  // 🔹 READ - Récupérer tous les utilisateurs
  async readAll(): Promise<AuthUser[]> {
    try {
      const [rows] = await databaseClient.query<Rows>(
        "SELECT id, username, email, profile_picture, firstname, lastname, birthdate, phone_number, sold, is_admin FROM user",
      );
      return rows as AuthUser[];
    } catch (error) {
      console.error(
        "❌ Erreur lors de la récupération de tous les utilisateurs:",
        error,
      );
      throw error;
    }
  }

  // 🔹 UPDATE - Modifier un utilisateur
  async update(id: number, userUpdate: Partial<AuthUser>): Promise<boolean> {
    try {
      // 🔹 Vérifie si l'objet `userUpdate` contient des données valides
      const updateEntries = Object.entries(userUpdate).filter(
        ([_, value]) => value !== undefined,
      );

      if (updateEntries.length === 0) {
        console.warn("⚠️ Aucun champ à mettre à jour pour l'utilisateur", id);
        return false;
      }

      // 🔹 Construction dynamique de la requête SQL
      const updateFields = updateEntries
        .map(([key]) => `${key} = ?`)
        .join(", ");
      const updateValues = updateEntries.map(([_, value]) => value);
      updateValues.push(id);

      const [result] = await databaseClient.query<Result>(
        `UPDATE user SET ${updateFields} WHERE id = ?`,
        updateValues,
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error(
        "❌ Erreur lors de la mise à jour de l'utilisateur:",
        error,
      );
      throw error;
    }
  }

  // 🔹 DELETE - Supprimer un utilisateur
  async delete(id: number): Promise<boolean> {
    try {
      const [result] = await databaseClient.query<Result>(
        "DELETE FROM user WHERE id = ?",
        [id],
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error(
        "❌ Erreur lors de la suppression de l'utilisateur:",
        error,
      );
      throw error;
    }
  }

  // 🔹 READ - Récupérer les événements de l'utilisateur
  async getMyEvent(id: number): Promise<any[]> {
    try {
      const [rows] = await databaseClient.query<Rows>(
        "SELECT * FROM event WHERE user_id = ?",
        [id],
      );
      return rows;
    } catch (error) {
      console.error(
        "❌ Erreur lors de la récupération des événements de l'utilisateur:",
        error,
      );
      throw error;
    }
  }
}

export default new AuthRepository();
