// Using this console.log to see if my node index.js in scripts is working
console.log("Hello World!");

// requiring the needed things and packages etc.
const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");

// creating a template with my header inside to make it in to a partial so I can call it on multiple pages
const headerTemplate = fs.readFileSync(
  path.join(__dirname, "views/header.html"),
  "utf-8"
);

// creating a variable that will compile the header template
const renderHeader = Handlebars.compile(headerTemplate);

// registering the header partial
Handlebars.registerPartial("myPartial", renderHeader);

// this is where my chat overview page is coming from, which I also put in a template so it easy to use again
const chatOverviewTemplate = fs.readFileSync(
  path.join(__dirname, "views/chat-overview-page.html"),
  "utf-8"
);

// rendering the chat overview template and compiling that using handlebars
const renderChatOverViewTemplate = Handlebars.compile(chatOverviewTemplate);

// registering the header partial
Handlebars.registerPartial("myPartial", renderHeader);

// this is where my chat overview page is coming from, which I also put in a template so it easy to use again
const newMatchTemplate = fs.readFileSync(
  path.join(__dirname, "views/new-match.html"),
  "utf-8"
);

// rendering the chat overview template and compiling that using handlebars
const renderNewMatchTemplate = Handlebars.compile(newMatchTemplate);

// creating routes
app.use(express.static("public"));

// creating a route which will deliver my chat overview page which will consist the header
app.get("/", (req, res) => {
  const newTemplate = renderChatOverViewTemplate();
  res.send(newTemplate);
});

app.get("/new-match", (req, res) => {
  const newTemplate = renderNewMatchTemplate();
  res.send(newTemplate);
});

// // creating a partial for the header and footer

// on which port it will listen
const server = app.listen(8000, () => {
  console.log(
    "Your dating app is now running at http://localhost:" +
      server.address().port
  );
});
