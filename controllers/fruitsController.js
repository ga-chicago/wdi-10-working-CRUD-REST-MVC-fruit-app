const express = require('express');
const router = express.Router();

// require fruits here  since this is where we actually need it
const fruits = require('../models/fruits.js');


// show all the fruits
router.get('/', (req, res)=>{
  // res.send(fruits); // before you did monday night's HW

  res.render('index.ejs', {fruits: fruits}) // after you did monday night's HW
});


// 'new' route to show user a form to add a fruit
router.get('/new', (req, res)=>{

  // send the user a form--we need a view/template
  res.render('new.ejs');
})

// 'create' route -- handle data POSTED by form in new.ejs -- adds new fruit to 'database'
router.post('/', (req, res) => {

  // req is object -- represents the HTTP post request sent by the user
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
router.get('/:id', (req, res) => {

  // we're gonna make this also send an object OOBJECT withour data
  // the second parameter MUST BE AN OBJECT
  // we're going to use that object to show data in our template
  // res.render() "renders" a template/view where res.send () just sends text
  console.log(fruits[req.params.id]);
  
  res.render('show.ejs', {
    fruit: fruits[req.params.id]
  });

})

//show edit page for a particular fruit
router.get('/:index/edit', (req, res) => {
  res.render('edit.ejs', {
    fruit: fruits[req.params.index], // the actual object
    index: req.params.index // this fruit's index in the array
  })
})

// this is the route that our form in edit.ejs is sending info to
// use override to enable this route to be hit
router.put('/:index', (req, res) => {

  console.log("hey update route was hit;")

  // remember--we have to programmatically set this
  let edible = false;
  if(req.params.readyToEat == 'on') {
    edible = true;
  }
  // replace the fruit in our array with the updated fruit
  fruits[req.params.index] = {
    name: req.body.name,
    color: req.body.color,
    readyToEat: edible
  }
  // res.send('you hit the update route')
  res.redirect('/fruits');
})

// this will remove a fruit with a certain id
router.delete('/:index', (req, res) => {

  // get the index from param string
  const idx = req.params.index;

  // remove 1 element at index  from our array
  fruits.splice(idx, 1)

  res.redirect('/fruits');

})



module.exports = router;