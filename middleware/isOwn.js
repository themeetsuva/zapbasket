const jwt = require('jsonwebtoken');
const { userModel } = require('../models/user-model');

let ownerValidate = async (req, res, next) => {
    if (!req.cookies.token) {
        // req.flash("error", "you need to login first");
        return res.redirect("/users/login");
    }


    let decoded = jwt.verify(req.cookies.token, 'shhhhh');
    let user = await userModel.findOne({ email: decoded.email }).select("-password");

    if (user.email == "meet@gmail.com") {
        next();
    }
    else {
        res.redirect("/");
    }
}

module.exports = { ownerValidate };