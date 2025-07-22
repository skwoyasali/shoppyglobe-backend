const express = require("express"); // Import Express framework
const mongoose = require("mongoose"); // Import Mongoose for MongoDB connection
const dotenv = require("dotenv"); // Import dotenv to load environment variables
const cors = require("cors"); // Import CORS for handling cross-origin requests

// Import route handlers
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const authRoutes = require("./routes/authRoutes");

// Import error-handling middleware
const errorHandler = require("./middlewares/errorMiddleware");

// Import seed function to populate initial products
const seedProducts = require("./utils/seedProducts");

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Global Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse incoming JSON requests

// Register route handlers
app.use("/products", productRoutes); // Product-related endpoints
app.use("/cart", cartRoutes);       // Cart-related endpoints
app.use("/", authRoutes);           // Auth (register/login) endpoints

// Global Error Handling Middleware
app.use(errorHandler);

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected");

    // Seed product data once the DB is connected
    await seedProducts();

    // Start listening on the specified port
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.log(err)); // Log any connection errors
