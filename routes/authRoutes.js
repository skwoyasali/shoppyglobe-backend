const express = require("express"); // Import Express framework
const { register, login } = require("../Controllers/authController"); // Import controller functions
const router = express.Router(); // Create a new router instance

// Route to handle user registration
router.post("/register", register);

// Route to handle user login
router.post("/login", login);

// Export the router to be used in the main app
module.exports = router;
