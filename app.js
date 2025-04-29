const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const { ownerRouter } = require("./routes/ownerRoute");
const { userRoute } = require("./routes/userRoute");
const { shopRoute } = require("./routes/shopRoute");
const { validate } = require("./middleware/isLogin");
const { ownerValidate } = require("./middleware/isOwn");

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/users", userRoute);
app.use(validate);

app.use("/", shopRoute);
app.use(ownerValidate);
app.use("/owners", ownerRouter);

mongoose.connect(process.env.DATABASE_URL).then((res) => {
    console.log("Database Connected");
    app.listen("3000");
});