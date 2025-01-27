import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  profile_picture: string;
  firstname: string;
  lastname: string;
  birthdate: string;
  phone_number: number;
  sold: number;
  is_admin: boolean;
};

class AuthRepository {
  // The C of CRUD - Create operation

  async create(user: Omit<User, "id">) {
    // Execute the SQL INSERT query to add a new user to the "user" table
    const [result] = await databaseClient.query<Result>(
      "insert into user (username, firstname, lastname, email, password) values (?, ?, ?, ?, ?)",
      [user.username, user.firstname, user.lastname, user.email, user.password],
    );

    // Return the ID of the newly inserted user
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: string) {
    // Execute the SQL SELECT query to retrieve a specific user by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from user where email = ?",
      [id],
    );

    // Return the first row of the result, which represents the user
    return rows[0] as User;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all users from the "user" table
    const [rows] = await databaseClient.query<Rows>("select * from user");

    // Return the array of users
    return rows as User[];
  }

  // The U of CRUD - Update operation
  async update(id: string, user: User) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE user SET username = ?, firstname = ?, lastname = ?, email = ?, password = ?, profile_picture = ?, birthdate = ?, phone_number = ?, sold = ? WHERE id = ?",
      [
        user.username,
        user.firstname,
        user.lastname,
        user.email,
        user.password,
        user.profile_picture,
        user.birthdate,
        user.phone_number,
        user.sold,
        user.id,
      ],
    );
    return result.affectedRows > 0;
  }

  // The D of CRUD - Delete operation
  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM user WHERE id = ?",
      [id],
    );
    return result.affectedRows > 0;
  }
}

export default new AuthRepository();
