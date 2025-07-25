import express from "express"; // Import Express framework
import auth from "../middlewares/authMiddleware.js"; // Import authentication middleware
import { addToCart, updateCartItem, removeFromCart, viewCart } from "../Controllers/cartController.js"; // Import cart controller functions

const router = express.Router(); // Create a new router instance

// Route to add a product to the cart (requires authentication)
router.post("/", auth, addToCart);

// Route to view all items in the cart (requires authentication)
router.get("/", auth, viewCart);

// Route to update quantity of a cart item (requires authentication)
router.put("/", auth, updateCartItem);

// Route to remove an item from the cart (requires authentication)
router.delete("/", auth, removeFromCart);

// Export the router to be used in the main app
export default router;
