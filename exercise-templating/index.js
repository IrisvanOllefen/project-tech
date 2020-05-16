const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");

const joePieDoePie = fs.readFileSync(
  path.join(__dirname, "views/index.html"),
  "utf-8"
);

const template = Handlebars.compile(joePieDoePie);

app.get("/", (req, res) => {
  const newArray = ["Iris", "Tim", "Dennis", "Max"];
  const newTempio = template({ name: newArray[1], age: 23 });
  res.send(newTempio);
});

// const newArray = ["Iris", "Tim", "Dennis", "Max"];
// console.log(template({ name: newArray[2] }));

var server = app.listen(3000, function () {
  console.log("Server running at http://localhost:" + server.address().port);
});
