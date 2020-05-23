const express = require("express");
const app = express();
// we need the fs to use the readFileSync later on
const fs = require("fs");
const path = require("path");
// using handlebars as my templating engine
const Handlebars = require("handlebars");
const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

function readViewContent(fileName) {
  const viewFileContent = fs.readFileSync(
    path.join(__dirname, `views/${fileName}.html`),
    "utf-8"
  );
  return viewFileContent;
}

function renderViewContent(fileName) {
  const content = readViewContent(fileName);
  return Handlebars.compile(content);
}

// rendering the chat overview template and compiling that using handlebars
const renderIndex = renderViewContent("index");
const renderThanks = renderViewContent("thanks");

app.get("/", (req, res) => {
  const newTemplate = renderIndex();
  res.send(newTemplate);
});

app.post("/thanks", (req, res) => {
  console.log(req.body);
  const newTemplate = renderThanks({ body: req.body });
  res.send(newTemplate);
});

var server = app.listen(3000, function () {
  console.log("Server running at http://localhost:" + server.address().port);
});
