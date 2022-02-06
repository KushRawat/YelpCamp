const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("ALL dogs");
});
router.post("/", (req, res) => {
    res.send("create shelters");
});
router.get("/:id", (req, res) => {
    res.send("one SHELTERS");
});
router.get("/:id/edit", (req, res) => {
    res.send("edit one SHELTERS");
});

module.exports = router;
