const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const userRoute = require("./routes/user.js");
const authRoute = require("./routes/auth.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose
  .connect("mongodb://127.0.0.1:27017/ecom", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connect with mongodb successfully.");
  })
  .catch(() => {
    console.log("An error occured while connecting with mongodb.");
  });

app.use(express.json());

// app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
