const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
cookieParser = require('cookie-parser')
const { userModel } = require("../models/user-model");

const userCreate = async (req, res) => {
    let {name, email, password} = req.body;

    let userCheck = await userModel.findOne({"email":email});

    if(userCheck){
         return res.send("you are a our user, login please");
    }
    else {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, async function(err, hash) {
                let insertUser = await userModel.create({
                    name,
                    email,
                    password: hash
                });

                let token = jwt.sign({ email: email }, 'shhhhh');
                res.cookie("token", token);
                res.redirect("/");
            });
        });
    }
}

const userLog = async (req, res) => {
    let {email, password} = req.body;

    let user = await userModel.findOne({"email":email});

    if(user) {
        let data = bcrypt.compare(password, user.password);
        if(data) {
            let token = jwt.sign({ email: email }, 'shhhhh');
            res.cookie("token", token);
            res.redirect("/");
        }
        else {
            res.redirect("/users/register");
        }
    }
    else {
        res.redirect("/users/register");
    }
}

module.exports = {userCreate, userLog};