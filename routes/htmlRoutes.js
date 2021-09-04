const path = require("path");
const express = require("express");
const router = require("express").Router();

//route to homepage
router.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));

});

//route to exercise page
router.get("/exercise", (req,res) => {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));

});

//route to stats
router.get("/stats", (req,res) => {
    res.sendFile(path.join(__dirname, "../public/stats.html"));

});

module.exports = router