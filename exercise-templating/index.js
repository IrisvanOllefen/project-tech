const express = require("express");
const app = express();
// we need the fs to use the readFileSync later on
const fs = require("fs");
const path = require("path");
// using handlebars as my templating engine
const Handlebars = require("handlebars");

// this is where my html file is situated
const viewsFile = fs.readFileSync(
  path.join(__dirname, "views/index.html"),
  "utf-8"
);

// compiling the template using the viewsFile variable
const template = Handlebars.compile(viewsFile);

app.get("/", (req, res) => {
  // creating a new array with some names in it
  const newArray = ["Iris", "Tim", "Dennis", "Max"];
  // creating a new template which uses math.random to get one of the names out of the array, and also uses math.random to get an age between 0 and 80
  const newTemplate = template({
    name: newArray[Math.floor(Math.random() * newArray.length)],
    age: Math.floor(Math.random() * Math.floor(80)),
  });
  // afterwards sending back the new template
  res.send(newTemplate);
});

app.get("/name/:name", (req, res) => {
  // creating an array that simply returns the name you put behind the parameter
  const newTemplate = template({ name: req.params.name });
  res.send(newTemplate);
});

app.get("/age/:age", (req, res) => {
  // creating an array with two options in it for either too young or old enough
  const leefTijd = ["Too Young", "Old Enough"];
  // creating a variable + template for if somebody is old enough
  const ageAllowed = template({
    age: req.params.age,
    toowhat: leefTijd[1],
  });
  // creating a variable + teplate for if somebody is not old enough
  const ageNotAllowed = template({
    age: req.params.age,
    toowhat: leefTijd[0],
  });
  // using an if else statement to decide when the program returns what
  if (req.params.age > 18) {
    res.send(ageAllowed);
  } else if (req.params.age < 18) {
    res.send(ageNotAllowed);
  }
});

// you can use multiple params in one URL
app.get("/:name-:age", (req, res) => {
  // this simply returns the name and the age you gave up in the URL
  const newTemplate = template({ name: req.params.name, age: req.params.age });
  res.send(newTemplate);
});

var server = app.listen(3000, function () {
  console.log("Server running at http://localhost:" + server.address().port);
});
