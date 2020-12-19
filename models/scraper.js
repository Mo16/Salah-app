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

var scrapeit = async function scrapeSite() {
  console.log("Scraping websites...");
  mosqueList = [
    "http://portsmouthjamimosque.co.uk/",
    "https://didsburymosque.com/",
    "https://masjidenoor.com/",
    "https://masjidehidayah.org.uk/",
    "http://www.portsmouthcentralmasjid.com/",
    "https://www.towerhamletsmosques.co.uk/elm/",
    "https://finsburyparkmosque.org/about-us/prayer-timetable/",
    "https://centralmosque.co.uk"
  ];
  for (let i = 0; i < mosqueList.length; i++) {
    try{
      url = mosqueList[i];
      let browser = await puppeteer.launch({headless: true, args: ['--no-sandbox','--disable-setuid-sandbox'] });;
      const page = await browser.newPage();
      await page.goto(url);
      switch (url) {
        case "http://portsmouthjamimosque.co.uk/":
          console.log(url);
          jamimosque(page);
          break;
        case "https://didsburymosque.com/":
          console.log(url);
          await didsburymosque(page);
          break;
        case "https://masjidenoor.com/":
          console.log(url);
          masjidnoor(page);
          break;
        case "https://masjidehidayah.org.uk/":
          console.log(url);
          masjidhidaya(page);
          break;
        case "http://www.portsmouthcentralmasjid.com/":
          console.log(url);
          await portsmouthcentralmosque(page);
          break;
        case "https://www.towerhamletsmosques.co.uk/elm/":
          console.log(url);
          await eastlondonmosque(page);
          break;
        case "https://finsburyparkmosque.org/about-us/prayer-timetable/":
          console.log(url)
          await finsburyparkmosque()
          break;
        case "https://centralmosque.co.uk":
          console.log(url);
          await glasgowCentral(page);
          break;
      }
    }catch(err){
      console.log(`Not parsed ${url} because:\n${err}`)
    }
  }
  parse()

};

async function jamimosque(page) {
  let data = await page.evaluate(() => {
    let fajr = document.querySelector("body > main > section.section.background-dark > div > div > div.s-12.m-12.l-4.margin-m-bottom.prayer-times > div:nth-child(5) > div:nth-child(3)").innerText;
    let zuhr = document.querySelector( "body > main > section.section.background-dark > div > div > div.s-12.m-12.l-4.margin-m-bottom.prayer-times > div:nth-child(6) > div:nth-child(3)").innerText;
    let asr = document.querySelector("body > main > section.section.background-dark > div > div > div.s-12.m-12.l-4.margin-m-bottom.prayer-times > div:nth-child(7) > div:nth-child(3)").innerText;
    let maghrib = document.querySelector("body > main > section.section.background-dark > div > div > div.s-12.m-12.l-4.margin-m-bottom.prayer-times > div:nth-child(8) > div:nth-child(2)").innerText;
    let esha = document.querySelector("body > main > section.section.background-dark > div > div > div.s-12.m-12.l-4.margin-m-bottom.prayer-times > div:nth-child(9) > div:nth-child(3)").innerText;
    return {
      city: "portsmouth",
      value: "jamimosqueData",
      dropdownid: "Portsmouth Jami Mosque",
      name: "jamimosque",
      longitude: -1.0817852,
      latitude: 50.7941668,
      fajr,
      zuhr,
      asr,
      maghrib,
      esha,
    };
  });
  jamimosqueData = data;
  await page.close()
}

