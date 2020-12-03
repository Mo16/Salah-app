const express = require("express");
const app = express();
const scrape = require("./models/scraper");
const oneHour = 60 * 60 * 1000;

app.use(express.static("public"));
app.set("view engine", "ejs");
app.get("/", function (req, res) {
  res.render("index.ejs");
});
app.listen(process.env.PORT || 3000, function () {});

function runScraper() {
  scrape();
  setTimeout(runScraper, oneHour);
}

runScraper();
