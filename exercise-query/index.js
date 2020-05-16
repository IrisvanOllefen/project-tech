// requiring the express and app
const express = require("express");
const app = express();

// creating a 'normal' GET method by using the normal '/' route and response "Hello World"
app.get("/", function (req, res) {
  res.send("Hello world");
});

// a GET method that works dynamic
// the :username can get any name as input
app.get("/users/:username", function (req, res) {
  console.log(req.params);
  // the req.params returns a string of the username which was entered in the route
  res.send(req.params);
});

// trying out a different type of route path by responding a txt file
app.get("/hello", function (req, res) {
  // creating the path variable
  // using __dirname to make the route dynamic, so I don't have to do /Users/.../.../
  const path = __dirname + "/hello-world.txt";
  res.sendFile(path);
});

// on which port the server listens
var server = app.listen(3000, function () {
  console.log("Server running at http://localhost:" + server.address().port);
});
