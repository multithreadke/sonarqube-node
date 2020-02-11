var express = require('express');
var router = express.Router();
var winston = require("../config/winston");
var uuid = require('uuid');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    user: 'Enrique Cherry'
  });
    winston.log("info", "STK-Push initiated successfully", {
      TimeStamp: Date.now(),
      TransactionID: uuid.v1(),
      TransactionType: "QueryBalance",
      Action: "some-value",
      Response: "Success",
      ResponseTime: res.get('X-Response-Time'),
      ResponseCode: "200",
      SourceSystem: "XXXX",
      TargetSystem: "STKPUSH",
      ErrorDescription: "DS",
      Extradata1: "aeiou",
      Extradata2: "abcde"
    });
});
module.exports = router;
