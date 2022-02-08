const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username cannot be blank"],
    },
    PASSWORD: {
        type: String,
        required: [true, "Password cannot be blank"],
    },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
