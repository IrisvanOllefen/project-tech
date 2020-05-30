// First of all I want to require dotenv so my .env file will leave out some things during fetching to GitHub
require("dotenv").config();
// Using this console.log to see if my node index.js in scripts is working (I did this in the beginning when first making my index.js file)
console.log("Hello World!");

// requiring the needed things and packages etc.
const express = require("express");
const app = express();
const hbs = require("hbs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
// requiring the database through { MongoClient }
const { MongoClient } = require("mongodb");

app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials", function (err) {});

// here I am creating a URL for the connection with my database/server
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/test?retryWrites=true&w=majority`;
// I created the first client as well and had to add useNewUrlParser and useUnifiedTopology because I kept on getting warnings in my console. It had to do something with those things becoming depricated in newer versions. But I did not look too much in to it.
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// bodyParser parses most things you give it so it is very convenient to work with it.
// the urlencoded is what browsers use to send forms, and since I am using a form I need to include this piece of code.
app.use(bodyParser.urlencoded({ extended: false }));

// telling where my public folder is and that they can use it
app.use(express.static("public"));
app.use(
  session({
    secret: "343ji43j4n3jn4jk3n",
  })
);

mongoose.connect("mongodb://localhost/test", { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection errror: "));
db.once("open", function () {
  const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
  });
  const user = mongoose.model("user", userSchema);
  const Allison = new user({ name: "Allison", age: 21 });
  console.log(Allison.name + Allison.age);
});

// creating a route which will deliver my chat overview page which will contain the header and footer, thanks to previous code.
app.get("/", (req, res) => {
  res.render("chat-overview-page");
});

// creating a route which will deliver my new match page which will contain the header and footer, thanks to previous code.
app.get("/new-match", async (req, res) => {
  // const collection = client.db("myDatingApp".collection("users"));
  // console.log("Connected correctly to server");

  // await collection.findOne({ gender: "female" });

  res.render("new-match");
});

// let userSchema = new mongoose.Schema({
//   name: String,
//   age: Number,
//   birthday: Date,
//   attractiontomen: Boolean,
//   attractiontowomen: Boolean,
// });

// module.exports = mongoose.model("name", userSchema);

// let nameModel = require("./name");
// let msg = new nameModel({
//   email: "irisvanollefen@gmail.com",
// });

// creating a route which will lead to a form where a user can enter their favorite books and current read
app.get("/favorite-books", async (req, res) => {
  // we defined client earlier and now I am using the connect method so we can connect to the server
  // const collection = client.db("myDatingApp").collection("books");
  console.log("Connected correctly to server");

  res.render("favorite-books");
});

app.post("/results", async (req, res) => {
  // we defined client earlier and now I am using the connect method so we can connect to the server
  const collection = client.db("myDatingApp").collection("books");
  console.log("Connected correctly to server");

  await collection.insertOne({ name: req.body.book1 });
  await collection.insertOne({ name: req.body.book2 });
  await collection.insertOne({ name: req.body.book3 });
  await collection.insertOne({ name: req.body.bookcurrent });

  res.render("your-faves-result", { body: req.body });
});

async function run() {
  await client.connect();
  // on which port it will listen
  const server = app.listen(8000, () => {
    console.log(
      "Your dating app is now running at http://localhost:" +
        server.address().port
    );
  });
}

run();
