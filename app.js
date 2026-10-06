const express = require("express");
const app = express();

app.use(express.static("view"));

module.exports = app;