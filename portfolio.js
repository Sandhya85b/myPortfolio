require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use(cors({ origin: "http://127.0.0.1:5500", credentials: true }));

app.post("/send-message", async (req, res) => {
  console.log("Received Data:", req.body);

  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    //  Fix: Use SMTP instead of service
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use `true` for port 465
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log("Email User:", process.env.EMAIL_USER);
    console.log(
      "Email Pass:",
      process.env.EMAIL_PASS ? "Loaded" : "Not Loaded"
    );

    const mailOptions = {
      from: `"${name}" <${email}>`, //  Shows sender's name
      to: process.env.EMAIL_USER,
      subject: `New Contact Message: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ message: "Failed to send message.", error });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

