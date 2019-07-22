const express = require("express");
const app = express();
const port = process.env.port || 8000;

const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const validateToken = require("./utils").validateToken;
//router imports
const boilerplateMidd = require("./routes/boilerplate.routes");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(validateToken);

//connect to mongoDB
const db = require("./config").mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch(err => {
    console.log(err);
  });

//routers
app.use("/api/boilerplate", boilerplateMidd);

app.get("/hello", (req, res) => res.send("Hello World!"));



app.listen(port, () => console.log(`server running on port ${port}`));
