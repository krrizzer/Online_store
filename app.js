require("dotenv").config(); //.env File contains variables and documents that shouldn't be public in the code
const express = require("express");
const bodyParser = require("body-parser"); //Body Parser is used to get the front-end inputs from the user
const ejs = require("ejs"); //main template engine
const logger = require("morgan"); //morgan is used to log the requests in the console in a nice format
const mongoose = require("mongoose"); //The database used in the project ( MongoDB )
const session = require("express-session"); // The session will be used to store the user data
const passport = require("passport"); //Passport is used to authenticate the Users and Admin

//importing routers
const auth_router = require("./routes/auth-router");
const api_codes = require("./routes/api-codes-router");
const pages_router = require("./routes/pages-router");

//importing Schemas to use them for session and authentication
const User = require("./db-schema/User");

const app = express();

//-------------------Database Connection (Only change DB_URI based on your need)-------------------

// If you didn't set up the local MongoDB database on your computer, you can use the MongoDB Atlas cloud database ( The longer link)
// const DB_URI = "mongodb://localhost:27017/IR-DB"

const DB_URI =
  "mongodb+srv://swe363Project:swe363ir@cluster0.02jpdnn.mongodb.net/IR-DB?retryWrites=true&w=majority";

//--Starting from here, Don't touch--

// Connect to MongoDB
mongoose.connect(DB_URI);

// CONNECTION EVENTS
mongoose.connection.once("connected", function () {
  console.log("Database connected to " + DB_URI);
});
mongoose.connection.on("error", function (err) {
  console.log("MongoDB connection error: " + err);
});

mongoose.connection.once("disconnected", function () {
  console.log("Database disconnected ");
});

// If Node's process ends, close the MongoDB connection
process.on("SIGINT", function () {
  mongoose.connection.close(function () {
    console.log("Database disconnected through app termination");
    process.exit(0);
  });
});
//----------------------------------

//----------------------General Set-ups---------------------------------

//Setting up the view engine
app.set("view engine", "ejs");

// setting up  Morgan logger
app.use(logger("dev"));

//Setting up the body parser, public folder, and JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

//-----------------------------------

//-------------------Setting up the session (Don't touch)-------------------
// Set-up Passport Session
app.use(
  session({
    name: "sessionId",
    secret: "xx", //Retreave Secret from .env File
    saveUninitialized: false, // don't create sessions for not logged in users
    resave: false, //don't save session if unmodified
    // Where to store session data
    // cookies settings
    cookie: {
      secure: false,
      httpOnly: false, // if true, will disallow JavaScript from reading cookie data
      expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour;
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Pass 'req.user' as 'user' to ejs templates (Will be used later when we create the user model)
// Just a custom middleware
app.use(function (req, res, next) {
  res.locals.user = req.user || null;
  next();
});

//-----------------------------------

// Setting up the Routes
app.use(auth_router);
app.use(api_codes);
app.use(pages_router);

//Set Up port, This is used to deploy the website in the future
let port = process.env.PORT;

if (port == null || port == "") port = 3000;

app.listen(port, function () {
  const location = `http://localhost:${port}`;
  console.log(`Open on this port ${location} to use the API :P !`);
});
