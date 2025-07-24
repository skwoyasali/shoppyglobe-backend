import Cart from "../models/Cart.js"; // Import Cart model
import Product from "../models/Product.js"; // Import Product model

// Add an item to the user's cart
export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body; // Extract productId and quantity from request body

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Find cart for the logged-in user
    let cart = await Cart.findOne({ userId: req.user.userId });

    // If cart doesn't exist, create a new one
    if (!cart) cart = new Cart({ userId: req.user.userId, items: [] });

    // Check if product already exists in cart
    const index = cart.items.findIndex(item => item.productId.equals(productId));

    if (index >= 0) {
      // If it exists, increment the quantity
      cart.items[index].quantity += quantity;
    } else {
      // If it doesn't exist, add it to the cart
      cart.items.push({ productId, quantity });
    }

    // Save the updated cart
    await cart.save();

    // Respond with the updated cart
    res.status(200).json(cart);
  } catch (err) {
    // Forward any error to the error handler middleware
    next(err);
  }
};

// View the current user's cart
export const viewCart = async (req, res, next) => {
  try {
    const userId = req.user.userId; // Get userId from JWT middleware

    // Find user's cart and populate product details in each item
    const cart = await Cart.findOne({ userId }).populate('items.productId');

    // If cart doesn't exist or is empty
    if (!cart || cart.items.length === 0) {
      return res.status(404).json({ message: "🛒 Cart is empty or not found." });
    }

    // Respond with cart items
    res.status(200).json({
      message: "✅ Cart items retrieved successfully",
      cartItems: cart.items,
    });
  } catch (err) {
    next(err);
  }
};

// Update quantity of a specific item in the cart
export const updateCartItem = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;

    // Find cart for the logged-in user
    const cart = await Cart.findOne({ userId: req.user.userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // Find index of the product in the cart
    const index = cart.items.findIndex(item => item.productId.equals(productId));

    if (index >= 0) {
      // Update the quantity
      cart.items[index].quantity = quantity;
      await cart.save(); // Save updated cart
      res.status(200).json(cart);
    } else {
      // If item doesn't exist
      res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (err) {
    next(err);
  }
};

// Remove an item from the cart
export const removeFromCart = async (req, res, next) => {
  try {
    const { productId } = req.body;

    // Find user's cart
    const cart = await Cart.findOne({ userId: req.user.userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // Remove the item by filtering it out
    cart.items = cart.items.filter(item => !item.productId.equals(productId));

    // Save updated cart
    await cart.save();

    // Respond with updated cart
    res.status(200).json(cart);
  } catch (err) {
    next(err);
  }
};
