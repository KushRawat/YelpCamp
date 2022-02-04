const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CampgroundsSchema = new Schema({
    title: String,
    image: String,
    price: Number,
    description: String,
    location: String,
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});

const Campground = mongoose.model("Campground", CampgroundsSchema);

module.exports = Campground;
