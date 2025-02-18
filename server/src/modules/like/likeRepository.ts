import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type { Like } from "../../types/like";

class LikeRepository {
  async create(like: Omit<Like, "id">): Promise<number> {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO `like` (user_id, content_id, content_type) VALUES (?, ?, ?)",
      [like.user_id, like.content_id, like.content_type],
    );
    return result.insertId;
  }

  async delete(id: number): Promise<boolean> {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM `like` WHERE id = ?",
      [id],
    );
    return result.affectedRows > 0;
  }

  async readAllByUserId(userId: number): Promise<Like[]> {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM `like` WHERE user_id = ?",
      [userId],
    );
    return rows as Like[];
  }
}

export default new LikeRepository();
