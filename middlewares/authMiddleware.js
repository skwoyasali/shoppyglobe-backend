import jwt from "jsonwebtoken"; // Import JWT module

// Middleware to verify JWT token and authenticate user
export default (req, res, next) => {
  // Extract token from the Authorization header (e.g., "Bearer <token>")
  const token = req.headers.authorization?.split(" ")[1];

  // If token is not present, deny access
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    // Verify token using secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded user info (e.g., userId) to request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // If verification fails, respond with an error
    res.status(401).json({ message: "Invalid token" });
  }
};
