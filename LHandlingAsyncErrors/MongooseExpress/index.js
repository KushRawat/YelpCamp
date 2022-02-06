const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const AppError = require("./AppError");
const session = require("express-session");
const flash = require("connect-flash");

const sessionOptions = {
    secret: "mySecret",
    resave: false,
    saveUninitialized: false,
};
app.use(session(sessionOptions));
app.use(flash());

const Product = require("./models/product");
const Farm = require("./models/farm");

mongoose
    .connect("mongodb://localhost:27017/farmStand", { useNewUrlParser: true })
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

app.use((req, res, next) => {
    res.locals.message = req.flash("success");
    next();
});

// FARM ROUTES

app.get("/farms", async (req, res) => {
    const farms = await Farm.find({});
    res.render("farms/index", { farms });
});

app.get("/farms/new", (req, res) => {
    res.render("farms/new");
});

app.get("/farms/:id", async (req, res) => {
    const farm = await Farm.findById(req.params.id).populate("products");
    // console.log(farm);
    res.render("farms/show", { farm });
});

app.delete("/farms/:id", async (req, res) => {
    console.log("Deleting!");
    const farm = await Farm.findByIdAndDelete(req.params.id);
    res.redirect("/farms");
});

app.get("/farms/:id/products/new", async (req, res) => {
    const { id } = req.params;
    const farm = await Farm.findById(id);
    res.render("products/new", { categories, farm });
});

app.post("/farms/:id/products", async (req, res) => {
    //    res.send(req.body)
    const { id } = req.params;
    const farm = await Farm.findById(id);
    const { name, price, category } = req.body;
    const product = new Product({ name, price, category });
    farm.products.push(product);
    product.farm = farm;
    farm.save();
    product.save();
    res.redirect(`/farms/${id}`);
    // farm.products.push(product)
});

app.post("/farms", async (req, res) => {
    const farm = new Farm(req.body);
    await farm.save();
    req.flash("success", "Successfully created a farm");
    res.redirect("/farms");
});

// PRODUCT ROUTES

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

app.post("/products", async (req, res, next) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.redirect(`/products/${newProduct._id}`);
    } catch (err) {
        return next(err);
    }
});
// R
app.get("/products/:id", async (req, res, next) => {
    const { id } = req.params;
    const foundProduct = await Product.findById(id).populate("farm", "name");
    if (!foundProduct) {
        return next(new AppError("Product not found", 404));
    }
    // console.log(foundProduct);
    res.render("products/show", { foundProduct });
});
// U
app.get("/products/:id/edit", async (req, res, next) => {
    try {
        const { id } = req.params;
        const foundProduct = await Product.findById(id);
        if (!foundProduct) {
            throw new AppError("Product not found", 404);
        }
        res.render("products/edit", { foundProduct, categories });
    } catch (err) {
        next(err);
    }
});

app.put("/products/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateProduct = await Product.findByIdAndUpdate(id, req.body, {
            runValidators: true,
            new: true,
        });
        res.redirect(`/products/${updateProduct._id}`);
    } catch (err) {
        next(err);
    }
});
// D
app.delete("/products/:id", async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect("/products");
});

// MONGOOSE ERROR

const handleValidatioErr = (err) => {
    console.dir(err);
    return new AppError(`Validation Failed...${err.message}`, 400);
};

app.use((err, req, res, next) => {
    console.log(err.name);
    if (err.name === "ValidationError") err = handleValidatioErr(err);
    next(err);
});

// BASIC ERROR HANDLING MIDDLEWARE

app.use((err, req, res, next) => {
    const { status = 500, message = "Something went wrong" } = err;
    res.status(status).send(message);
});

app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000");
});
