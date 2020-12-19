async function loadJamatTimes(city) {
    const response = await fetch("data/mosqueData.json");
    const data = await response.json();
    fillDropdown(data, city)
    showDefaultMosque(data)

}

function fillDropdown(data, city) {
    var dropdown = document.getElementById('mosque-dropdown');
    dropdown.innerHTML = Object.values(data).map(function(mosque) {
        if(mosque.city === Cookies.get("city") || mosque.city === city) {
            return `<option value="${mosque.value}">${mosque.dropdownid}</option>`;
        }
    }).join("");
    getTimesForMosque();
    fillJamatTimesDesktop(data);
}

async function getTimesForMosque() {
    var value = document.querySelector('select').value;
    if (value != "Select Mosque") {
        const response2 = await fetch("data/mosqueData.json");
        const times2 = await response2.json();
        let timings = times2[value];
        fillJamatTimes(timings);
    }
}

function setDefaultMosque(){
    value = document.querySelector('select').value;
    Cookies.set("defaultMosque",value,{expires: 9999, samesite: 'lax'})
    Toast = Swal.mixin({
        toast: true,
        position: "center",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Mosque has been saved!'
      }) 
}

async function showDefaultMosque(data){
    var chosenMosque = data[Cookies.get("defaultMosque")].value
    document.querySelector('select').value = chosenMosque
    getTimesForMosque()
}

  



function fillJamatTimes(times) {
    document.querySelector('.j-fajr').innerHTML = times.fajr;
    document.querySelector('.j-zuhr').innerHTML = times.zuhr;
    document.querySelector('.j-asr').innerHTML = times.asr;
    document.querySelector('.j-maghrib').innerHTML = times.maghrib;
    document.querySelector('.j-isha').innerHTML = times.esha;
}