async function didsburymosque(page) {
  await page.waitForSelector('body > section.main-section > div.container > div > div > div.col-md-4.col-xs-12.col-sm-12.nopadding.pTimes > div > div > table > tbody > tr:nth-child(3) > td.jamah');
  try{
    let data = await page.evaluate(() => {
      let fajr = document.querySelector("body > section.main-section > div.container > div > div > div.col-md-4.col-xs-12.col-sm-12.nopadding.pTimes > div > div > table > tbody > tr:nth-child(3) > td.jamah").innerHTML;
      let zuhr = document.querySelector("body > section.main-section > div.container > div > div > div.col-md-4.col-xs-12.col-sm-12.nopadding.pTimes > div > div > table > tbody > tr:nth-child(5) > td.jamah").innerHTML;
      let asr = document.querySelector("body > section.main-section > div.container > div > div > div.col-md-4.col-xs-12.col-sm-12.nopadding.pTimes > div > div > table > tbody > tr:nth-child(6) > td.jamah").innerHTML;
      let maghrib = document.querySelector("body > section.main-section > div.container > div > div > div.col-md-4.col-xs-12.col-sm-12.nopadding.pTimes > div > div > table > tbody > tr:nth-child(7) > td.jamah").innerHTML;
      let esha = document.querySelector("body > section.main-section > div.container > div > div > div.col-md-4.col-xs-12.col-sm-12.nopadding.pTimes > div > div > table > tbody > tr:nth-child(8) > td.jamah").innerHTML;
      return {
        city: "greater manchester",
        value: "didsburymosqueData",
        dropdownid: "Didsbury Mosque",
        name: "didsburymosque",
        longitude: -2.2490131,
        latitude: 53.4227222,
        fajr,
        zuhr,
        asr,
        maghrib,
        esha,
      };
    });
    didsburymosqueData = data;
    await page.close()
  }catch(err){
    console.log("not parsed")
  }
}

async function masjidnoor(page) {
  let data = await page.evaluate(() => {
    let fajr = document.querySelector("#cycle-slideshow > div > table > tbody > tr:nth-child(7) > td:nth-child(3)").innerText;
    let zuhr = document.querySelector("#cycle-slideshow > div > table > tbody > tr:nth-child(9) > td:nth-child(3)").innerText;
    let asr = document.querySelector("#cycle-slideshow > div > table > tbody > tr:nth-child(11) > td:nth-child(3)").innerText;
    let maghrib = document.querySelector("#cycle-slideshow > div > table > tbody > tr:nth-child(13) > td:nth-child(3)").innerText;
    let esha = document.querySelector("#cycle-slideshow > div > table > tbody > tr:nth-child(15) > td:nth-child(3)").innerText;
    return {
      city: "greater manchester",
      value: "masjidnoorData",
      dropdownid: "Masjid e Noor",
      name: "masjidnoor",
      longitude: -2.3350271,
      latitude: 52.6461168,
      fajr,
      zuhr,
      asr,
      maghrib,
      esha,
    };
  });
  masjidnoorData = data;
  await page.close()
}

async function masjidhidaya(page) {
  let data = await page.evaluate(() => {
    let fajr = document.querySelector("#schedule-today > table > tbody > tr:nth-child(2) > td:nth-child(3)").innerText;
    let zuhr = document.querySelector("#schedule-today > table > tbody > tr:nth-child(4) > td:nth-child(3)").innerText;
    let asr = document.querySelector("#schedule-today > table > tbody > tr:nth-child(5) > td:nth-child(3)").innerText;
    let maghrib = document.querySelector("#schedule-today > table > tbody > tr:nth-child(6) > td:nth-child(3)").innerText;
    let esha = document.querySelector("#schedule-today > table > tbody > tr:nth-child(7) > td:nth-child(3)").innerText;
    return {
      city: "greater manchester",
      value: "masjidhidayaData",
      name: "masjidhidaya",
      dropdownid: "Masjid E Hidaya",
      longitude: -2.2655507,
      latitude: 53.460853,
      fajr,
      zuhr,
      asr,
      maghrib,
      esha,
    };
  });
  masjidhidayaData = data;
  await page.close()
}

