const mongoose = require("mongoose");
const Review = require("./review");
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
    title: String,
    image: String,
    price: Number,
    description: String,
    location: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});

CampgroundSchema.post("findOneAndDelete", async (campground) => {
    if (campground.reviews.length) {
        const res = await Review.deleteMany({
            _id: { $in: campground.reviews },
        });
        // console.log(res);
    }
    // console.log(campground);
});

const Campground = mongoose.model("Campground", CampgroundSchema);

module.exports = Campground;
