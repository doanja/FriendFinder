const express = require("express");
const path = require("path");
const data = require("../data/friends");
const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/home.html"));
});

router.get("/survey", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/survey.html"));
});

router.get("/data", (req, res) => {
  res.json(data);
});

module.exports = router;
