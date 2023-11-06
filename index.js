const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const app = express();

const authRoute = require("./routes/auth.js");
const userRoute = require("./routes/user.js");

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://127.0.0.1/ecom", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB successfully.");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit the application if the database connection fails.
  });

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