async function portsmouthcentralmosque(page) {
  try{
    let data = await page.evaluate(() => {
      let fajr = document.querySelector("#table > tbody > tr:nth-child(2) > td:nth-child(3) > span").innerText;
      let zuhr = document.querySelector("#table > tbody > tr:nth-child(3) > td:nth-child(3) > span").innerText;
      let asr = document.querySelector("#table > tbody > tr:nth-child(4) > td:nth-child(3) > span").innerText;
      let maghrib = document.querySelector("#table > tbody > tr:nth-child(5) > td:nth-child(3) > span").innerText;
      let esha = document.querySelector("#table > tbody > tr:nth-child(6) > td:nth-child(3) > span").innerText;
      return {
        city: "portsmouth",
        value: "portsmouthcentralmosqueData",
        dropdownid: "Portsmouth Central Mosque",
        name: "portsmouthcentralmosque",
        longitude: -1.0795891,
        latitude: 50.7980541,
        fajr,
        zuhr,
        asr,
        maghrib,
        esha,
      };
    });
    portsmouthcentralmosqueData = data;
  }catch(err){
    console.log("Couldnt get data because: \n"+ err)
  }


}

async function eastlondonmosque(page) {
  await page.waitForSelector('#fajr > td.prayer-jamaah > span');
  try{
    let data = await page.evaluate(() => {
      let fajr = document.querySelector("#fajr > td.prayer-jamaah > span").innerHTML;
      let zuhr = document.querySelector("#zuhr > td.prayer-jamaah > span").innerHTML;
      let asr = document.querySelector("#asr > td.prayer-jamaah > span").innerHTML;
      let maghrib = document.querySelector("#maghrib > td.prayer-jamaah > span").innerHTML;
      let esha = document.querySelector("#isha > td.prayer-jamaah > span").innerHTML;
      return {
        city: "london",
        value: "eastlondonmosqueData",
        dropdownid: "East London Mosque",
        name: "eastlondonmosque",
        longitude: -0.0676762,
        latitude: 51.5175695,
        fajr,
        zuhr,
        asr,
        maghrib,
        esha,
      };
    });
    eastlondonmosqueData = data;
  }catch(err){
    console.log("Couldnt get data because: \n"+ err)
  }
}

