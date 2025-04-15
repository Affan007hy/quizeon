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

exports.getUserDashboard = async (req, res) => {
  try {
    const quizzesResult = await pool.query('SELECT * FROM quizzes ORDER BY id DESC');
    const quizzes = quizzesResult.rows;
    res.render('quizzes', {
      quizzes,
      user: req.session.user // pass user data if needed
    });
  } catch (err) {
    console.error('Error fetching quizzes:', err);
    res.status(500).send('Something went wrong');
  }
};

exports.startQuiz = async (req, res) => {
  const quizId = req.params.id;
  try {
    const quizResult = await pool.query("SELECT * FROM quizzes WHERE id = $1", [quizId]);
    const questionResult = await pool.query("SELECT * FROM questions WHERE quiz_id = $1", [quizId]);

    if (quizResult.rows.length === 0) {
      return res.status(404).send("Quiz not found");
    }

    res.render("startQuiz", {
      quiz: quizResult.rows[0],
      questions: questionResult.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error starting quiz");
  }
};

exports.submitQuiz = async (req, res) => {
  const { answers, quizId, startTime } = req.body;
  const start = new Date(startTime);
  const end = new Date();
  const timeTaken = Math.floor((end - start) / 1000);

  try {
    // Get questions in the SAME ORDER as displayed in the form
    const questionResult = await pool.query(
      "SELECT id, correct_option FROM questions WHERE quiz_id = $1 ORDER BY id",
      [quizId]
    );

    const questions = questionResult.rows;
    let score = 0;

    // Validate each answer
    questions.forEach((q, index) => {
      const userAnswer = answers[index]?.trim().toUpperCase();
      const correctAnswer = q.correct_option.toString().trim().toUpperCase();

      if (userAnswer === correctAnswer) {
        score++;
      }
    });

    res.render("quizResult", {
      total: questions.length,
      score,
      timeTaken,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error calculating score");
  }
};