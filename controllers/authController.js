const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

exports.getRegister = (req, res) => {
  res.render("register");
};

exports.postRegister = async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findByEmail(email);
  
  if (existingUser) {
    return res.send("User already exists!");
  }

  await User.createUser(name, email, password);
  res.redirect("/login");
};

exports.getLogin = (req, res) => {
  res.render("login");
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findByEmail(email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.send("Invalid credentials!");
  }

  req.session.user = user;
  res.redirect("/dashboard");
};

exports.getDashboard = (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  res.render("dashboard", { user: req.session.user });
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
