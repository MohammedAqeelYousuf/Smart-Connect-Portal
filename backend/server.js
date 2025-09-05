require("dotenv").config({ path: "../.env" });
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();
app.use(cors());
app.use(bodyParser.json());

let codes = {}; 
const path = require("path");
const dbFile = path.join(__dirname, "mock-db.json");



app.post("/send-code", async (req, res) => {
  const { email } = req.body;
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  codes[email] = code;

  const msg = {
    to: email,
    from: "kash963852@gmail.com", // verified in SendGrid
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


app.post("/reset-password", (req, res) => {
  const { email, password } = req.body;
  const db = JSON.parse(fs.readFileSync(dbFile));
  const user = db.users.find((u) => u.email === email);

  if (user) {
    user.password = password;
    fs.writeFileSync(dbFile, JSON.stringify(db, null, 2));
    res.json({ success: true });
  } else {
    res.status(404).json({ error: "User not found" });
  }
});


app.get("/users", (req, res) => {
  const db = JSON.parse(fs.readFileSync(dbFile));
  res.json(db.users);
});

app.listen(5000, () => console.log("Server running on port 5000"));

