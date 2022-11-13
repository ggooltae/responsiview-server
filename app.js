require("dotenv").config();
require("./config/dbConnection");

const express = require("express");
const morgan = require("morgan");
const statusCodes = require("http-status-codes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: [process.env.BASE_CLIENT_URL],
  credentials: true
}));

app.use(function (err, req, res, next) {
  res
    .status(err.status || statusCodes.INTERNAL_SERVER_ERROR)
    .json({ errorMessage: err.message });
});

module.exports = app;
