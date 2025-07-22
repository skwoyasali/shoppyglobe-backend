const Product = require("../models/Product"); // Import Product model

// Add a new product to the database
exports.addProduct = async (req, res, next) => {
  try {
    // Extract fields from request body
    const { name, price, description, stock } = req.body;

    // Check if all required fields are provided
    if (!name || !price || !description || stock == null) {
      return res.status(400).json({ message: "All field are required" });
    }

    // Create a new product document
    const product = new Product({ name, price, description, stock });

    // Save product to the database
    await product.save();

    // Respond with success
    res.status(201).json({ message: "Product added Successfully" });
  } catch (err) {
    next(err); // Pass any error to global error handler
  }
};

// Fetch all products
exports.getAllProducts = async (req, res, next) => {
  try {
    // Find all product documents
    const products = await Product.find();

    // Respond with product list
    res.json(products);
  } catch (err) {
    next(err);
  }
};

// Fetch a single product by ID
exports.getProductById = async (req, res, next) => {
  try {
    // Get product by ID from request parameters
    const product = await Product.findById(req.params.id);

    // If product doesn't exist, return error
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Respond with product details
    res.json(product);
  } catch (err) {
    next(err);
  }
};

// Update an existing product by ID
exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, price, description, stock } = req.body;

    // Find product by ID
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update fields only if they are provided
    if (name !== undefined) product.name = name;
    if (price !== undefined) product.price = price;
    if (description !== undefined) product.description = description;
    if (stock !== undefined) product.stock = stock;

    // Save updated product to database
    const updatedProduct = await product.save();

    // Respond with updated product info
    res.status(200).json({
      message: "Product updated successfully",
      updatedProduct,
    });
  } catch (err) {
    next(err);
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;

    // Delete product by ID
    const deletedProduct = await Product.findByIdAndDelete(id);

    // If not found, respond with error
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not Found" });
    }

    // Respond with deleted product info
    res.status(200).json({ message: "Product is deleted", deletedProduct });
  } catch (err) {
    next(err);
  }
};
