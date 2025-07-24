// Global error-handling middleware function
 export default (err, req, res, next) => {
  // Log the full error stack trace to the console for debugging
  console.error(err.stack);

  // Send a 500 Internal Server Error response with the error message
  res.status(500).json({
    message: err.message || "Something went wrong!", // Fallback message if none provided
  });
};
