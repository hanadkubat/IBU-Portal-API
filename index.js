const express = require('express')
const app = express()
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');

//middleware
const cors = require('cors')
const bodyParser = require('body-parser')

//apply middleware
app.use(cors);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//mongoDB connection
const connectDb = () => {
    return mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});
};

app.get('/', (req, res) => res.send('Hello World!'))

/*connectDb().then(async () => {
    app.listen(process.env.PORT, () =>
      console.log(`Example app listening on port ${port}!`),
    );
  });*/

  app.listen(process.env.PORT, () =>
      console.log(`Example app listening on port ${port}!`),
    );