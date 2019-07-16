const express = require("express");
const app = express();
const port = process.env.port || 8000;

const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Hello World!"));

mongoose
  .connect("mongodb://localhost:27017/test", { useNewUrlParser: true })
  .then(
    app.listen(port, () =>
      console.log(`Example app listening on port ${port}!`)
    ),
    err => {
      console.log(err);
    }
  );
