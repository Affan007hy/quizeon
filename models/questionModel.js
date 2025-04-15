const pool = require('../config/db');

module.exports = {
  getByQuizId: async (quizId) => {
    const result = await pool.query('SELECT * FROM questions WHERE quiz_id = $1', [quizId]);
    return result.rows;
  },

  add: async (quizId, data) => {
    const { question_text, option_a, option_b, option_c, option_d, correct_option } = data;
    await pool.query(
      `INSERT INTO questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_option)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [quizId, question_text, option_a, option_b, option_c, option_d, correct_option]
    );
  },

  delete: async (id) => {
    await pool.query('DELETE FROM questions WHERE id = $1', [id]);
  }
};
