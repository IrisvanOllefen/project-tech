const express = require("express");
const app = express();
// we need the fs to use the readFileSync later on
const fs = require("fs");
const path = require("path");
// using handlebars as my templating engine
const Handlebars = require("handlebars");
// using bodyParser to parse input from my form
const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// a function which makes the read file things dynamic so I don't have to do the same thing multiple times
function readViewContent(fileName) {
  const viewFileContent = fs.readFileSync(
    path.join(__dirname, `views/${fileName}.html`),
    "utf-8"
  );
  return viewFileContent;
}

// this function takes the function above and returns it in to handlebars
function renderViewContent(fileName) {
  const content = readViewContent(fileName);
  return Handlebars.compile(content);
}

// here i am rendering the two pages I need
const renderIndex = renderViewContent("index");
const renderThanks = renderViewContent("thanks");

// making the two routes
app.get("/", (req, res) => {
  const newTemplate = renderIndex();
  res.send(newTemplate);
});

app.post("/thanks", (req, res) => {
  // to check my console for the result
  console.log(req.body);
  // req.body returnes the parsed body items thanks to body.parser
  const newTemplate = renderThanks({ body: req.body });
  res.send(newTemplate);
});

var server = app.listen(3000, function () {
  console.log("Server running at http://localhost:" + server.address().port);
});
