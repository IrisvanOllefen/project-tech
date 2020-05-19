// Using this console.log to see if my node index.js in scripts is working
console.log("Hello World!");

// requiring the needed things and packages etc.
const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");

const template = Handlebars.compile(viewsFile);

// creating routes
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/chat-overview-page.html");
});

app.get("/new-match", (req, res) => {
  res.sendFile(__dirname + "/views/new-match.html");
});

const server = app.listen(8000, () => {
  console.log(
    "Your dating app is now running at http://localhost:" +
      server.address().port
  );
});
