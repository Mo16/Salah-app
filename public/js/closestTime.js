function whichNamaz(data) {
    namazTimes = [data.Fajr, data.Dhuhr, data.Asr, data.Maghrib, data.Isha];
    var today = new Date();
    var currentTime = today.getHours() + ":" + today.getMinutes();

    var counter = 0;
    for (let i = 0; i < namazTimes.length; i++) {
      if (namazTimes[i] < currentTime) {
        counter++;
      }
    }

    if (currentTime > data.Isha) {
        counter = 1;
    }

    switch (counter) {
      case 1:
        document.querySelector('.next-salah-name').innerHTML = "Fajr:";
        document.querySelector('.next-salah-time').innerHTML = data.Fajr;
        calculateTimeRemaining(data.Fajr);
        break;
      case 2:
        document.querySelector('.next-salah-name').innerHTML = "Zuhr:";
        document.querySelector('.next-salah-time').innerHTML = data.Dhuhr;
        calculateTimeRemaining(data.Dhuhr);
        break;
      case 3:
        document.querySelector('.next-salah-name').innerHTML = "Asr:";
        document.querySelector('.next-salah-time').innerHTML = data.Asr;
        calculateTimeRemaining(data.Asr);
        break;
      case 4:
        document.querySelector('.next-salah-name').innerHTML = "Maghrib:";
        document.querySelector('.next-salah-time').innerHTML = data.Maghrib;
        calculateTimeRemaining(data.Maghrib);
        break;
      case 5:
        document.querySelector('.next-salah-name').innerHTML = "Isha:";
        document.querySelector('.next-salah-time').innerHTML = data.Isha;
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