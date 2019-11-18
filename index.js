/**
 * Lunch our application
 */
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// main route entry
app.get("/", (req, res) => {
  // return the index page of the application
  res.json({
    message: "Hello World"
  });
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
