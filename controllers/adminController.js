const adminModel = require('../models/adminModel');

const getAdminDashboard = async (req, res) => {
  try {
    const searchQuery = req.query.search || ''; // get search input from query params
    const data = await adminModel.getDashboardData(searchQuery); // pass to model

    res.render('admin/dashboard', {
      title: 'Admin Dashboard',
      data,
      searchQuery,
      users: data.users || [] // make sure users is passed to avoid EJS error
    });
  } catch (error) {
    console.error('Admin Dashboard Error:', error);
    res.status(500).send('Server Error');
  }
};

const getAllUsers = async (req, res) => {
  try {
    const search = req.query.search || '';
    const users = await adminModel.searchUsers(search);
    res.render('./admin/users', {
      title: 'Manage Users',
      users,
      search
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Server error');
  }
};

const getDashboardData = async () => {
  const users = await db.query('SELECT COUNT(*) FROM users');
  //const quizzes = await db.query('SELECT COUNT(*) FROM quizzes');
  //const questions = await db.query('SELECT COUNT(*) FROM questions');
  return {
    totalUsers: users.rows[0].count,
    //totalQuizzes: quizzes.rows[0].count,
    //totalQuestions: questions.rows[0].count
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

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    await adminModel.deleteUserById(userId);
    res.redirect('/admin/users');
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send('Server error');
  }
};

const bcrypt = require('bcrypt');
const pool = require('../config/db');

const showSettings = (req, res) => {
  res.render('./admin/settings');
};

const addAdminUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new admin user
    await pool.query(
      'INSERT INTO users (name, email, password, created_at, is_admin) VALUES ($1, $2, $3, NOW(), true)',
      [name, email, hashedPassword]
    );

    res.redirect('/admin/settings');
  } catch (err) {
    console.error('Error adding admin user:', err);
    res.status(500).send("Failed to add admin user");
  }
};


module.exports = {
  searchUsers,
  getDashboardData,
  getAllUsers,
  getAdminDashboard,
  deleteUser,
  showSettings,
  addAdminUser
};
