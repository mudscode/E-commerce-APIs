const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const app = express();

app.use(express.json());

port = 3000 || process.env.PORT;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});