const express = require("express");
const router = express.Router();

//model
const Suggestion = require("../models/suggestion.model");

//routes
router
  .post("/add", (req, res) => {
    Suggestion.create(
      {
        userId: req.signedInId,
        userName: req.signedInName,
        title: req.body.title,
        content: req.body.content
      },
      (err, doc) => {
        if (err) res.status(400).json(err);
        else res.json(doc);
      }
    );
  })
  .get("/all", (req, res) => {
    Suggestion.find({}, (err, doc) => {
      if (err) res.status(400).json(err);
      else res.json(doc);
    });
  })
  .get("/:suggestionId", (req, res) => {
    Suggestion.findById(req.params.suggestionId, (err, doc) => {
      if (err) res.status(400).json(err);
      else res.json(doc);
    })
  })
  .put("/approve", (req, res) => {
    Suggestion.findByIdAndUpdate(
      req.body.suggestionId,
      { approved: req.body.approved },
      (err, doc) => {
        if (err) res.status(400).json(err);
        else res.json(doc);
      }
    );
  })
  .delete("/delete", (req, res) => {
    Suggestion.findByIdAndDelete(req.body.suggestionId, (err, doc) => {
      if (err) res.status(400).json(err);
      else res.json(doc);
    });
  });

module.exports = router;
