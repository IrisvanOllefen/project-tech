// Using this console.log to see if my node index.js in scripts is working
console.log("Hello World!");

// requiring the needed things and packages etc.
const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");

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

// creating a variable that will compile the header template
const renderHeader = renderViewContent("header");
const renderFooter = renderViewContent("footer");

// registering the header partial
Handlebars.registerPartial("header", renderHeader);
Handlebars.registerPartial("footer", renderFooter);

// rendering the chat overview template and compiling that using handlebars
const renderChatOverViewTemplate = renderViewContent("chat-overview-page");

// rendering the chat overview template and compiling that using handlebars
const renderNewMatchTemplate = renderViewContent("new-match");

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
