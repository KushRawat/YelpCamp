const express = require("express");
const passport = require("passport");
const router = express.Router();
const catchAsync = require("../Utilities/catchAsync");

const users = require("../controllers/users");

router.get("/register", users.renderRegister);

router.post("/register", catchAsync(users.register));

router.get("/login", users.renderLogin);

router.post(
    "/login",
    passport.authenticate("local", {
        failureFlash: true,
        failureRedirect: "/login",
    }),
    users.login
);

router.post("/logout", users.logout);

module.exports = router;
