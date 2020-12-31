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
  constructor(city, value, dropdownid, name, longitude, latitude, fajr, zuhr, asr, maghrib, esha,url) {
    this.city = city;
    this.value = value;
    this.dropdownid = dropdownid;
    this.name = name;
    this.latitude = latitude;
    this.longitude = longitude;
    this.fajr = fajr;
    this.zuhr = zuhr;
    this.asr = asr;
    this.maghrib = maghrib;
    this.esha = esha;
    this.url = url

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

      let data = await page.evaluate((that) => {
        let fajr = document.querySelector(that.fajr).innerText;
        let zuhr = document.querySelector(that.zuhr).innerText;
        let asr = document.querySelector(that.asr).innerText;
        let maghrib = document.querySelector(that.maghrib).innerText;
        let esha = document.querySelector(that.esha).innerText;

        return {
          city: that.city,
          value: that.name + "Data",
          dropdownid: that.dropdownid,
          name: that.name,
          longitude: that.longitude,
          latitude: that.latitude,
          fajr,
          zuhr,
          asr,
          maghrib,
          esha,
        };
      },this);
      this.saveToVariable(data)
      await page.close();
    } catch (err) {
      await page.close();
      console.log("Couldn't get data because: \n" + err);
    }
  }

  saveToVariable(data){

    return 
  //   for (let i = 0; i < mosques.length; i++) {
  //     if (this.value == mosques[i]){
        
  //     }
      
  //   }
  //   console.log(jamimosqueData)

  }


}


var mosques = [jamimosque = new Mosque(
  "portsmouth",
  "jamimosqueData",
  "Portsmouth Jami Mosque",
  "jamimosque",
  -1.0817852,
  50.7941668,
  "body > main > section.section.background-dark > div > div > div.s-12.m-12.l-4.margin-m-bottom.prayer-times > div:nth-child(5) > div:nth-child(3)",
  "body > main > section.section.background-dark > div > div > div.s-12.m-12.l-4.margin-m-bottom.prayer-times > div:nth-child(6) > div:nth-child(3)",
  "body > main > section.section.background-dark > div > div > div.s-12.m-12.l-4.margin-m-bottom.prayer-times > div:nth-child(7) > div:nth-child(3)",
  "body > main > section.section.background-dark > div > div > div.s-12.m-12.l-4.margin-m-bottom.prayer-times > div:nth-child(8) > div:nth-child(2)",
  "body > main > section.section.background-dark > div > div > div.s-12.m-12.l-4.margin-m-bottom.prayer-times > div:nth-child(9) > div:nth-child(3)",
  "http://portsmouthjamimosque.co.uk/",
);]

jamimosque.openSite();
