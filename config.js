module.exports = {
    mongoURI: "mongodb://" + process.env.DB_NAME + ":" + process.env.DB_PASS + "@ds137008.mlab.com:37008/ibu-portal",//"mongodb://localhost:27017/test",
    tenant: process.env.AD_TENANT,
    appId: process.env.AD_APPID
}