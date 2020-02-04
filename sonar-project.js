const sonarqubeScanner = require('sonarqube-scanner');
sonarqubeScanner(
  {
    serverUrl: "http://localhost:9000",
  /*token: "019d1e2e04eefdcd0caee1468f39a45e69d33d3f", */
    options: {
   /* "sonar.organization": "safaricom", */
      "sonar.projectKey": "cekl-101",
      "sonar.projectName": "cekl",
      "sonar.projectVersion": "1.0",
      "sonar.sourceEncoding": "UTF-8",
      "sonar.language": "js",
      "sonar.sources": ".",
      "sonar.inclusions": "**",
      "sonar.exclusions": "node_modules/**, public",
      /* "sonar.test.inclusions":  "**", */
      "sonar.test.exclusions": "**",
      "sonar.coverage.exclusions": "**",
      "sonar.javascript.lcov.reportPaths": "coverage/lcov.info"
    }
  },
  () => {}
);