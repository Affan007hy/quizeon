const pool = require('../config/db');

module.exports = {
  getAll: async () => {
    const result = await pool.query('SELECT * FROM quizzes ORDER BY created_at DESC');
    return result.rows;
  },

  getById: async (id) => {
    const result = await pool.query('SELECT * FROM quizzes WHERE id = $1', [id]);
    return result.rows[0];
  },

  create: async ({ title, category, time_limit, num_questions }) => {
    await pool.query(
      'INSERT INTO quizzes (title, category, time_limit, num_questions) VALUES ($1, $2, $3, $4)',
      [title, category, time_limit, num_questions]
    );
  },

  update: async (id, { title, category, time_limit, num_questions }) => {
    await pool.query(
      'UPDATE quizzes SET title=$1, category=$2, time_limit=$3, num_questions=$4 WHERE id=$5',
      [title, category, time_limit, num_questions, id]
    );
  },


  delete: async (id) => {
    await pool.query('DELETE FROM quizzes WHERE id=$1', [id]);
  }
};
