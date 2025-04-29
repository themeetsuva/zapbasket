const jwt = require('jsonwebtoken');
const { userModel } = require('../models/user-model');



let validate = async (req, res, next) => {
    if(!req.cookies.token) {
        // req.flash("error", "you need to login first");
        return res.redirect("/users/login");
    }

    try {
        let decoded = jwt.verify(req.cookies.token, 'shhhhh');
        let user = await userModel.findOne({email:decoded.email}).select("-password");
        
        next();
    }
    catch(err) {
        // req.flash("error", "something went wrong");
        return res.redirect("/users/login");
    }
}

module.exports = {validate};