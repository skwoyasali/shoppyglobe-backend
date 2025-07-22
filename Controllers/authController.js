// Importing required modules
const jwt = require("jsonwebtoken"); // For generating and verifying JWT tokens
const bcrypt = require("bcryptjs"); // For hashing and comparing passwords
const User = require("../models/User"); // Importing the User model

// Register controller to create a new user
exports.register = async (req, res, next) => {
  try {
    // Extract name, email, and password from request body
    const { name, email, password } = req.body;

    // Check if a user with the given email already exists
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user in the database
    const user = await User.create({ name, email, password: hashedPassword });

    // Send success response
    res.status(201).json({ message: "Registered successfully" });
  } catch (err) {
    // Pass any error to the global error handler
    next(err);
  }
};

// Login controller to authenticate a user
exports.login = async (req, res, next) => {
  try {
    // Extract email and password from request body
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    // If user doesn't exist or password doesn't match, return error
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT token containing user ID
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    // Send token as response
    res.json({ token });
  } catch (err) {
    // Pass any error to the global error handler
    next(err);
  }
};
