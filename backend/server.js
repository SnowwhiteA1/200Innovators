const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Allows JSON data

// Register API
app.post("/register", (req, res) => {
  console.log("📥 Request received from frontend");

  const { name, sirname, email, password } = req.body;
  console.log("📦 Data received:", req.body);

  // 1️⃣ Validation: empty fields
  if (!name || !sirname || !email || !password) {
    console.log("❌ Validation failed: Missing fields");
    return res.status(400).json({
      message: "All fields are required"
    });
  }

  // 2️⃣ Email validation
  if (!email.includes("@")) {
    console.log("❌ Validation failed: Invalid email");
    return res.status(400).json({
      message: "Invalid email address"
    });
  }

  // 3️⃣ Password validation
  if (password.length < 6) {
    console.log("❌ Validation failed: Weak password");
    return res.status(400).json({
      message: "Password must be at least 6 characters"
    });
  }

  // 4️⃣ Simulated save (database later)
  const newUser = {
    id: Date.now(),
    name,
    sirname,
    email
  };

  console.log("✅ User registered successfully:", newUser);

  // 5️⃣ Success response
  res.status(201).json({
    message: "Registration successful",
    user: newUser
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
