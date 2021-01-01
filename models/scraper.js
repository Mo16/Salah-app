const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
var counter = 0;

console.log("Scraping websites...");

const mosqueList = require("./mosqueList.json");
class Mosque {
	constructor( city, value, dropdownid, name, longitude, latitude, fajr, zuhr, asr, maghrib, esha, url) {
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
		this.url = url;
	}

	async openSite() {
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
      }, this);
      console.log(this.url)
			this.saveToFile(data);
			await page.close();
		} catch (err) {
			await page.close();
			console.log("Couldn't get data because: \n" + err);
		}
	}

	saveToFile(data) {
		counter++
		try {
			let mosquesJson = fs.readFileSync(
				path.join(__dirname, "../public/data") + "/mosqueData.json",
				"utf-8"
			);
			let mosques = JSON.parse(mosquesJson);
			mosques[data.value] = data;
			mosquesJson = JSON.stringify(mosques,null,2);
			console.log(`Writing ${this.dropdownid}\n`)
			if (Object.keys(mosqueList).length == counter){
				console.log("Finished parsing all mosques")
			}
			fs.writeFileSync(
				path.join(__dirname, "../public/data") + "/mosqueData.json",
				mosquesJson,
				"utf-8"
			);
		} catch (error) {
			console.log(`could not write because: ${error}`);
		}
	}
}
var scrapeit = async function scrapeSite() {
	Object.entries(mosqueList).forEach(async (mosque) => {

		return new Mosque(...Object.values(mosque[1])).openSite();
	});
};

module.exports = scrapeit;


/*

How to add a mosque:

1) Locate the mosqueList.json file (in folder models)

2) at the bottom add a comma after the last object if there isnt already one

3) Fill out the template (At bottom of this guide) accordingly
	city: make sure it is all lowercase
	value: will be the name + "Data" at end EG jamimosqueData
	dropdownid: How you will want it to appear in the drop down menu of the website EG Portsmouth Jami Mosque
	name: same as value but without "Data"
	longitude: get longitude of the mosque from google or whatever
	latitude: same as longitude
	namaz times: 	find the part where the namaz time is located on the site and then on inspect element right click it and copy selector and paste it
					in the corresponding part
	web: just the url where the namaz times are located 





	"[name of the mosque]Data": {
		"city": "",
		"value": "",
		"dropdownid": "",
		"name": "",
		"longitude": ,
		"latitude": ,
		"fajr": "",
		"zuhr": "",
		"asr": "",
		"maghrib": "",
		"esha": "",
		"web": ""
	}


*/