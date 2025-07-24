import express from "express"; // Import Express framework
import {
  getAllProducts,
  getProductById,
  addProduct,
  deleteProduct,
  updateProduct
} from "../Controllers/productController.js"; // Import product controller functions

const router = express.Router(); // Create a new router instance

// Route to add a new product
router.post("/", addProduct);

// Route to get all products
router.get("/", getAllProducts);

// Route to get a single product by its ID
router.get("/:id", getProductById);

// Route to delete a product by its ID
router.delete("/:id", deleteProduct);

// Route to update a product by its ID
router.put("/:id", updateProduct);

// Export the router to be used in the main app
export default router;