async function finsburyparkmosque(page) {
  try{
    let browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    let data = await page.evaluate(() => {
      let fajr = document.querySelector("#prayertimediv > span > table > tbody > tr:nth-child(3) > td:nth-child(2)").innerText;
      let zuhr = document.querySelector("#prayertimediv > span > table > tbody > tr:nth-child(3) > td:nth-child(3)").innerText;
      let asr = document.querySelector("#prayertimediv > span > table > tbody > tr:nth-child(3) > td:nth-child(4)").innerText;
      let maghrib = document.querySelector("#prayertimediv > span > table > tbody > tr:nth-child(3) > td:nth-child(5)").innerText;
      let esha = document.querySelector("#prayertimediv > span > table > tbody > tr:nth-child(3) > td:nth-child(6)").innerText;
      return {
        city: "london",
        value: "finsburyparkmosqueData",
        dropdownid: "Finsbury Park Mosque",
        name: "finsburyparkmosque",
        longitude: -0.1230305,
        latitude: 51.5689034,
        fajr,
        zuhr,
        asr,
        maghrib,
        esha,
      };
    });
    finsburyparkmosqueData = data;

    } catch(err){
      await page.close();
      console.log("Couldnt get data because: \n"+ err);
    };
  };

  async function glasgowCentral(page) {
    try {
      let browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url);
      await page.waitForSelector('#content-section-2 > div > div > div.col-md-5.columns > div > div.col-md-12.simple-column > div > div > table > tbody > tr:nth-child(2) > td.masjidnow-salah-time-iqamah.masjidnow-fajr');
      await page.waitForSelector('#content-section-2 > div > div > div.col-md-5.columns > div > div.col-md-12.simple-column > div > div > table > tbody > tr:nth-child(4) > td.masjidnow-salah-time-iqamah.masjidnow-dhuhr');
      await page.waitForSelector('#content-section-2 > div > div > div.col-md-5.columns > div > div.col-md-12.simple-column > div > div > table > tbody > tr:nth-child(5) > td.masjidnow-salah-time-iqamah.masjidnow-asr');
      await page.waitForSelector('#content-section-2 > div > div > div.col-md-5.columns > div > div.col-md-12.simple-column > div > div > table > tbody > tr:nth-child(6) > td.masjidnow-salah-time-iqamah.masjidnow-maghrib');
      await page.waitForSelector('#content-section-2 > div > div > div.col-md-5.columns > div > div.col-md-12.simple-column > div > div > table > tbody > tr:nth-child(7) > td.masjidnow-salah-time-iqamah.masjidnow-isha');



      let data = await page.evaluate(() => {
        let fajr = document.querySelector('#content-section-2 > div > div > div.col-md-5.columns > div > div.col-md-12.simple-column > div > div > table > tbody > tr:nth-child(2) > td.masjidnow-salah-time-iqamah.masjidnow-fajr').innerText;
        let zuhr = document.querySelector('#content-section-2 > div > div > div.col-md-5.columns > div > div.col-md-12.simple-column > div > div > table > tbody > tr:nth-child(4) > td.masjidnow-salah-time-iqamah.masjidnow-dhuhr').innerText;
        let asr = document.querySelector('#content-section-2 > div > div > div.col-md-5.columns > div > div.col-md-12.simple-column > div > div > table > tbody > tr:nth-child(5) > td.masjidnow-salah-time-iqamah.masjidnow-asr').innerText;
        let maghrib = document.querySelector('#content-section-2 > div > div > div.col-md-5.columns > div > div.col-md-12.simple-column > div > div > table > tbody > tr:nth-child(6) > td.masjidnow-salah-time-iqamah.masjidnow-maghrib').innerText;
        let esha = document.querySelector('#content-section-2 > div > div > div.col-md-5.columns > div > div.col-md-12.simple-column > div > div > table > tbody > tr:nth-child(7) > td.masjidnow-salah-time-iqamah.masjidnow-isha').innerText;  
        
        return {
          city: "glasgow",
          value: "glasgowCentralData",
          dropdownid: "Glasgow Central Mosque",
          name: "glasgowCentral",
          longitude: -4.251607,
          latitude: 55.852387,
          fajr,
          zuhr,
          asr,
          maghrib,
          esha,
        };
      });

      glasgowCentralData = data;

    } catch(err) {
      await page.close();
      console.log("Couldn't get data because: \n" + err);
    };
  }



function parse() {
  mosques = {
    jamimosqueData,
    portsmouthcentralmosqueData,
    didsburymosqueData,
    masjidhidayaData,
    masjidnoorData,
    eastlondonmosqueData,
    finsburyparkmosqueData,
    glasgowCentralData
  };
  jsonData = JSON.stringify(mosques,null, 2);
  fs.writeFile(filePath, jsonData, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Written to file!");
    }
  });
}

module.exports = scrapeit;




/* 

How to scrape a website:

1) At top, add variable name according to mosques name then add "Data" after it

2) add mosque url to the "mosqueList" array

3) Add it as a Switch case

4) Fill up the function template with correct info
    Change function name
    Get the js path from browser
    Change return values of the following accordingly:
        city
        value
        name
        dropdownid
        longitude
        latitude
    Assign "data" to the correct variable
    If its the last website to be scraped call the parse() function in the finally code block

5) add the variable to the mosques array (preferably in order of functions)

6) die




Template for scraping

async function mosque(page) {
  try{  
    let data = await page.evaluate(() => {
    let fajr = .innerHTML;
    let zuhr = .innerHTML;
    let asr = .innerHTML;
    let maghrib = .innerHTML;
    let esha = .innerHTML;
    return {
      city: "",
      value: "",
      dropdownid: "  ",
      name: "",
      longitude: ,
      latitude: ,
      fajr,
      zuhr,
      asr,
      maghrib,
      esha,
    };
  });
  Data = data;
  }catch(err) {
  console.log("not parsed")
  }finally{
  parse()
  }
}


*/