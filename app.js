import express from "express"; // Import Express framework
import mongoose from "mongoose"; // Import Mongoose for MongoDB connection
import dotenv from "dotenv"; // Import dotenv to load environment variables
import cors from "cors"; // Import CORS for handling cross-origin requests

// Import route handlers
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// Import error-handling middleware
import errorHandler from "./middlewares/errorMiddleware.js";

// Import seed function to populate initial products
import seedProducts from "./utils/seedProducts.js";

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
