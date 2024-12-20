const express = require("express");
const bcrypt = require("bcryptjs");
const pool = require("../db");
const router = express.Router();

// Login Page
router.get("/login", (req, res) => {
  res.sendFile("views/login.html", { root: "." });
});

// Handle Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await pool.query("SELECT * FROM admin WHERE username = ?", [username]);
    if (rows.length === 0) return res.send("Invalid username or password!");

    const admin = rows[0];
    const match = await bcrypt.compare(password, admin.password_hash);
    console.log(match);
    console.log("Received password:", password);
    console.log("Hashed password:", admin.password_hash);
    if (match) {
      req.session.isAdmin = true;
      res.redirect("/admin/dashboard");
    } else {
      res.send("Invalid username or password!");
    }
  } catch (err) {
    res.status(500).send("Error logging in.");
    //res.status(500).send(err);
    console.error("Error logging in:", err);
  }
});

// Admin Dashboard
router.get("/dashboard", (req, res) => {
  if (!req.session.isAdmin) return res.redirect("/admin/login");
  res.sendFile("views/dashboard.html", { root: "." });
});

// Add News
router.post("/add-news", async (req, res) => {
  if (!req.session.isAdmin) return res.redirect("/admin/login");

  const { title, content } = req.body;
  try {
    await pool.query("INSERT INTO news (title, content) VALUES (?, ?)", [title, content]);
    res.redirect("/admin/dashboard");
  } catch (err) {
    res.status(500).send("Error adding news.");
  }
});

// Fetch News for Display
router.get("/api/news", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM news ORDER BY published_date DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).send("Error fetching news.");
  }
});

module.exports = router;
