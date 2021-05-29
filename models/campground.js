const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CampgroundsSchema = new Schema({
    title: String,
    price: String,
    description: String,
    location: String
})

const Campground = mongoose.model('Campground', CampgroundsSchema)

module.exports = Campground