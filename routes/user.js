const express = require("express");
const passport = require("passport");
const router = express.Router();
const catchAsync = require("../Utilities/catchAsync");

const users = require("../controllers/users");

router.route("/register")
    .get(users.renderRegister)
    .post(catchAsync(users.register));

router.route("/login")
    .get(users.renderLogin)
    .post(passport.authenticate("local", {failureFlash: true, failureRedirect: "/login"}), users.login);
    
router.post("/logout", users.logout);

module.exports = router;
