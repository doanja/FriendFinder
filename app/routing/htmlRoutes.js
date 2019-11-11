const express = require('express');
const router = express.Router();
const profiles = require('../data/friends');

router.get('/', function(req, res) {
  return res.json(profiles);
});

// Displays a single profile
router.get('/:profile', function(req, res) {
  const userScore = parseInt(req.params.profile);

  let profileScores = [];

  // calculate scores for all profiles excluding the last one (the user's score)
  for (let i = 0; i < profiles.length - 1; i++) {
    profileScores.push(Math.abs(userScore - profiles[i].scoreTotal));
  }

  // get the min index
  const minIndex = profileScores.indexOf(Math.min(...profileScores));

  return res.json(profiles[minIndex]);
});

// Create New Profiles - takes in JSON input
router.post('/', function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  const newProfile = req.body.profile;
  console.log('New Profile Added:', newProfile);
  profiles.push(newProfile);
  res.json(newProfile);
});

module.exports = router;
