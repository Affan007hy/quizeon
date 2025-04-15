const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const adminAuth = require('../middlewares/adminAuth'); // imported with logic
const quizController = require('../controllers/quizController');
const questionController = require('../controllers/questionController');

// Remove `/admin` prefix from these routes:
router.get('/dashboard', adminAuth, adminController.getAdminDashboard);
router.get('/users', adminController.getAllUsers);
router.post('/users/:id/delete', adminController.deleteUser);

// Quiz routes
router.get('/quizzes', quizController.showQuizzes);
router.post('/quizzes/add', quizController.addQuiz);
router.get('/quizzes/edit/:id', quizController.editQuiz);
router.post('/quizzes/update/:id', quizController.updateQuiz);
router.get('/quizzes/delete/:id', quizController.deleteQuiz);

// Question routes
router.get('/questions/:quizId', questionController.showQuestions);
router.post('/questions/:quizId/add', questionController.addQuestion);
router.get('/questions/:quizId/delete/:id', questionController.deleteQuestion);

router.get('/settings', adminController.showSettings);
router.post('/settings/add-admin', adminController.addAdminUser);


module.exports = router;
