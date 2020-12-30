var selectedColor = "yellow"

function whichNamaz(data) {
    namazTimes = [data.Fajr, data.Dhuhr, data.Asr, data.Maghrib, data.Isha];
    var today = new Date();
    var currentTime = today.getHours() + ":" + today.getMinutes();

    var counter = 0;
    for (let i = 0; i < namazTimes.length; i++) {
      let namazHour = parseInt((namazTimes[i])[0] + (namazTimes[i])[1]);
      let namazMin = parseInt((namazTimes[i])[3] + (namazTimes[i])[4]);
      
      let namazTimeObject = new Date();
      let namazTime = namazTimeObject.setHours(namazHour, namazMin);

      console.log(namazHour);
      if (namazTime < currentTime) {
        console.log(namazTime, currentTime, namazTime < currentTime)
        counter++;
      }
    }

    if (currentTime > data.Isha) {
        counter = 1;
    }

    console.log(currentTime > data.Isha)
    console.log(counter);

    switch (counter) {
      case 1:
        document.querySelector('.next-salah-name').innerHTML = "Fajr:";
        document.querySelector('.next-salah-time').innerHTML = data.Fajr;
        document.querySelector('.j-fajr').style.color = selectedColor;
        document.querySelector('.fajr-jamat-time-name').style.color = selectedColor;
        document.querySelector('.fajr-start-time-name').style.color = selectedColor;
        document.querySelector('.fajr').style.color = selectedColor;

        calculateTimeRemaining(data.Fajr);
        break;
      case 2:
        document.querySelector('.next-salah-name').innerHTML = "Zuhr:";
        document.querySelector('.next-salah-time').innerHTML = data.Dhuhr;
        document.querySelector('.j-zuhr').style.color = selectedColor;
        document.querySelector('.zuhr-jamat-time-name').style.color = selectedColor;
        document.querySelector('.zuhr-start-time-name').style.color = selectedColor;
        document.querySelector('.zuhr').style.color = selectedColor;

        calculateTimeRemaining(data.Dhuhr);
        break;
      case 3:
        document.querySelector('.next-salah-name').innerHTML = "Asr:";
        document.querySelector('.next-salah-time').innerHTML = data.Asr;
        document.querySelector('.j-asr').style.color = selectedColor;
        document.querySelector('.asr-jamat-time-name').style.color = selectedColor;
        document.querySelector('.asr-start-time-name').style.color = selectedColor;
        document.querySelector('.asr').style.color = selectedColor;

        calculateTimeRemaining(data.Asr);
        break;
      case 4:
        document.querySelector('.next-salah-name').innerHTML = "Maghrib:";
        document.querySelector('.next-salah-time').innerHTML = data.Maghrib;
        document.querySelector('.j-maghrib').style.color = selectedColor;
        document.querySelector('.maghrib-jamat-time-name').style.color = selectedColor;
        document.querySelector('.maghrib-start-time-name').style.color = selectedColor;
        document.querySelector('.maghrib').style.color = selectedColor;

        calculateTimeRemaining(data.Maghrib);
        break;
      case 5:
        document.querySelector('.next-salah-name').innerHTML = "Isha:";
        document.querySelector('.next-salah-time').innerHTML = data.Isha;
        document.querySelector('.j-isha').style.color = selectedColor;
        document.querySelector('.isha-jamat-time-name').style.color = selectedColor;
        document.querySelector('.isha-start-time-name').style.color = selectedColor;
        document.querySelector('.isha').style.color = selectedColor;

        calculateTimeRemaining(data.Isha);
        break;
    }
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
}