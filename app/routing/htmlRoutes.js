const express = require('express');
const router = express.Router();
const profiles = require('../data/friends');

router.get('/', function(req, res) {
  return res.json(profiles);
});

// Displays a single profile
router.get('/:profile', function(req, res) {
  const userScore = parseInt(req.params.profile);

  // calculate the difference of scoreTotals for each profile stored as an arr
  const copyProfiles = [...profiles].map(profile => {
    return Math.abs(userScore - profile.scoreTotal);
  });

  // get the min index
  const minIndex = copyProfiles.indexOf(Math.min(...copyProfiles));

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
