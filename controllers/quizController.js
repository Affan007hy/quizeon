const Quiz = require('../models/quizModel');
const pool = require('../config/db');

exports.showQuizzes = async (req, res) => {
  const quizzes = await Quiz.getAll();
  res.render('admin/quizzes', { quizzes });
};

exports.addQuiz = async (req, res) => {
  const { title, category, time_limit, num_questions } = req.body;

  await pool.query(
    'INSERT INTO quizzes (title, category, time_limit, num_questions) VALUES ($1, $2, $3, $4)',
    [title, category, time_limit, num_questions]
  );

  res.redirect('/admin/quizzes');
};


exports.editQuiz = async (req, res) => {
  const quiz = await Quiz.getById(req.params.id);
  res.render('admin/editQuiz', { quiz });
};

exports.updateQuiz = async (req, res) => {
  await Quiz.update(req.params.id, req.body);
  res.redirect('/admin/quizzes');
};

exports.deleteQuiz = async (req, res) => {
  await Quiz.delete(req.params.id);
  res.redirect('/admin/quizzes');
};
