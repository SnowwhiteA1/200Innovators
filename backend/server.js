const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// 🔗 MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",       // default MySQL user
  password: "WaronaMak@01",       // put your MySQL password if you set one
  database: "online_store"
});

// Test DB connection
db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL database");
  }
});

// ---------------- REGISTER API ----------------
app.post("/register", (req, res) => {
  console.log("📥 Request received");

  const { name, sirname, email, password } = req.body;

  // 1️⃣ Validation
  if (!name || !sirname || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!email.includes("@")) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters" });
  }

  // 2️⃣ Insert into database
  const sql = `
    INSERT INTO users (name, sirname, email, password)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [name, sirname, email, password], (err, result) => {
    if (err) {
      console.error("❌ Error saving user:", err);
      return res.status(500).json({ message: "Database error" });
    }

    console.log("✅ User saved to database, ID:", result.insertId);

    res.status(201).json({
      message: "Registration successful",
      userId: result.insertId
    });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
