const express = require("express"),
  app = express(),
  scrape = require("./models/scraper");

app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", function (req, res) {
  res.render("index.ejs");
});

app.route("/support")


app.listen(process.env.PORT || 3000, function () {});

function runScraper() {
  scrape();
  setTimeout(runScraper, 60 * 60 * 1000);
}

runScraper();
