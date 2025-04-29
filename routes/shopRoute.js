const express = require("express");
const { showProducts } = require("../controllers/showProduct");
const { cartPage, addCart, cartDelete } = require("../controllers/cartControl");
const { checkout, placeorder } = require("../controllers/checkoutControl");


const shopRoute = express.Router();

shopRoute.get("/", showProducts);

shopRoute.get("/cart", cartPage);

shopRoute.get("/cart/:id", addCart);

shopRoute.get("/cart/delete/:id", cartDelete);

shopRoute.get("/dash", function(req, res) {
    res.redirect("/owners/products/list");
});

shopRoute.get("/checkout", checkout);

shopRoute.post("/placeorder", placeorder);



module.exports = {shopRoute};