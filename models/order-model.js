const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    name: String,
    email: String,
    address: String,
    city: String,
    postal: String,
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
      }],
    total: Number

});

const orderModel = mongoose.model("orders", orderSchema);

module.exports = { orderModel };