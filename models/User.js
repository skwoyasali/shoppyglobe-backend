const mongoose = require("mongoose"); // Import Mongoose for schema creation

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  // User's full name
  name: String,

  // User's email (must be unique)
  email: { type: String, unique: true },

  // Hashed password for the user
  password: String,
});

// Export the User model using the defined schema
module.exports = mongoose.model("User", userSchema);
