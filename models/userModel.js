const pool = require("../config/db");
class User {
  static async createUser(name, email, hashedPassword) {
    return pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hashedPassword]
    );
  }

  static async findByEmail(email) {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0]; // Return single user
  }
}

module.exports = User;
