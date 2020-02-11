 var SplunkLogger = require("splunk-logging").Logger;
 var config = {
   token: "37efb5d6-7765-4c3e-8467-699b13e44cc4",
   url: "https://localhost:8088"
 };
 var splunkLogger = new SplunkLogger(config);
 module.exports = splunkLogger;