const express = require("express");
const { productModel } = require("../models/product-model");


const createProduct = async (req, res) => {
    let {name, price, weight} = req.body;

    let productData = await productModel.create({
        name,
        price,
        weight,
        image: req.file.buffer
    });

    res.redirect("/owners/products/new");
}

const productList = async (req, res) => {
    let productData = await productModel.find();

    res.render("productList", {productData});
}

const productDelete = async (req, res) => {
    let id = req.query.id;
    await productModel.deleteOne({"id":id});
    res.redirect("/owners/products/list");
}

module.exports = {createProduct, productList, productDelete};