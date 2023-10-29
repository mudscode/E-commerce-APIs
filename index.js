const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const userRoute = require("./routes/user");

const app = express();

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

app.use("/api/users", userRoute);


port = 3000 || process.env.PORT;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
