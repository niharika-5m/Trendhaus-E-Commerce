require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

console.log("Starting server...");

app.use(cors());
app.use(express.json());

// DB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.log("DB error:", err));

// Product model
const productSchema = new mongoose.Schema({
  name: String,
  price: Number
});
const Product = mongoose.model("Product", productSchema);

// User model
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});
const User = mongoose.model("User", userSchema);

// Board model
const boardSchema = new mongoose.Schema({
  name: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }]
});
const Board = mongoose.model("Board", boardSchema);

// Routes
app.get("/", (req, res) => {
  res.send("Server working ✅");
});

// Products
app.get("/api/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.post("/api/products", async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
});

// Auth
app.post("/api/auth/signup", async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({
    email: req.body.email,
    password: hashed
  });
  res.json(user);
});

app.post("/api/auth/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json("User not found");

  const valid = await bcrypt.compare(req.body.password, user.password);
  if (!valid) return res.status(400).json("Invalid password");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "secret");
  res.json({ token });
});

// Boards
app.post("/api/boards", async (req, res) => {
  const board = await Board.create({
    name: req.body.name,
    user: req.body.userId
  });
  res.json(board);
});

app.post("/api/boards/save", async (req, res) => {
  const board = await Board.findById(req.body.boardId);
  if (!board) return res.status(404).json("Board not found");

  if (!board.products.includes(req.body.productId)) {
    board.products.push(req.body.productId);
  }

  await board.save();
  res.json(board);
});

app.get("/api/boards/:userId", async (req, res) => {
  const boards = await Board.find({ user: req.params.userId })
    .populate("products");
  res.json(boards);
});

// Start server
app.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});