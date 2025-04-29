const express = require("express");
const { userModel } = require("../models/user-model");
const jwt = require('jsonwebtoken');

const cartPage = async (req, res) => {
    let decode = jwt.verify(req.cookies.token, 'shhhhh');

    let user = await userModel.findOne({email:decode.email}).populate("cart");
    
    let userData = user.cart;

    let data = [];
    for(let val of userData) {
        data.push(val.price);
    }

    if(userData.length != 0) {
        res.render("cart", {userData, data});
    }
    else {
        res.redirect("/");
    }
}

const addCart = async (req, res) => {
    let decode = jwt.verify(req.cookies.token, 'shhhhh');
    
    let user = await userModel.findOne({email:decode.email});

    user.cart.push(req.params.id);
    await user.save();
    res.redirect("/");
}

const cartDelete = async (req, res) => {
    let decode = jwt.verify(req.cookies.token, 'shhhhh');
    let user = await userModel.findOne({email:decode.email});

    await userModel.updateOne(
        { email: user.email },
        { $pull: { cart: req.params.id } }
      );
    res.redirect("/cart");
}

module.exports = {cartPage, addCart, cartDelete};