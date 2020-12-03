function findClosestMosque() {
    var mosqueDistance = [];
    fetch("data/mosqueData.json")
      .then((response) => response.json())
      .then((data) => {
        const mosques = Object.values(data);
        for (const key of mosques) {
          var from = turf.point([key.longitude, key.latitude]),
          to = turf.point([Cookies.get('longitude'), Cookies.get('latitude')]),
          distance = turf.distance(from, to);
          value = [distance, key.name],
          mosqueDistance.push(value);
        }
        distances = [];
        for (let i = 0; i < mosqueDistance.length; i++) {
          distances.push(mosqueDistance[i][0]);
        }
        lowest = min(distances);
        for (let c = 0; c < mosqueDistance.length; c++) {
          if (mosqueDistance[c][0] === lowest) {
            writeClosestMosqueTimes(mosqueDistance[c][1]);
          }
        }
      });
  }
  
  function min(input) {
    if (toString.call(input) !== "[object Array]") return false;
    return Math.min.apply(null, input);
  }
  
  function writeClosestMosqueTimes(chosen){
    fetch(`./data/mosqueData.json`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      var times = data[`${chosen}Data`]
      document.getElementById("dropdown").innerHTML = `Using closest Mosque (${times.dropdownid})`
      writeJamatTimes(times);
    });
  }
  
  findClosestMosque()