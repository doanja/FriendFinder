const express = require('express');
const path = require('path');
const profiles = require('./app/data/friends');

const app = express();
const PORT = process.env.PORT || 5000;

// Sets up the Express app to handle data parsing (needed to process POST request)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
// ===========================================================
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './app/public/home.html'));
});

app.get('/survey', function(req, res) {
  res.sendFile(path.join(__dirname, './app/public/survey.html'));
});

app.get('/api/friends', function(req, res) {
  return res.json(profiles);
});

// Create New Profiles - takes in JSON input
app.post('/api/friends', function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  console.log('req.body:', req.body);
  profiles.push(req.body);
  res.json(req.body);
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
