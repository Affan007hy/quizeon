const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { checkisLoggedIn } = require('../middlewares/checkIsLoggedIn');

router.get("/", (req, res) => {
  res.render("index", { BASE_URL: "/" });
});
router.get("/register", authController.getRegister);
router.post("/register", authController.postRegister);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/dashboard", checkisLoggedIn, authController.getDashboard);
router.get("/logout", authController.logout);

module.exports = router;
