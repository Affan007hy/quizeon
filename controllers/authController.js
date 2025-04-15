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

  const hashedPassword = await bcrypt.hash(password, 10);
  await User.createUser(name, email, hashedPassword);

  res.redirect("/login");
};

exports.getLogin = (req, res) => {
  res.render("login");
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByEmail(email);
    if (!user) {
      return res.send("Invalid credentials!");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.send("Invalid credentials!");
    }

    // Regenerate session for security
    req.session.regenerate((err) => {
      if (err) {
        console.error("Session regeneration error:", err);
        return res.send("Login failed. Try again.");
      }

      req.session.user = {
        id: user.id,
        name: user.name,
        email: user.email,
        joined: user.created_at || user.createdat || user.createdAt || new Date().toISOString(),
        isAdmin: user.is_admin || false,
      };

      const redirectPath = user.is_admin ? "/admin/dashboard" : "/dashboard";
      return res.redirect(redirectPath);
    });

  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).send("Server error. Please try again later.");
  }
};



exports.getDashboard = (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  res.render("dashboard", { user: req.session.user });
};

exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error("Logout error:", err);
      return res.send("Error logging out");
    }
    res.clearCookie('connect.sid'); // clear cookie
    res.redirect('/login');
  });
};