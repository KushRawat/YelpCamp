const mongoose = require('mongoose');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 1500) + 750;
        const camp = new Campground({
            author: '620680fef0217b6214349ab2',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur dolore tempora fugit consequatur autem, sequi praesentium, iure ad sed cumque illo officia rem ducimus libero nam sint officiis. Magni, aperiam?',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ],
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/kush0704/image/upload/v1644774317/YelpCamp/ofy9cjwwr9xjgtq1bajz.jpg',
                    filename: 'YelpCamp/ofy9cjwwr9xjgtq1bajz',
                },
                {
                    url: 'https://res.cloudinary.com/kush0704/image/upload/v1644774320/YelpCamp/l7jmkb1f5cldk4xu1pn0.jpg',
                    filename: 'YelpCamp/l7jmkb1f5cldk4xu1pn0',
                },
            ],
        });
        await camp.save();
    }
};

// seedDB();
seedDB().then(() => {
    mongoose.connection.close();
});
