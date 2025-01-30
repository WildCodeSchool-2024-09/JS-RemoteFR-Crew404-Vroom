import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Vehicule = {
  id: number;
  vehicule_picture?: string | null;
  type: 
    | "moto"
    | "voiture";
  status:
    | "vente"
    | "essai"
    | "indisponible";
  energy: 
    | "essence"
    | "diesel"
    | "electrique";
  user_id: string;
  model_id: number;
};

class VehiculeRepository {
  // The C of CRUD - Create operation
  async create(vehicule: Omit<Vehicule, "id">) {
    // Execute the SQL INSERT query to add a new vehicle to the "vehicle" table
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO vehicle (type, status, energy, vehicule_picture, model_id, user_id) VALUES (?, ?, ?, ?, ?, ?)",
      [
        vehicule.type,
        vehicule.status,
        vehicule.energy,
        vehicule.vehicule_picture,
        vehicule.model_id,
        vehicule.user_id,
      ],
    );

    // Return the ID of the newly inserted vehicule
    return result.insertId;
  }

  // The Rs of CRUD - Read operations
  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific vehicle by its ID
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM vehicule WHERE id = ?",
      [id],
    );

    // Return the first row of the result, which represents the vehicle
    return rows[0] as Vehicule;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all vehicles from the "vehicle" table
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM vehicle");

    // Return the array of vehicles
    return rows as Vehicule[];
  }

  // The U of CRUD - Update operation
  async update(vehicule: Vehicule) {
    const [result] = await databaseClient.query<Result>(
      `UPDATE vehicule 
       SET type = ?, status = ?, energy = ?, vehicule_picture = ?, model_id = ?, user_id = ? 
       WHERE id = ?`,
      [
        vehicule.type,
        vehicule.status,
        vehicule.energy,
        vehicule. vehicule_picture,
        vehicule.model_id,
        vehicule.user_id,
        vehicule.id,
      ],
    );

    return result.affectedRows > 0;
  }

  // The D of CRUD - Delete operation
  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM vehicle WHERE id = ?",
      [id],
    );

    return result.affectedRows > 0;
  }
}

export default new VehiculeRepository();
