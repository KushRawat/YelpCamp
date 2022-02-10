const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/user");
const catchAsync = require("../Utilities/catchAsync");

router.get("/register", (req, res) => {
    res.render("users/register");
});

router.post(
    "/register",
    catchAsync(async (req, res) => {
        try {
            const { username, password, email } = req.body;
            const user = new User({ username, email });
            const registeredUser = await User.register(user, password);
            console.log(registeredUser);
            req.flash("success", "Welcome to YelpCamp");
            res.redirect("/campgrounds");
        } catch (err) {
            req.flash("error", err.message);
            res.redirect("/register");
        }
    })
);

router.get("/login", (req, res) => {
    res.render("users/login");
});

router.post(
    "/login",
    passport.authenticate("local", {
        failureFlash: true,
        failureRedirect: "/login",
    }),
    async (req, res) => {
        req.flash("success", "Welcome back!");
        res.redirect("/campgrounds");
    }
);

module.exports = router;
