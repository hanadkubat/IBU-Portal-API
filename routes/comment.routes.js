const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')

//model
const Comment = require("../models/comment.model");

router
  .post("/add", (req, res) => {
    Comment.create(
      {
        userId: req.signedInId,
        userName: req.signedInName,
        suggestionId: mongoose.Types.ObjectId(req.body.suggestionId),
        content: req.body.content
      },
      (err, doc) => {
        if (err) res.status(400).json(err);
        else res.json(doc);
      }
    );
  })
  .get("/all", (req, res) => {
    Comment.find({}, (err, doc) => {
      if (err) res.json(err);
      else res.json(doc);
    });
  })
  .delete("/delete", (req, res) => {
    Comment.findByIdAndDelete(req.body.commentId, (err, doc) => {
      if (err) res.status(400).json(err);
      else res.json(doc);
    });
  })
  .put("/updateOne", (req, res) => {
    Comment.findByIdAndUpdate(
      req.body.commentId,
      { content: req.body.content },
      {useFindAndModify: false},
      (err, doc) => {
        if (err) res.status(400).json(err);
        else res.json(doc);
      }
    );
  });

module.exports = router;
