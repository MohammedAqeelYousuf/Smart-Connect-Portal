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
let codes = {}; 
app.post("/login", (req, res) => {
  const { email, password, role } = req.body;
  const db = JSON.parse(fs.readFileSync(dbFile));
  const user = db.users.find(
    (u) => u.email === email && u.role.toLowerCase() === role.toLowerCase()
  );

  if (!user) return res.status(400).json({ error: "Invalid email or role" });

  // Compare using bcrypt if hashed, fallback to plain text
  const passwordMatches =
    bcrypt.compareSync(password, user.password) || password === user.password;

  if (!passwordMatches)
    return res.status(400).json({ error: "Invalid password" });

  const payload = {
    id: user.id,
    name: user.firstName + (user.lastName ? " " + user.lastName : ""),
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

  const { password: _, ...userWithoutPassword } = user;

  res.json({ token, user: userWithoutPassword });
});



app.post("/send-code", async (req, res) => {
  const { email } = req.body;
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  codes[email] = code;

  const msg = {
    to: email,
    from: "kash963852@gmail.com", 
    subject: "SmartCon Password Reset Code",
    text: `Your verification code is ${code}`
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


app.post("/reset-password", (req, res) => {
  const { email, password } = req.body;
  const db = JSON.parse(fs.readFileSync(dbFile));
  const user = db.users.find(u => u.email === email);

  if (!user) return res.status(404).json({ error: "User not found" });


  user.password = password;

  fs.writeFileSync(dbFile, JSON.stringify(db, null, 2));

  
  const payload = {
    id: user.id,
    name: user.firstName + (user.lastName ? " " + user.lastName : ""),
    email: user.email,
    role: user.role
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.json({ token });
});

app.get("/users", (req, res) => {
  const db = JSON.parse(fs.readFileSync(dbFile));
  res.json(db.users);
});

app.listen(5000, () => console.log("Server running on port 5000"));
