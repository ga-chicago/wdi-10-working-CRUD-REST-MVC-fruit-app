const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const methodOverride = require('method-override');

// bring in our fruit model
const fruits = require('./models/fruits.js');

// middleware to intercept our post request and tell the rest of this file that it's a delete request
app.use(methodOverride('_method'))

// specify that you are using middleware with app.use();
app.use(bodyParser.urlencoded({
  extended: false
}));

// this is a 'custom' middleware example -- all requests pass through this middleware before going to their route
app.use((req, res, next) => {
  console.log("--------custom middleware was run--------")
  next(); // tells express to go ahead and do what it was about to do anyway
});

// this is what lets us include static files (like css/images)
app.use(express.static('public'));


// put this in before you start writing routes
app.listen(3000, () => {
  console.log("Listening on port 3000......")
});
