// This is the router for all requests from the Admin
const express = require("express");
const router = express.Router();
const {getAllCodes} = require("../models/codes");
const {getAllissues} = require("../models/reports");

router.get("/", (req, res) => {
  const authState = req.flash("authState");
  res.render("welcome", { authState: authState });
});

router.get("/home", async (req, res) => {
  // if the user is authenticated, then he can access the home page, else return to the welcome page (a passport method)
  if (req.isAuthenticated()) {
    const codes = await getAllCodes(0, 10);
    console.log(codes + " codeshtshnhnaszrgy");
    res.render("home", { codes: codes});
  } else {
    console.log("not authenticated");
    res.redirect("/");
  }
});

router.get("/history", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("history");
  } else {
    console.log("not authenticated");
    res.redirect("/home");
  }
});

router.get("/issue-reports", async (req, res) => {
  if (req.isAuthenticated()) {
    const issues = await getAllissues(0, 10);
    
    res.render("issue-reports", { issues: issues });
  } else {
    console.log("not authenticated");
    res.redirect("/home");
  }
});

module.exports = router;
