const express = require("express");
const router = express.Router();

//model
const Comment = require("../models/comment.model");

router.post("/add", (req, res) => {
  Comment.create(
    {
      userId: req.signedInId,
      userName: req.signedInName,
      content: req.body.content
    },
    (err, doc) => {
      if (err) res.status(400).json(err);
      else res.json(doc);
    }
  );
});

module.exports = router;
