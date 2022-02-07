const express = require("express");
const router = express.Router();

const catchAsync = require("../Utilities/catchAsync");
const ExpressError = require("../Utilities/ExpressError");

const { campgroundSchema } = require("../schemas");

const Campground = require("../models/campground");

const validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    // console.log(result);
    if (error) {
        const msg = error.details.map((ele) => ele.message).join(",");
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
};

router.get( 
    "/",
    catchAsync(async (req, res) => {
        const campgrounds = await Campground.find({});
        res.render("campgrounds/index", { campgrounds });
    })
);
// C
router.get("/new", (req, res) => {
    res.render("campgrounds/new");
});

router.post(
    "/",
    validateCampground,
    catchAsync(async (req, res, next) => {
        // if (!req.body.campground)
        //     throw new ExpressError("Invalid Campground Data", 400);

        const campground = new Campground(req.body.campground);
        await campground.save();
        req.flash("success", "Successfully created a campground!");
        res.redirect(`/campgrounds/${campground._id}`);
    })
);

// R
router.get(
    "/:id",
    catchAsync(async (req, res) => {
        const campground = await Campground.findById(req.params.id).populate(
            "reviews"
        );
        // console.log(campground)
        res.render("campgrounds/show", { campground });
    })
);
// U
router.get(
    "/:id/edit",
    catchAsync(async (req, res) => {
        const campground = await Campground.findById(req.params.id);
        res.render("campgrounds/edit", { campground });
    })
);

router.put(
    "/:id",
    validateCampground,
    catchAsync(async (req, res) => {
        const { id } = req.params;
        const campground = await Campground.findByIdAndUpdate(id, {
            ...req.body.campground,
        });
        res.redirect(`/campgrounds/${campground._id}`);
    })
);
// D
router.delete(
    "/:id",
    catchAsync(async (req, res) => {
        const { id } = req.params;
        const campground = await Campground.findByIdAndDelete(id);
        res.redirect("/campgrounds");
    })
);

module.exports = router;
