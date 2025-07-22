# 🛒 ShoppyGlobe - E-commerce Backend API

This is the backend for **ShoppyGlobe**, a simple e-commerce application built using **Node.js**, **Express.js**, and **MongoDB**. It includes functionality for managing products, shopping carts, and user authentication.

---

## 📁 Project Structure
├── Controllers/
│ ├── authController.js
│ ├── cartController.js
│ └── productController.js
├── Middlewares/
│ ├── authMiddleware.js
│ └── errorMiddleware.js
├── Models/
│ ├── Cart.js
│ ├── Product.js
│ └── User.js
├── Routes/
│ ├── authRoutes.js
│ ├── cartRoutes.js
│ └── productRoutes.js
├── Utils/
│ └── seedProducts.js
├── .env
├── app.js
├── package.json
└── README.md
## 🧰 Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (for authentication)
- dotenv, cors, bcryptjs

---

## ⚙️ Setup Instructions

# Clone the project repository from GitHub
git clone https://github.com/skwoyasali/shoppyglobe-backend.git

# Navigate into the project directory
cd shoppyglobe-backend

# Install all required dependencies from package.json
npm install

# Start the development server using nodemon (watch mode)
npm run dev
