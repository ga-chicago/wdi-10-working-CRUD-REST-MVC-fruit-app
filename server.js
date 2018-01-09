const express = require('express');
const app = express();

const bodyParser = require('body-parser')

// we must now require our fruit model file since we moved it to another file
const fruits = require('./models/fruits.js');


// here is where our (body parser) middleware goes
// specify that you are using middleware with app.use();
// app.use() is for middleware
// we are app.using our middle here because doug wilson who wrote body-parser told us to and also because it is before our route( handler)s
app.use(bodyParser.urlencoded({
  extended: false
}));

// we are going to write our own middleware for fun-- IT IS LIKE A WEIGH STATION ON THE INTERNET all trucks (requests) must pass through it
app.use((req, res, next)=>{
  console.log("I AM SOME SWEET CUSTOM MIDDLEWARE RIGHT NOW. I RUN FOR ALL ROUTESS---------------------------------------hey hey hey hey look at me")
  next(); // tells express to go ahead and do what it was about to do anyway
});

// home route (route handler)
app.get('/', (req, res) => {
  res.send("Hello World");
});

// fruits route
app.get('/fruits', (req, res)=>{
  // res.send(fruits); // before you did monday night's HW

  res.render('index.ejs', {fruits: fruits}) // after you did monday night's HW
});



// route to show user a form to add a fruit
app.get('/fruits/new', (req, res)=>{
  // console.log(req);

  // send the user a form--we need a view/template
  res.render('new.ejs');
  // res.send("hit the new fruit route--check the terminal")
})

// post route to handle submitted new fruit form data from new.ejs (which was probably just rendered by the above GET route--i.e. when the user sends a POST route)
app.post('/fruits', (req, res) => {

  // req is object -- represents the HTTP post request sent by the user
  // console.log(req);

  // now we can see just the data we want instead of the entire HTTP POST request object
  console.log(req.body)

  if(req.body.readyToEat === 'on') {
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }


  // add a fruit to our fruits Array (which is a temporary stand-in for a future database)
  fruits.push(req.body)

  // make sure it works
  // res.send("You submitted a POST request to '/fruits' (good job, you little coder, you) ");

  // send user to specified URL (path)

  // TODO: remember to add an HTML LINK to the fruit index page that leads to /fruits/new
  res.redirect('/fruits');

})

// "show" route for specific fruit 
app.get('/fruits/:id', (req, res) => {

  // we're gonna make this also send an object OOBJECT withour data
  // the second parameter MUST BE AN OBJECT
  // we're going to use that object to show data in our template
  // res.render() "renders" a template/view where res.send () just sends text
  console.log(fruits[req.params.id]);
  
  res.render('show.ejs', {
    fruit: fruits[req.params.id]
  });

  // //1. get the id
  // const fruitId = req.params.id;

  // //2. get the fruit with that id
  // const fruit = fruits[fruitId];

  // console.log(typeof fruit);

  // // "Fruit 2 is a pineapple which is yellow and is not ready to eat"
  // let responseString = "Fruit #" + fruitId + " is " + fruit.name + " and is ";
  // if(!fruit.readyToEat) responseString = responseString + " not ";
  // responseString += "ready to eat.";

  // res.send(responseString)
})


// put this in before you start writing routes
app.listen(3000, () => {
  console.log("Listening on port 3000......")
});
