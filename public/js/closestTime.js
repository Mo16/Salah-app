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

  let remainingTime = calculateTimeRemaining(data[nextSalah]);
  let remainingHours = remainingTime[0];
  let remainingMins = remainingTime[1];
  document.querySelector('.next-salah-in').innerHTML = `In ${remainingHours} hours and ${remainingMins} minutes`;

  if (remainingHours === 0){
    document.querySelector('.next-salah-in').innerHTML = `In ${remainingMins} minutes`;
  }

  closestJamat();
}

function calculateTimeRemaining(time) {
  if (time[5] === undefined) { //e.g. When time is in form 3:30
    let time1 = time[1];
    let time2 = time[2];
    let time3 = time[3];
    let time4 = time[4];
    
    timeArray = ['0', time1, time2, time3, time4];
    time = timeArray.join('');
  } else if (time[5] === 'a' || time[5] === 'p') { //e.g. When time is in form 07:30am
    let time1 = time[1];
    let time2 = time[2];
    let time3 = time[3];
    let time4 = time[4];
    let time5 = time[5];
    
    timeArray = [time1, time2, time3, time4, time5];
    time = timeArray.join('');
  } else if (time [4] === 'a' || time[4] === 'p') { //e.g. When time is in form 7:30am
    let time1 = time[1]; //7
    let time2 = time[2]; //:
    let time3 = time[3]; //3
    let time4 = time[4]; //0
    
    timeArray = ['0', time1, time2, time3, time4];
    time = timeArray.join('');
  }

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

  return [remainingHours, remainingMins];
}

function closestJamat() {
  var timeRemaining;
  
  switch (prayer) {
    case 'fajr':
      document.querySelector('.next-jamat-name').innerHTML = 'Fajr:';
      document.querySelector('.next-jamat-time').innerHTML = document.querySelector('.j-fajr').innerHTML;
      timeRemaining = calculateTimeRemaining(document.querySelector('.j-fajr').innerHTML);
      document.querySelector('.next-jamat-in').innerHTML = `In ${timeRemaining[0]} hours and ${timeRemaining[1]} minutes at ${document.querySelector('select').value}`;
      break;
    case 'zuhr':
      document.querySelector('.next-jamat-name').innerHTML = 'Dhuhr:';
      document.querySelector('.next-jamat-time').innerHTML = document.querySelector('.j-zuhr').innerHTML;
      timeRemaining = calculateTimeRemaining(document.querySelector('.j-zuhr').innerHTML);
      document.querySelector('.next-jamat-in').innerHTML = `In ${timeRemaining[0]} hours and ${timeRemaining[1]} minutes at ${document.querySelector('select').value}`;
      break;
    case 'asr':
      document.querySelector('.next-jamat-name').innerHTML = 'Asr:';
      document.querySelector('.next-jamat-time').innerHTML = document.querySelector('.j-asr').innerHTML;
      timeRemaining = calculateTimeRemaining(document.querySelector('.j-asr').innerHTML);
      document.querySelector('.next-jamat-in').innerHTML = `In ${timeRemaining[0]} hours and ${timeRemaining[1]} minutes at ${document.querySelector('select').value}`;
      break;
    case 'maghrib':
      document.querySelector('.next-jamat-name').innerHTML = 'Mahgrib:';
      document.querySelector('.next-jamat-time').innerHTML = document.querySelector('.j-maghrib').innerHTML;
      timeRemaining = calculateTimeRemaining(document.querySelector('.j-maghrib').innerHTML);
      document.querySelector('.next-jamat-in').innerHTML = `In ${timeRemaining[0]} hours and ${timeRemaining[1]} minutes at ${document.querySelector('select').value}`;
      break;
    case 'isha':
      document.querySelector('.next-jamat-name').innerHTML = 'Isha:';
      document.querySelector('.next-jamat-time').innerHTML = document.querySelector('.j-isha').innerHTML;
      timeRemaining = calculateTimeRemaining(document.querySelector('.j-isha').innerHTML);
      document.querySelector('.next-jamat-in').innerHTML = `In ${timeRemaining[0]} hours and ${timeRemaining[1]} minutes at ${document.querySelector('select').value}`;
      break;
  }
}