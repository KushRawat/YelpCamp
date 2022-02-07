const express = require("express");
const router = express.Router({ mergeParams: true });

const catchAsync = require("../Utilities/catchAsync");
const ExpressError = require("../Utilities/ExpressError");

const { reviewSchema } = require("../schemas");

const Campground = require("../models/campground");
const Review = require("../models/review");

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((ele) => ele.message).join(",");
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
};

router.post(
    "/",
    validateReview,
    catchAsync(async (req, res) => {
        const campground = await Campground.findById(req.params.id);
        const review = new Review(req.body.review);
        // console.log(req.params)
        campground.reviews.push(review);
        review.save();
        campground.save();
        res.redirect(`/campgrounds/${campground._id}`);
    })
);

router.delete(
    "/:reviewId",
    catchAsync(async (req, res) => {
        const { id, reviewId } = req.params;
        await Campground.findByIdAndUpdate(id, {
            $pull: { reviews: reviewId },
        });
        await Review.findByIdAndDelete(reviewId);
        res.redirect(`/campgrounds/${id}`);
    })
);

module.exports = router;
