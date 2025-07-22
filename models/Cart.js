const mongoose = require("mongoose"); // Import Mongoose for schema creation

// Define the schema for the Cart model
const cartSchema = new mongoose.Schema({
  // Reference to the User who owns this cart
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  // Array of items in the cart
  items: [
    {
      // Reference to the Product in the cart
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },

      // Quantity of the product in the cart
      quantity: Number,
    },
  ],
});

// Export the Cart model using the defined schema
module.exports = mongoose.model("Cart", cartSchema);
