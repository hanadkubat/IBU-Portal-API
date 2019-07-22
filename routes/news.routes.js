const express = require("express");
const router = express.Router();

const News = require("../models/news.model");

//routes
router
  .post("/add", (req, res) => {
    Suggestion.create(
      {
        userId: req.signedInId,
        title: req.body.title,
        content: req.body.content
      },
      (err, doc) => {
        if (err) res.json(err);
        else res.json(doc);
      }
    );
  })
  .get("/all", (req, res) => {
    Suggestion.find({}, (err, doc) => {
      if (err) res.json(err);
      else res.json(doc);
    });
  })
  .delete("/delete", (req, res) => {
    Suggestion.findByIdAndDelete(req.body.newsId, (err, doc) => {
      if (err) res.json(err);
      else res.json(doc);
    });
  });


module.exports = router;