const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: String,
    price: Number,
    image: Buffer,
    weight: String
});

const productModel = mongoose.model("products", productSchema);

module.exports = {productModel};