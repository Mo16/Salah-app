/*
 ignore this for now rauf lmao
 */

const puppeteer = require("puppeteer");
const fs = require("fs");

var masjidnoorData,
  jamimosqueData,
  masjidhidayaData,
  didsburymosqueData,
  portsmouthcentralmosqueData,
  eastlondonmosqueData,
  finsburyparkmosqueData,
  glasgowCentralData,
  filePath = "public/data/mosqueData.json";

class Mosque {
  constructor(
    name,
    url,
    fajr,
    zuhr,
    asr,
    maghrib,
    isha,
    longitude,
    latitude,
    dropdownid
  ) {
    this.name = name;
    this.url = url;
    this.fajr = fajr;
    this.zuhr = zuhr;
    this.asr = asr;
    this.maghrib = maghrib;
    this.isha = isha;
    this.latitude = latitude;
    this.longitude = longitude;
    this.dropdownid = dropdownid;
  }

  async openSite() {
    console.log(this.url);
    let browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto(this.url);

    this.getTimes(page);
  }

  async getTimes(page) {
    try {
      let browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(this.url);
      await page.waitForSelector(this.fajr);
      // await page.waitForSelector(this.zuhr);
      // await page.waitForSelector(this.asr);
      // await page.waitForSelector(this.maghrib);
      // await page.waitForSelector(this.esha);

      let data = await page.evaluate(() => {
        let fajr = document.querySelector(this.fajr).innerText;
        let zuhr = document.querySelector(this.fajr).innerText;
        let asr = document.querySelector(this.fajr).innerText;
        let maghrib = document.querySelector(this.fajr).innerText;
        let esha = document.querySelector(this.fajr).innerText;

        return {
          city: this.city,
          value: this.name + "Data",
          dropdownid: this.dropdownid,
          name: this.name,
          longitude: this.longitude,
          latitude: this.latitude,
          fajr,
          zuhr,
          asr,
          maghrib,
          esha,
        };
      });

      jamimosqueData = data;
      console.log(data);
    } catch (err) {
      await page.close();
      console.log("Couldn't get data because: \n" + err);
    }
  }
}

var jamimosque = new Mosque(
  "jamimosque",
  "https://centralmosque.co.uk",
  "#content-section-2 > div > div > div.col-md-5.columns > div > div.col-md-12.simple-column > div > div > table > tbody > tr:nth-child(7) > td.masjidnow-salah-time-iqamah.masjidnow-isha",
  "#content-section-2 > div > div > div.col-md-5.columns > div > div.col-md-12.simple-column > div > div > table > tbody > tr:nth-child(7) > td.masjidnow-salah-time-iqamah.masjidnow-isha",
  "#content-section-2 > div > div > div.col-md-5.columns > div > div.col-md-12.simple-column > div > div > table > tbody > tr:nth-child(7) > td.masjidnow-salah-time-iqamah.masjidnow-isha",
  "#content-section-2 > div > div > div.col-md-5.columns > div > div.col-md-12.simple-column > div > div > table > tbody > tr:nth-child(7) > td.masjidnow-salah-time-iqamah.masjidnow-isha",
  "#content-section-2 > div > div > div.col-md-5.columns > div > div.col-md-12.simple-column > div > div > table > tbody > tr:nth-child(7) > td.masjidnow-salah-time-iqamah.masjidnow-isha",
  1,
  2,
  "hello"
);

jamimosque.openSite();
