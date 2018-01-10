const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const methodOverride = require('method-override');

// middleware to intercept our post request and tell the rest of this file that it's a delete request
app.use(methodOverride('_method'))

// specify that you are using middleware with app.use();
app.use(bodyParser.urlencoded({
  extended: false
}));

// 'custom' middleware example -- all requests pass through  middleware before going to their route
app.use((req, res, next) => {
  console.log("--------custom middleware was run--------")
  next(); // tells express to go ahead and do what it was about to do anyway
});

// this is what lets us include static files (like css/images)
app.use(express.static('public'));

// we require controller(s) below middleware so all routes still go through middleware
const FruitsController = require('./controllers/fruitsController')
// we have to app.use the fruits controller now.  this will parse that part of the URL
app.use('/fruits/', FruitsController)

// this dummy route 
app.get('/', (req, res) => {
  res.send("Hello World--Did you mean to go to <a href='/fruits'>/fruits?</a>");
});

// put this in before you start writing routes
app.listen(3000, () => {
  console.log("Listening on port 3000......")
});
