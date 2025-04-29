const express = require("express");
const multer = require("multer");
const { createProduct, productList, productDelete } = require("../controllers/createProduct");

const ownerRouter = express.Router();

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

ownerRouter.get("/products/new", function (req, res) {
    res.render("createProduct");
});

ownerRouter.post("/products/create", upload.single("image"), createProduct);

ownerRouter.get("/products/list", productList);

ownerRouter.get("/products/list/:id", productDelete);


module.exports = { ownerRouter };