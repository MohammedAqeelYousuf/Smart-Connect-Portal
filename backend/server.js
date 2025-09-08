require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");
const sgMail = require("@sendgrid/mail");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const dbFile = path.join(__dirname, "mock-db.json");
let codes = {}; // store OTP temporarily

// ---------------- LOGIN ----------------
app.post("/login", async (req, res) => {
  const { email, password } = req.body;   // no role here
  const db = JSON.parse(fs.readFileSync(dbFile));

  // find by email only
  const user = db.users.find((u) => u.email === email);

  if (!user) return res.status(400).json({ error: "Invalid email or password" });

  // compare bcrypt hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });

  const payload = {
    id: user._id,
    name: user.firstName + (user.lastName ? " " + user.lastName : ""),
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

  const { password: _, ...userWithoutPassword } = user;

  res.json({ token, user: userWithoutPassword });
});

// ---------------- FORGOT PASSWORD ----------------
app.post("/send-code", async (req, res) => {
  const { email } = req.body;
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  codes[email] = code;

  const msg = {
    to: email,
    from: "kash963852@gmail.com", //  verified in SendGrid
    subject: "SmartCon Password Reset Code",
    text: `Your verification code is ${code}`,
  };

  try {
    await sgMail.send(msg);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send email" });
  }
});

app.post("/verify-code", (req, res) => {
  const { email, code } = req.body;
  if (codes[email] === code) {
    delete codes[email];
    res.json({ success: true });
  } else {
    res.status(400).json({ error: "Invalid code" });
  }
});

// ---------------- RESET PASSWORD ----------------
app.post("/reset-password", async (req, res) => {
  const { email, password } = req.body;
  const db = JSON.parse(fs.readFileSync(dbFile));
  const user = db.users.find((u) => u.email === email);

  if (!user) return res.status(404).json({ error: "User not found" });

  // hash new password
  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;

  fs.writeFileSync(dbFile, JSON.stringify(db, null, 2));

  const payload = {
    id: user.id,
    name: user.firstName + (user.lastName ? " " + user.lastName : ""),
    email: user.email,
    role: user.role,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.json({ token });
});

// ---------------- USERS (for testing) ----------------
app.get("/users", (req, res) => {
  const db = JSON.parse(fs.readFileSync(dbFile));
  res.json(db.users.map(u => ({ ...u, password: "****" }))); // hide password
});

app.listen(5000, () => console.log("Server running on port 5000"));
