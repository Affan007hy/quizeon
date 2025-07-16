```markdown
# 🎯 Quizeon – AI-Powered Quiz Platform

Quizeon is a full-stack, AI-ready quiz web application designed to help users learn through interactive, domain-specific quizzes. It includes a fully functional User Interface and an advanced Admin Dashboard built using the MVC architecture with clean, maintainable code. Quizeon demonstrates skills in backend development, database design, frontend integration, and admin-level control — ideal for job and internship applications.


## 🧠 Purpose

The goal of Quizeon is to create a scalable and user-friendly learning platform that:
- Allows users to take quizzes with a timed interface.
- Enables real-time scoring and result tracking.
- Empowers admins to manage quizzes, questions, and users dynamically.


## 🚀 Features

### 👤 User Panel
- User Registration & Login
- Explore quizzes by title/topic
- Timed quiz environment (countdown)
- Multiple-choice question interface
- Instant score calculation

### 🛠️ Admin Dashboard
- Secure admin login (bcrypt-authenticated)
- Dashboard overview (users, quizzes, attempts)
- Manage users (search, view, delete)
- Manage quizzes (create, update, delete)
- Assign questions to quizzes


## 🔧 Tech Stack

| Layer         | Technology              |
|---------------|--------------------------|
| Frontend      | HTML5, CSS3, JavaScript, Bootstrap |
| Backend       | Node.js, Express.js     |
| Templating    | EJS                     |
| Database      | PostgreSQL              |
| Auth & Security| bcrypt (admin auth), input validation |
| Architecture  | MVC (Model-View-Controller) |

---

## 🗃️ Folder Structure

```

quizeon-project/
│
├── .vscode/
│
├── config/
│   └── db.js                     # Database configuration (e.g., PostgreSQL setup)
│
├── controllers/                 # Handles business logic for different parts
│   ├── adminController.js
│   ├── authController.js
│   ├── questionController.js
│   └── quizController.js
│
├── middlewares/                # Custom middleware functions
│   ├── adminAuth.js
│   └── checkIsLoggedIn.js
│
├── models/                     # Database models (using Sequelize/ORM or plain SQL)
│   ├── adminModel.js
│   ├── questionModel.js
│   ├── quizModel.js
│   └── userModel.js
│
├── node_modules/               # Node.js dependencies
│
├── public/                     # Static assets (served via express.static)
│   ├── css/
│   ├── icons/
│   ├── images/
│   └── js/
│
├── routes/                     # Route definitions
│   ├── adminRoutes.js
│   └── authRoutes.js
│
├── views/                      # EJS templates (frontend UI)
│   └── admin/
│   ├── includes/               # EJS partials (header, footer, etc.)
│   ├── aboutus.ejs
│   ├── dashboard.ejs
│   ├── index.ejs
│   ├── login.ejs
│   ├── quizResult.ejs
│   ├── quizzes.ejs
│   ├── register.ejs
│   └── startQuiz.ejs
│
├── .env                        # Environment variables
├── package-lock.json           # Exact dependency tree
├── package.json                # Project metadata and dependencies
├── readme.md                   # Project documentation
└── server.js                   # Entry point for the Express app

````

---

## 🧮 Database Schema (PostgreSQL)

### `users`
- `id` (PK)
- `name`
- `email` (unique)
- `password` (hashed)
- `created_at`
- `is_admin` (boolean)

### `quizzes`
- `id` (PK)
- `title`
- `category`
- `time_limit`
- `num_questions`
- `created_at`

### `questions`
- `id` (PK)
- `quiz_id` (FK)
- `question_text`
- `option_a`, `option_b`, `option_c`, `option_d`
- `correct_option`
- `created_at`

### `sessions`
- `sid` (PK)
- `sess` (json)
- `expire`

---

## 🛠️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/Affan007hy/quizeon.git
cd quizeon
````

### 2. Install dependencies

```bash
npm install
```

### 3. Setup PostgreSQL database

* Create a new database named `quizeon`
* Create required tables (`users`, `quizzes`, `questions`, `sessions`)
* Add your connection credentials in `config/db.js`

## 3.1 Setup db.js

```js
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

pool.connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("Database connection error", err));

module.exports = pool;
```
## 3.2 Setup .env

```js
  DB_USER=postgres
  DB_HOST=localhost
  DB_NAME=quizeon
  DB_PASS=password
  DB_PORT=5432
```
### 4. Start the server

```bash
npm run dev
```

Then visit: [http://localhost:3000](http://localhost:3000)

---

## 📸 Screenshots

> (Add UI screenshots here if you're applying for a visual/design-related role)

---

## 💡 Future Scope

* Add difficulty levels and quiz filtering
* AI-based automatic question generation via API
* Leaderboards and ranking system
* Export reports in CSV/PDF format
* Email/password reset system

---

## 🔐 Admin Credentials (for testing)

> You can set one secure admin manually in your `users` table with hashed password using bcrypt.

---

## 🙋‍♂️ About the Developer

**Mohammad Affan**
📘 Diploma in Information Technology
🔧 Web Development | JavaScript | SQL | Node.js
🌐 Passionate about creating meaningful software that solves real problems.

---