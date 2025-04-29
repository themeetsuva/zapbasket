const mongoose = require("mongoose");

const ownerSchema = mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String
});

const ownerModel = mongoose.model("owners", ownerSchema);

module.exports = {ownerModel};