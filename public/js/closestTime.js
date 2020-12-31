var selectedColor = "yellow";
var prayer;

function whichNamaz(data) {
    namazTimes = [data.Fajr, data.Dhuhr, data.Asr, data.Maghrib, data.Isha];
    var today = new Date();
    var currentTime = today.setHours(today.getHours(), today.getMinutes());

    var counter = 1;
    for (let i = 0; i < namazTimes.length; i++) {
      let namazHour = parseInt((namazTimes[i])[0] + (namazTimes[i])[1]);
      let namazMin = parseInt((namazTimes[i])[3] + (namazTimes[i])[4]);
      
      let namazTimeObject = new Date();
      let namazTime = namazTimeObject.setHours(namazHour, namazMin);

      if (namazTime < currentTime) {
        counter++;
      }

      console.log(`counter is ${counter}`)
    }

    if (counter === 6) {
      counter = 1;
    }

    switch (counter) {
      case 1:
        changeHTML("fajr","Fajr",data);
        prayer = 'fajr';
        break;
      case 2:
        changeHTML("dhuhr","Dhuhr",data);
        prayer = 'zuhr';
        break;
      case 3:
        changeHTML("asr","Asr",data);
        prayer = 'asr';
        break;
      case 4:
        changeHTML("maghrib","Maghrib",data);
        prayer = 'maghrib';
        break;
      case 5:
        changeHTML("isha","Isha",data);
        prayer = 'isha';
        break;
    }
}

function changeHTML(namaz,nextSalah,data){
  document.querySelector(`.next-salah-name`).innerHTML = `${nextSalah}`;
  document.querySelector(`.next-salah-time`).innerHTML = data[nextSalah];
  document.querySelector(`.j-${namaz}`).style.color = selectedColor;
  document.querySelector(`.${namaz}-jamat-time-name`).style.color = selectedColor;
  document.querySelector(`.${namaz}-start-time-name`).style.color = selectedColor;
  document.querySelector(`.${namaz}`).style.color = selectedColor;
  calculateTimeRemaining(data[nextSalah]);
  console.log(`changed ${namaz} to ${data[nextSalah]}`);
}

function calculateTimeRemaining(time) {
    let today = new Date();

    let namazHour = parseInt(time[0] + time[1]);
    let namazMins = parseInt(time[3] + time[4]);

    var remainingHours = namazHour - today.getHours();
    var remainingMins = namazMins - today.getMinutes();

    if (remainingMins < 0) {
        remainingMins = 60 + remainingMins;
    }

    if (remainingHours < 0) {
        remainingHours = remainingHours + 24;
    }

    document.querySelector('.next-salah-in').innerHTML = `In ${remainingHours} hours and ${remainingMins} minutes`;

    if (remainingHours === 0){
      document.querySelector('.next-salah-in').innerHTML = `In ${remainingMins} minutes`;
    }
}

function closestJamat(prayer) {
  
}