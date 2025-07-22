const mongoose = require("mongoose"); // Import Mongoose for schema definition

// Define the schema for the Product model
const productSchema = new mongoose.Schema({
  // Name of the product
  name: String,

  // Price of the product
  price: Number,

  // Description of the product
  description: String,

  // Number of items in stock
  stock: Number,
});

// Export the Product model using the defined schema
module.exports = mongoose.model("Product", productSchema);
