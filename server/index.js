const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const db = require("./db");
const stockRouter = require("./routes/stock-router");
const bbrosRouter = require("./routes/bbros-router");
const picktransactionsRouter = require("./routes/picktransactions-router");
const pickfileRouter = require("./routes/pickfilesystem-router");

const app = express();
const apiPort = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(
  "/api",
  stockRouter,
  bbrosRouter,
  picktransactionsRouter,
  pickfileRouter
);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
