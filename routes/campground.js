const express = require("express");
const router = express.Router();

const catchAsync = require("../Utilities/catchAsync");

const { isLoggedIn, validateCampground, isAuthor } = require("../middleware");

const Campground = require("../models/campground");

router.get(
    "/",
    catchAsync(async (req, res) => {
        const campgrounds = await Campground.find({});
        res.render("campgrounds/index", { campgrounds });
    })
);
// C
router.get("/new", isLoggedIn, (req, res) => {
    // if (!req.isAuthenticated()) {
    //     req.flash("error", "You need to be signed in");
    //     return res.redirect("/login");
    // }
    res.render("campgrounds/new");
});

router.post(
    "/",
    isLoggedIn,
    validateCampground,
    catchAsync(async (req, res, next) => {
        // if (!req.body.campground)
        //     throw new ExpressError("Invalid Campground Data", 400);
        const campground = new Campground(req.body.campground);
        campground.author = req.user._id;
        await campground.save();
        req.flash("success", "Successfully created a campground!");
        res.redirect(`/campgrounds/${campground._id}`);
    })
);

// R
router.get(
    "/:id",
    catchAsync(async (req, res) => {
        const campground = await Campground.findById(req.params.id)
            .populate({ path: "reviews", populate: { path: "author" } })
            .populate("author");
        // console.log(campground);
        if (!campground) {
            req.flash("error", "Cannot find that campground!");
            res.redirect("/campgrounds");
        }
        res.render("campgrounds/show", { campground });
    })
);
// U
router.get(
    "/:id/edit",
    isLoggedIn,
    isAuthor,
    catchAsync(async (req, res) => {
        const { id } = req.params;
        const campground = await Campground.findById(id);
        if (!campground) {
            req.flash("error", "Cannot find that campground!");
            return res.redirect("/campgrounds");
        }
        res.render("campgrounds/edit", { campground });
    })
);

router.put(
    "/:id",
    validateCampground,
    isAuthor,
    catchAsync(async (req, res) => {
        const { id } = req.params;
        const campground = await Campground.findByIdAndUpdate(id, {
            ...req.body.campground,
        });
        req.flash("success", "Successfully updated a campground!");
        res.redirect(`/campgrounds/${campground._id}`);
    })
);
// D
router.delete(
    "/:id",
    isLoggedIn,
    isAuthor,
    catchAsync(async (req, res) => {
        const { id } = req.params;
        await Campground.findByIdAndDelete(id);
        req.flash("success", "Successfully deleted a campground!");
        res.redirect("/campgrounds");
    })
);

module.exports = router;
