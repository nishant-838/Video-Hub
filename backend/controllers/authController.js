const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

exports.register = async (req, res) => {
  console.log(req.body);

  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json("User already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Send welcome email
    try {
      await sendEmail(
        email,
        "🎉 Welcome to VideoHub",
        `
        <div style="font-family: Arial, sans-serif; padding:20px;">
            <h2>Welcome to VideoHub, ${username}! 🎉</h2>

            <p>Your account has been created successfully.</p>

            <p>
                Thank you for joining <strong>VideoHub</strong>.
                You can now upload videos, watch content, and connect with creators.
            </p>

            <br>

            <a
              href="http://localhost:5173"
              style="
                background:#ff0000;
                color:white;
                padding:12px 20px;
                text-decoration:none;
                border-radius:5px;
              "
            >
              Visit VideoHub
            </a>

            <br><br>

            <p>Happy Streaming! 🎥</p>

            <hr>

            <small>This is an automated email from VideoHub.</small>
        </div>
        `
      );

      console.log("Welcome email sent successfully.");
    } catch (emailError) {
      console.log("Email sending failed:", emailError.message);

      // User is already registered, so don't stop registration
    }

    res.status(201).json({
      message: "User registered successfully",
      user,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).json("User not found");

    const valid = await bcrypt.compare(
      password,
      user.password
    );

    if (!valid)
      return res.status(400).json("Wrong password");

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET
    );

    res.json({
      token,
      user,
    });

  } catch (err) {
    res.status(500).json(err);
  }
};