const express = require("express");
const router = express.Router();
const fs = require('fs');
const path = require('path');

//multer init
const multer  = require('multer')
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb){
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({ storage: storage });

//model import
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
          contentType: req.file.mimetype,
          filename: req.file.filename
        }
      },
      (err, doc) => {
        if (err) res.json(err);
        else res.json(doc);
      }
    );
  })
  .get("/article/:newsId", (req, res) => {
    News.findById(req.params.newsId, (err, doc) => {
      if (err) res.json(err);
      else res.json(doc);
    })
  })
  .get("/all", (req, res) => {
    News.find({}, (err, doc) => {
      if (err) res.json(err);
      else res.json(doc);
    })
  })
  .delete("/delete", (req, res) => {
    News.findByIdAndDelete(req.body.newsId, (err, doc) => {
      if (err) res.status(400).json(err);
      else res.json(doc);
    });
  });

module.exports = router;