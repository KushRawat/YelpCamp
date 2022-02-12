const express = require("express");
const router = express.Router();

const { isLoggedIn, validateCampground, isAuthor } = require("../middleware");
const catchAsync = require("../Utilities/catchAsync");
const campgrounds = require("../controllers/campgrounds");

router.get("/", catchAsync(campgrounds.index));
// C
router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router.post(
    "/",
    isLoggedIn,
    validateCampground,
    catchAsync(campgrounds.createCampground)
);
// R
router.get("/:id", catchAsync(campgrounds.showCampground));
// U
router.get(
    "/:id/edit",
    isLoggedIn,
    isAuthor,
    catchAsync(campgrounds.renderEditForm)
);

router.put(
    "/:id",
    validateCampground,
    isAuthor,
    catchAsync(campgrounds.updateCampground)
);
// D
router.delete(
    "/:id",
    isLoggedIn,
    isAuthor,
    catchAsync(campgrounds.deleteCampground)
);

module.exports = router;
