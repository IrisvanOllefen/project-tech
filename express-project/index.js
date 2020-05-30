// first all requires
const express = require("express");
const hbs = require("hbs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const UserModel = require("./models/user");

// add .env support
require("dotenv").config();

// variable with url from mongodb
const MONGO_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/test?retryWrites=true&w=majority`;

// then all other variables
const app = express();

// settings
// the view engine is hbs, it gives res.render, to render a file and send it to the browser
app.set("view engine", "hbs");

// creating partials
hbs.registerPartials(__dirname + "/views/partials", (error) => {
  console.error(error);
});

// calling all middlewares here
// serving static files
app.use(express.static("public"));

// bodyparser is used to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// this makes it possible to save data (session data like a userId) inbetween requests
app.use(
  session({
    secret: "uir3948uri934i9320oi",
    resave: false,
    saveUninitialized: true,
  })
);

//
app.use(async (req, res, next) => {
  if (req.session.userId) {
    // all information about the logged in user will be available under req.user
    const user = await UserModel.findById(req.session.userId).exec();
    if (user) {
      req.user = user;
    }
  }
  // pass to the next middleware function
  next();
});

// homepage route
app.get("/", async (req, res) => {
  // looking for all users in the UserModel to make them available in the header to switch users
  const users = await UserModel.find({}).exec();
  // rendering the index page, giving it a specifc title for inside the head, and giving it the users for in the drop down menu
  res.render("index", { title: "Chat Overview Page", users });
});

// login route
app.post("/login", async (req, res) => {
  // check if the provided user exists in the database
  const user = await UserModel.findById(req.body.userId).exec();
  // if the user exists in the database, set the userId session variable to the returned user
  if (user) {
    // I am using user._id because the user._id in my database is more reliable than the req.body.userId. Because req.body.userId comes from the user.
    req.session.userId = user._id;
  }
  res.redirect("/");
});

// running the application
async function run() {
  // wait for mongoose before starting server
  await mongoose.connect(MONGO_URL, {
    // avoid deprecation warnings
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // the express server will run on port 8000
  app.listen(8000, () => {
    // immediately give url to click open through terminal
    console.log("Your app is now running on http://localhost:8000");
  });
}

// do not forget to run the function
// this is needed because mongoose.connect uses await and therefore it can not be at the top-level scope and should be inside an async function
run();
