const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { isAuthenticated } = require('../middlewares/checkIsLoggedIn');

router.get("/", (req, res) => {
  res.render("index", { BASE_URL: "/" });
});
router.get("/register", authController.getRegister);
router.post("/register", authController.postRegister);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/dashboard", isAuthenticated, authController.getDashboard);
router.get("/logout", authController.logout);

module.exports = router;
