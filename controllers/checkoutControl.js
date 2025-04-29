const express = require("express");
const jwt = require('jsonwebtoken');
const { userModel } = require("../models/user-model");
const { orderModel } = require("../models/order-model");

const checkout = async (req, res) => {

    let decode = jwt.verify(req.cookies.token, 'shhhhh');

    let user = await userModel.findOne({ email: decode.email }).populate("cart");

    let userData = user.cart;

    let data = [];
    for (let val of userData) {
        data.push(val.price);
    }

    if (userData.length != 0) {
        res.render("checkout", { userData, data });
    }
    else {
        res.redirect("/");
    }
}

const placeorder = async (req, res) => {
    let decode = jwt.verify(req.cookies.token, 'shhhhh');

    let user = await userModel.findOne({ email: decode.email }).populate("cart");

    let { address, city, postal, total } = req.body;

    let order = await orderModel.create({
        name: user.name,
        email: user.email,
        address,
        city,
        postal,
        total
    });

    let userData = user.cart;
    let data = [];
    for (let val of userData) {
        data.push(val.id);
    }

    const result = await orderModel.findByIdAndUpdate(order.id, {
        $push: {
            orders: data
        }
    }, { new: true });

    await userModel.findByIdAndUpdate(user.id, {
        $set: { cart: [] }
    });

    res.redirect("/");
}

module.exports = { checkout, placeorder };