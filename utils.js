const jwt = require("jsonwebtoken");
const azureJWT = require("azure-jwt-verify");

const tenant = require("./config").tenant;
const appId = require("./config").appId;

module.exports = {
  validateToken: (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    let result;
    if (authorizationHeader) {
      const token = req.headers.authorization.split(' ')[1];
      try {
        // verify makes sure that the token hasn't expired and has been issued by us
        let tokenData = jwt.decode(token); // You can find this url in Azure Active Directory B2C Section
        const config = {
          JWK_URI:
            `https://login.microsoftonline.com/${tenant}/discovery/keys?appid=${appId}`,
          ISS: tokenData.iss,
          AUD: tokenData.aud
        };
        azureJWT.verify(token, config).then(
          function(decoded) {
            console.log(decoded)
            req.signedInId = JSON.parse(decoded).message.oid;
            req.signedInName = JSON.parse(decoded).message.name;
            next();
          },
          function(error) {
            res.status(403).json(error);
          }
        );
        
      } catch (err) {
        result = { 
            error: `Authentication error. Token invalid.`,
            status: 401
          };
          res.status(401).send(result);
      }
    } else {
      result = { 
        error: `Authentication error. Token required.`,
        status: 401
      };
      res.status(401).send(result);
    }
  }
};
