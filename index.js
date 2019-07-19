const express = require("express");
const app = express();
const port = process.env.port || 8000;

const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const db = require("./config").mongoURI;

const jwt = require('jsonwebtoken');
const azureJWT = require('azure-jwt-verify');

//router imports
const boilerplateMidd = require('./routes/boilerplate.routes');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//connect to mongoDB
mongoose
  .connect(db, {useNewUrlParser: true})
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch(err => {
    console.log(err);
  });

//routers
app.use('/api/boilerplate', boilerplateMidd)


app.get("/", (req, res) => res.send("Hello World!"));

app.post("/jwt", (req,res)=>{
  let jwtToken = req.body.token;
  let tokenData = jwt.decode(jwtToken) // You can find this url in Azure Active Directory B2C Section
  const config = {
      JWK_URI: "https://login.microsoftonline.com/1b59fec5-1d4e-4835-8dc9-41f3e5a6ae9d/discovery/keys?appid=7c60b2af-e970-4c05-8278-67564929e213",
      ISS: tokenData.iss,
      AUD: tokenData.aud
  };
  azureJWT.verify(jwtToken, config).then(function(decoded){
    console.log(decoded)
    
    }, function(error){
      console.log(error)
    
    })
});
//https://login.microsoftonline.com/{tenant}/.well-known/openid-configuration?appid={appID}
app.listen(port, () => console.log(`server running on port ${port}`));
