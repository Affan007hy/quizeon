const Question = require('../models/questionModel');

exports.showQuestions = async (req, res) => {
  const quizId = req.params.quizId;
  const questions = await Question.getByQuizId(quizId);
  res.render('admin/questions', { questions, quizId });
};

exports.addQuestion = async (req, res) => {
  await Question.add(req.params.quizId, req.body);
  res.redirect(`/admin/questions/${req.params.quizId}`);
};

exports.deleteQuestion = async (req, res) => {
  await Question.delete(req.params.id);
  res.redirect(`/admin/questions/${req.params.quizId}`);
};