function fillJamatTimesDesktop(times) {
    document.querySelector('#defaultmosque').style.display = 'none';

    let m1title = document.querySelector('#mosque-1-title');
    let m2title = document.querySelector('#mosque-2-title');
    let m3title = document.querySelector('#mosque-3-title');
    let m4title = document.querySelector('#mosque-4-title');

    let m1 = document.querySelector('.mosque-1');
    let m1fajr = document.querySelector('.mosque-1 .j-fajr');
    let m1zuhr = document.querySelector('.mosque-1 .j-zuhr');
    let m1asr = document.querySelector('.mosque-1 .j-asr');
    let m1maghrib = document.querySelector('.mosque-1 .j-maghrib');
    let m1isha = document.querySelector('.mosque-1 .j-isha');

    let m2 = document.querySelector('.mosque-2');
    let m2fajr = document.querySelector('.mosque-2 .fajr');
    let m2zuhr = document.querySelector('.mosque-2 .zuhr');
    let m2asr = document.querySelector('.mosque-2 .asr');
    let m2maghrib = document.querySelector('.mosque-2 .maghrib');
    let m2isha = document.querySelector('.mosque-2 .isha');

    let m3 = document.querySelector('.mosque-3');
    let m3fajr = document.querySelector('.mosque-3 .fajr');
    let m3zuhr = document.querySelector('.mosque-3 .zuhr');
    let m3asr = document.querySelector('.mosque-3 .asr');
    let m3maghrib = document.querySelector('.mosque-3 .maghrib');
    let m3isha = document.querySelector('.mosque-3 .isha');

    let m4 = document.querySelector('.mosque-4');
    let m4fajr = document.querySelector('.mosque-4 .fajr');
    let m4zuhr = document.querySelector('.mosque-4 .zuhr');
    let m4asr = document.querySelector('.mosque-4 .asr');
    let m4maghrib = document.querySelector('.mosque-4 .maghrib');
    let m4isha = document.querySelector('.mosque-4 .isha');

    let mosqueNames = [];

    Object.values(times).map(mosque => {
        for (const value in mosque) {
            if (mosque.city === Cookies.get("city")) {
                mosqueNames.push(mosque.dropdownid, mosque.fajr, mosque.zuhr, mosque.asr, mosque.maghrib, mosque.esha);
            }
        }
    }).join("");


    switch(mosqueNames.length) {
        case 0:
            document.querySelector('.jamat-times-container').style.display = 'none';

        case 66:
            m1title.innerHTML = mosqueNames[0];
            m2title.style.display = "none";
            m3title.style.display="none";
            m4title.style.display="none";

            m2.style.display = "none";
            m3.style.display = "none";
            m4.style.display = "none";

            m1fajr.innerHTML = mosqueNames[1];
            m1zuhr.innerHTML = mosqueNames[2];
            m1asr.innerHTML = mosqueNames[3];
            m1maghrib.innerHTML = mosqueNames[4];
            m1isha.innerHTML = mosqueNames[5];


            
        case 132:
            m1title.innerHTML = mosqueNames[0];
            m2title.innerHTML = mosqueNames[66];
            m3title.style.display="none";
            m4title.style.display="none";

            m3.style.display = "none";
            m4.style.display = "none";

            m1fajr.innerHTML = mosqueNames[1];
            m1zuhr.innerHTML = mosqueNames[2];
            m1asr.innerHTML = mosqueNames[3];
            m1maghrib.innerHTML = mosqueNames[4];
            m1isha.innerHTML = mosqueNames[5];

            m2fajr.innerHTML = mosqueNames[67];
            m2zuhr.innerHTML = mosqueNames[68];
            m2asr.innerHTML = mosqueNames[69];
            m2maghrib.innerHTML = mosqueNames[70];
            m2isha.innerHTML = mosqueNames[71];
        
        case 198:
            m1title.innerHTML = mosqueNames[0];
            m2title.innerHTML = mosqueNames[66];
            m3title.innerHTML = mosqueNames[132];
            m4title.style.display="none";

            m4.style.display = "none";

            m1fajr.innerHTML = mosqueNames[1];
            m1zuhr.innerHTML = mosqueNames[2];
            m1asr.innerHTML = mosqueNames[3];
            m1maghrib.innerHTML = mosqueNames[4];
            m1isha.innerHTML = mosqueNames[5];

            m2fajr.innerHTML = mosqueNames[67];
            m2zuhr.innerHTML = mosqueNames[68];
            m2asr.innerHTML = mosqueNames[69];
            m2maghrib.innerHTML = mosqueNames[70];
            m2isha.innerHTML = mosqueNames[71];

            m3fajr.innerHTML = mosqueNames[133];
            m3zuhr.innerHTML = mosqueNames[134];
            m3asr.innerHTML = mosqueNames[135];
            m3maghrib.innerHTML = mosqueNames[136];
            m3isha.innerHTML = mosqueNames[137];

        case 264:
            m1title.innerHTML = mosqueNames[0];
            m2title.innerHTML = mosqueNames[66];
            m3title.innerHTML = mosqueNames[132];
            m4title.innerHTML = mosqueNames[198];

            m1fajr.innerHTML = mosqueNames[1];
            m1zuhr.innerHTML = mosqueNames[2];
            m1asr.innerHTML = mosqueNames[3];
            m1maghrib.innerHTML = mosqueNames[4];
            m1isha.innerHTML = mosqueNames[5];

            m2fajr.innerHTML = mosqueNames[67];
            m2zuhr.innerHTML = mosqueNames[68];
            m2asr.innerHTML = mosqueNames[69];
            m2maghrib.innerHTML = mosqueNames[70];
            m2isha.innerHTML = mosqueNames[71];

            m3fajr.innerHTML = mosqueNames[133];
            m3zuhr.innerHTML = mosqueNames[134];
            m3asr.innerHTML = mosqueNames[135];
            m3maghrib.innerHTML = mosqueNames[136];
            m3isha.innerHTML = mosqueNames[137];

            m4fajr.innerHTML = mosqueNames[199];
            m4zuhr.innerHTML = mosqueNames[200];
            m4asr.innerHTML = mosqueNames[201];
            m4maghrib.innerHTML = mosqueNames[202];
            m4isha.innerHTML = mosqueNames[203];
    }

}



