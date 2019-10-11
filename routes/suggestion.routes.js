const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//model
const Suggestion = require("../models/suggestion.model");
const News = require("../models/news.model");
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
  .get("/one/:suggestionId", (req, res) => {
    Suggestion.aggregate(
      [
        {
          $match: {
            _id: mongoose.Types.ObjectId(req.params.suggestionId)
          }
        },
        {
          $lookup: {
            from: "comments",
            localField: "_id",
            foreignField: "suggestionId",
            as: "comments"
          }
        }
      ],
      (err, doc) => {
        if (err) res.status(400).json(err);
        else res.json(doc[0]);
      }
    );
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
      else res.json(doc)
    });
  });

module.exports = router;
