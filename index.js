const express = require("express");
const app = express();
const port = process.env.port || 8000;

const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//custom token validation middleware
const validateToken = require("./utils").validateToken;

//router imports
const SuggestionRouter = require("./routes/suggestion.routes");
const CommentRouter = require("./routes/comment.routes");

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
app.use("/api/suggestion", SuggestionRouter);
app.use("/api/comment", CommentRouter);

app.get("/hello", (req, res) => res.send('Hello user: ' + req.signedInId));



app.listen(port, () => console.log(`server running on port ${port}`));