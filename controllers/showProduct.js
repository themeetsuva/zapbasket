const express = require("express");
const { productModel } = require("../models/product-model");
const { userModel } = require("../models/user-model");

const showProducts = async (req, res) => {
    let products = await productModel.find();

    res.render("shop", {products});
}


module.exports = {showProducts};