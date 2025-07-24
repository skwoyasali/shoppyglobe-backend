// seedProducts.js - Adds dummy product data to MongoDB
import Product from "../models/Product.js";

const seedProducts = async () => {
 const products = [
  {
    name: "Laptop Stand",
    price: 899,
    description: "Adjustable aluminum laptop stand for desks.",
    stock: 70,
  },
  {
    name: "External SSD 512GB",
    price: 5999,
    description: "High-speed portable SSD with USB 3.2 Gen 2 interface.",
    stock: 20,
  },
  {
    name: "Smartphone Holder",
    price: 299,
    description: "360-degree rotatable phone holder for car dashboard.",
    stock: 100,
  },
  {
    name: "Portable Charger 20000mAh",
    price: 1399,
    description: "Fast charging power bank with dual USB outputs.",
    stock: 35,
  },
  {
    name: "Noise Cancelling Headphones",
    price: 3499,
    description: "Over-ear headphones with active noise cancellation and 30h battery life.",
    stock: 18,
  },
  {
    name: "Oppo Reno 11",
    price: 200,
    description: "Best Phone for Photos and Gaming.",
    stock: 20,
  },
  {
    name: "Wireless Mouse",
    price: 499,
    description: "Ergonomic wireless mouse with adjustable DPI and silent clicks.",
    stock: 50,
  },
  {
    name: "Bluetooth Speaker",
    price: 1299,
    description: "Portable Bluetooth speaker with deep bass and 10-hour playtime.",
    stock: 40,
  },
  {
    name: "Mechanical Keyboard",
    price: 2899,
    description: "RGB mechanical keyboard with hot-swappable keys.",
    stock: 25,
  },
  {
    name: "HD Webcam",
    price: 999,
    description: "1080p USB webcam with built-in microphone and low-light correction.",
    stock: 30,
  },
];

  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      await Product.insertMany(products);
      console.log("✅ Products seeded successfully.");
    } else {
      console.log("⚠️ Products already exist. Skipping seeding.");
    }
  } catch (err) {
    console.error("❌ Error seeding products:", err);
  }
};

export default seedProducts;
