require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const pgSession = require('connect-pg-simple')(session);
const pgPool = require('./config/db');

const app = express();
const port = process.env.PORT || 3000;

// Define Base URL
app.locals.BASE_URL = "/";  // ✅ This makes BASE_URL available in all views

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    store: new pgSession({
        pool: pgPool,
        tableName: 'sessions',
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        secure: false // true if HTTPS
    }
}));

app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});


// Set EJS as View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const adminRoutes = require('./routes/adminRoutes');
app.use('/admin', adminRoutes);

// Routes
const authRoutes = require("./routes/authRoutes");
app.use(authRoutes);

// Start Server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
