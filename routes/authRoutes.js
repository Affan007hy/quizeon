const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { isAuthenticated } = require('../middlewares/checkIsLoggedIn');
const quizController = require('../controllers/quizController')

router.get("/", (req, res) => {
  res.render("index", { BASE_URL: "/" });
});
router.get("/about", (req, res) => {
  res.render("aboutus");
});
router.get("/register", authController.getRegister);
router.post("/register", authController.postRegister);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/dashboard", isAuthenticated, authController.getDashboard);
router.get('/dashboard/quizzes', quizController.getUserDashboard)
router.get("/start-quiz/:id", isAuthenticated, quizController.startQuiz);
router.post("/dashboard/quizzes/:id/submit", quizController.submitQuiz);

router.get("/logout", authController.logout);

module.exports = router;
