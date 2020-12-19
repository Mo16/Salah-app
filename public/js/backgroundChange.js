async function dayOrNight() {
    api = "2ca0429921c28bac953e647ade71e1ff";
    url = "https://api.openweathermap.org/data/2.5/weather";

    const response = await fetch(`${url}?lat=${Cookies.get("latitude")}&lon=${Cookies.get("longitude")}&appid=${api}&units=metric`);
    const responseJSON = await response.json();

    background(responseJSON);
  }

  function background(weatherData) {
    var day = document.querySelector('.day');
    var night = document.querySelector('.night');

    if (weatherData) {
      if (weatherData.weather[0].icon.endsWith("n")) {
        gsap.to(night, {opacity: 1, duration: 0.5});
      } else {
        gsap.to(day, {opacity: 1, duration: 0.5});
      }
    }
  }