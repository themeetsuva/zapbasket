const express = require("express");
const { userCreate, userLog } = require("../controllers/userAuth");

const userRoute = express.Router();

userRoute.get("/register", function(req, res) {
    res.render("register");
});

userRoute.get("/login", function(req, res) {
    res.render("login");
});

userRoute.post("/login", userLog);

userRoute.post("/create", userCreate);

userRoute.get("/logout", function(req, res) {
    res.clearCookie("token");
    res.redirect("/users/register");
});

module.exports = {userRoute};