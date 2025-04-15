const db = require('../config/db');

const getDashboardData = async () => {
  const users = await db.query('SELECT COUNT(*) FROM users');
  const quizzes = await db.query('SELECT COUNT(*) FROM quizzes');
  const questions = await db.query('SELECT COUNT(*) FROM questions');
  return {
    totalUsers: users.rows[0].count,
    totalQuizzes: quizzes.rows[0].count,
    totalQuestions: questions.rows[0].count
  };
};

const searchUsers = async (searchQuery) => {
  if (!searchQuery) {
    const result = await db.query('SELECT * FROM users ORDER BY name ASC');
    return result.rows;
  }

  const result = await db.query(
    `SELECT * FROM users WHERE LOWER(name) LIKE LOWER($1) OR LOWER(email) LIKE LOWER($1) ORDER BY name ASC`,
    [`%${searchQuery}%`]
  );

  return result.rows;
};

const deleteUserById = async (id) => {
  await db.query('DELETE FROM users WHERE id = $1', [id]);
};


module.exports = {
  searchUsers,
  getDashboardData,
  deleteUserById
};