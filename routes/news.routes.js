const express = require("express");
const router = express.Router();
const fs = require('fs');
//multer init
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

const News = require("../models/news.model");

//routes
router
  .post("/add", upload.single('headImage'), (req, res) => {
    News.create(
      {
        userId: req.signedInId,
        userName: req.signedInName,
        title: req.body.title,
        content: req.body.content,
        img: {
          data: fs.readFileSync(req.file.path), 
          contentType: req.file.mimetype
        }
      },
      (err, doc) => {
        if (err) res.json(err);
        else res.json(doc);
      }
    );
  })

module.exports = router;