const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    cart: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'products'
        }
    ]
});

const userModel = mongoose.model("users", userSchema);

module.exports = {userModel};