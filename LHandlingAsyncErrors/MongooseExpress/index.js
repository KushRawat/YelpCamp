const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const AppError = require("./AppError");

const Product = require("./models/product");

mongoose
  .connect("mongodb://localhost:27017/farmStand2", { useNewUrlParser: true })
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!");
  })
  .catch((err) => {
    console.log("MONGO CONNECTION ERROR!");
    console.log(err);
  });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const categories = ["fruit", "vegetable", "dairy"];

// USING REST & CRUD
app.get("/products", async (req, res) => {
  const products = await Product.find({});
  res.render("products/index", { products });
});
// C
app.get("/products/new", (req, res) => {
  res.render("products/new", { categories });
});

app.post("/products", async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.redirect(`/products/${newProduct._id}`);
});
// R
app.get("/products/:id", async (req, res, next) => {
  const { id } = req.params;
  const foundProduct = await Product.findById(id);
  if (!foundProduct) {
    return next(new AppError("Product not found", 404));
  }
  console.log(foundProduct);
  res.render("products/show", { foundProduct });
});
// U
app.get("/products/:id/edit", async (req, res, next) => {
  const { id } = req.params;
  const foundProduct = await Product.findById(id);
  if (!foundProduct) {
    return next(new AppError("Product not found", 404));
  }
  res.render("products/edit", { foundProduct, categories });
});

app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const updateProduct = await Product.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.redirect(`/products/${updateProduct._id}`);
});
// D
app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await Product.findByIdAndDelete(id);
  res.redirect("/products");
});

// BASIC ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong" } = err;
  res.status(status).send(message);
});

app.listen(3000, () => {
  console.log("APP IS LISTENING ON PORT 3000");
});
