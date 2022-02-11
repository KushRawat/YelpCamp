const mongoose = require("mongoose");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 1500) + 750;
        const camp = new Campground({
            author: "620680fef0217b6214349ab2",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: "https://source.unsplash.com/collection/483251/1600x900",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur dolore tempora fugit consequatur autem, sequi praesentium, iure ad sed cumque illo officia rem ducimus libero nam sint officiis. Magni, aperiam?",
            price,
        });
        await camp.save();
    }
};

seedDB();
// seedDB().then(() => {
//     mongoose.connection.close()
// })
