const mongoose = require("mongoose");

mongoose
    .connect("mongodb://localhost:27017/relationshipDemo", {
        useNewUrlParser: true,
    })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!");
    })
    .catch((err) => {
        console.log("MONGO CONNECTION ERROR!");
        console.log(err);
    });

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ["Spring", "Summer", "Fall", "Winter"],
    },
});

const farmSchema = new mongoose.Schema({
    name: String,
    city: String,
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

const Product = mongoose.model("Product", productSchema);
const Farm = mongoose.model("Farm", farmSchema);

// Product.insertMany([
//     { name: "number1", price: 50, season: "Spring" },
//     { name: "number2", price: 60, season: "Summer" },
//     { name: "number3", price: 70, season: "Fall" },
// ]);

// const makeFarm = async () => {
//     const farm = new Farm({ name: "Farm 1", city: "City 1" });
//     const melon = await Product.findOne({ name: "number1" });
//     farm.products.push(melon)
//     farm.save()
//     console.log(farm)
// };

// makeFarm()

const addProduct = async () => {
    const farm = await Farm.findOne({ name: "Farm 1" });
    const watermelon = await Product.findOne({ name: "number1" });
    farm.products.push(watermelon);
    await farm.save();
    console.log(farm);
};

addProduct()
