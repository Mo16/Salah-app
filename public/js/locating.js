function getLocation() {
    loadShow();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(savePosition, showError);
    } else {
        makeAlert(
            "Geolocation is not supported by this browser Please enter your postcode.",
            true
        );
    }
}

function savePosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    Cookies.set("longitude", longitude, { expires: 9999, samesite: "lax" });
    Cookies.set("latitude", latitude, { expires: 9999, samesite: "lax" });

    document.querySelector("section").style.display = "block";
    document.querySelector(".main").style.display = "none";
    document.querySelector("main").style.height = "auto";

    getBeginningTimes(longitude, latitude);
    getCity(longitude, latitude);
}

async function postCodeLocate(postcode) {
    loadShow();
    let cityData = await fetch(
        `https://api.postcodes.io/postcodes/${postcode}`
    );
    let data = await cityData.json();
    

    if (data.status == 200) {
        let longitude = data.result.longitude;
        let latitude = data.result.latitude;
        document.querySelector("section").style.display = "block";
        document.querySelector(".main").style.display = "none";
        Cookies.set("longitude", longitude, { expires: 9999 });
        Cookies.set("latitude", latitude, { expires: 9999 });
        document.querySelector("main").style.height = "auto";
        getCity(longitude, latitude);
        getBeginningTimes(longitude, latitude);
    } else if (PCResponse.status === 404) {
        loadHide();
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 2);
        makeAlert("Please enter a valid postcode.", true);
    } else {
        loadHide();
        makeAlert(
            "There was an error getting the postcode location. Please try again later.",
            false
        );
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 2);
    }
}

async function getCity(longitude, latitude) {
    const response = await fetch(`https://geocode.xyz/${latitude},${longitude}?json=1&auth=726627711554214894658x31366`);
    // const response = await fetch(
    //     `https://geocode.xyz/${latitude},${longitude}?json=1`
    // );

    let data = await response.json();
    let city = await validateCity(data);

    Cookies.set("city", city, { expires: 9999, samesite: "lax" });
    document.querySelector(".location p").innerHTML = Cookies.get("city");
    loadJamatTimes(city);
    dayOrNight();
    loadHide();
    animateBoxes(1.5);
}

async function validateCity(data, cities) {
    const mosqueData = await fetch("data/mosqueData.json");
    const mosqueDataJson = await mosqueData.json();

    var city;
    let mosqueCities = [];
    console.log(data)

    Object.values(mosqueDataJson)
        .map((mosque) => {
            mosqueCities.push(mosque.city);
        })
        .join("");
    try {
        if (mosqueCities.includes(data.city.toLowerCase())) {
            city = data.city;
        } else {
            city = data.adminareas.admin6.name;
        }
    } catch (err) {
        loadHide();
        document.querySelector("#learnsection div").style.display = "none";
        setTimeout(() => {
            makeAlert(
                "Please try again. <br> If you repeatedly get this error, this service may currently be unavailable.",
                false
            );
        }, 1000);
    }

    return city.toLowerCase();
}

function postCodeCheck(toCheck) {
    var alpha1 = "[abcdefghijklmnoprstuwyz]"; // Character 1
    var alpha2 = "[abcdefghklmnopqrstuvwxy]"; // Character 2
    var alpha3 = "[abcdefghjkpmnrstuvwxy]"; // Character 3
    var alpha4 = "[abehmnprvwxy]"; // Character 4
    var alpha5 = "[abdefghjlnpqrstuwxyz]"; // Character 5
    var BFPOa5 = "[abdefghjlnpqrst]"; // BFPO alpha5
    var BFPOa6 = "[abdefghjlnpqrstuwzyz]"; // BFPO alpha6
    var pcexp = new Array();
    pcexp.push(
        new RegExp(
            "^(bf1)(\\s*)([0-6]{1}" + BFPOa5 + "{1}" + BFPOa6 + "{1})$",
            "i"
        )
    );
    pcexp.push(
        new RegExp(
            "^(" +
                alpha1 +
                "{1}" +
                alpha2 +
                "?[0-9]{1,2})(\\s*)([0-9]{1}" +
                alpha5 +
                "{2})$",
            "i"
        )
    );
    pcexp.push(
        new RegExp(
            "^(" +
                alpha1 +
                "{1}[0-9]{1}" +
                alpha3 +
                "{1})(\\s*)([0-9]{1}" +
                alpha5 +
                "{2})$",
            "i"
        )
    );
    pcexp.push(
        new RegExp(
            "^(" +
                alpha1 +
                "{1}" +
                alpha2 +
                "{1}" +
                "?[0-9]{1}" +
                alpha4 +
                "{1})(\\s*)([0-9]{1}" +
                alpha5 +
                "{2})$",
            "i"
        )
    );
    pcexp.push(/^(GIR)(\s*)(0AA)$/i);
    pcexp.push(/^(bfpo)(\s*)([0-9]{1,4})$/i);
    pcexp.push(/^(bfpo)(\s*)(c\/o\s*[0-9]{1,3})$/i);
    pcexp.push(/^([A-Z]{4})(\s*)(1ZZ)$/i);
    pcexp.push(/^(ai-2640)$/i);
    var postCode = toCheck;
    var valid = false;
    for (var i = 0; i < pcexp.length; i++) {
        if (pcexp[i].test(postCode)) {
            pcexp[i].exec(postCode);
            postCode = RegExp.$1.toUpperCase() + " " + RegExp.$3.toUpperCase();
            postCode = postCode.replace(/C\/O\s*/, "c/o ");
            if (toCheck.toUpperCase() == "AI-2640") {
                postCode = "AI-2640";
            }
            valid = true;
            break;
        }
    }
    if (valid) {
        return postCode;
    } else return false;
}

function showError(error) {
    loadHide();
    switch (error.code) {
        case error.PERMISSION_DENIED:
            makeAlert("Permission was denied.", true);
            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 2);
            break;
        case error.POSITION_UNAVAILABLE:
            makeAlert("Your position is unavailable", true);
            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 2);
            break;
        case error.TIMEOUT:
            makeAlert("The request to get the location timed out.", true);
            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 2);
            break;
        case error.UNKNOWN_ERROR:
            makeAlert("An unknown error occurred.", true);
            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 2);
            break;
    }
}
