const express = require('express');
const router = express.Router();
const profiles = require('../data/friends');

router.get('/', function(req, res) {
  return res.json(profiles);
});

// Create New Profiles - takes in JSON input
router.post('/', function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  console.log('New Profile:', req.body);
  profiles.push(req.body);
  res.json(req.body);
});

module.exports = router;
