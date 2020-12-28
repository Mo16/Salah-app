/*
 ignore this for now rauf lmao
 */

const puppeteer = require("puppeteer");
const fs = require("fs");


class Mosque {
  constructor(
    name, url, fajr, zuhr, asr, maghrib, esha, longitude, latitude, dropdownid) {
    this.name = name;
    this.url = url;
    this.fajr = fajr;
    this.zuhr = zuhr;
    this.asr = asr;
    this.maghrib = maghrib;
    this.esha = esha;
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
      await page.goto(this.url);
      await page.waitForSelector(this.fajr);
      await page.waitForSelector(this.zuhr);
      await page.waitForSelector(this.asr);
      await page.waitForSelector(this.maghrib);
      await page.waitForSelector(this.esha);


      await page.evaluate(function work(f,z,a,m,e) {
        let fajr = document.querySelector(f)
        let zuhr = document.querySelector(z);
        let asr = document.querySelector(a);
        let maghrib = document.querySelector(m);
        let esha = document.querySelector(e);

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
      work(this.fajr,this.zuhr,this.asr,this.maghrib,this.esha)
      console.log(work);
    } catch (err) {
      await page.close();
      console.log("Couldn't get data because: \n" + err);
    }
  }

}

var jamimosque = new Mosque(
  "jamimosque",
  "http://portsmouthjamimosque.co.uk/",
  "body > main > section.section.background-dark > div > div > div.s-12.m-12.l-4.margin-m-bottom.prayer-times > div:nth-child(5) > div:nth-child(3)",
  "body > main > section.section.background-dark > div > div > div.s-12.m-12.l-4.margin-m-bottom.prayer-times > div:nth-child(6) > div:nth-child(3)",
  "body > main > section.section.background-dark > div > div > div.s-12.m-12.l-4.margin-m-bottom.prayer-times > div:nth-child(7) > div:nth-child(3)",
  "body > main > section.section.background-dark > div > div > div.s-12.m-12.l-4.margin-m-bottom.prayer-times > div:nth-child(8) > div:nth-child(2)",
  "body > main > section.section.background-dark > div > div > div.s-12.m-12.l-4.margin-m-bottom.prayer-times > div:nth-child(9) > div:nth-child(3)",
  1,
  2,
  "ports jami"
);

jamimosque.openSite();
