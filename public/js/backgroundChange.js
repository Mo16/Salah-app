function dayOrNight() {
    api = "2ca0429921c28bac953e647ade71e1ff";
    url = "https://api.openweathermap.org/data/2.5/weather";
    fetch(`${url}?lat=${Cookies.get("latitude")}&lon=${Cookies.get("longitude")}&appid=${api}&units=metric`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        weatherData = data;
        background();
      });
  }

  function background() {
    var section = document.getElementsByTagName("BODY")[0]
    if (weatherData) {
      if (weatherData.weather[0].icon.endsWith("n")) {

        section.style.backgroundColor = '#303030'

      } else {

        section.style.background = "linear-gradient(45deg, #2c3c52, #091101)"
      }
    }
  }

  // dayOrNight()