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
    console.log(counter);
    switch (counter) {
      case 1:
        document.querySelector('.j-fajr').style.color = "blue";
        break;
      case 2:
        document.querySelector('.j-zuhr').style.color = "blue";
        break;
      case 3:
        document.querySelector('.j-asr').style.color = "blue";
        break;
      case 4:
        document.querySelector('.j-maghrib').style.color = "blue";
        break;
      case 5:
        document.querySelector('.j-isha').style.color = "blue";
        break;
    }
}
