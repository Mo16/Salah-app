// const cursor = document.querySelector('.cursor');
// const section = document.querySelector('#learnmore');

// document.addEventListener("mousemove", e => {
//     let y = e.pageY - 10;
//     let x = e.pageX - 10;

//     cursor.setAttribute("style","top: "+(e.pageY - scrollY)+"px; left: "+(e.pageX)+"px")
// })

let open=false;
const navlist = document.querySelector('.navphone ul');

function navOpen() {
    gsap.set('.navphone ul', {opacity: 0});
    if (open == false) {
        gsap.to('.navphone ul', {display: "flex", duration: 0.1, opacity: 1, ease: "linear"});
        gsap.to('#hamburgericon', {duration: 1.5, rotation: "90deg", ease: "elastic", color: "#1D3354"});
        open=true;
    } else if (open == true) {
        gsap.to(navlist, {duration: 0.2, opacity: 0, ease: "linear"});
        setTimeout(() => {
            gsap.to(navlist, {display: "none"});
        }, 150);
        gsap.set('.navphone ul', {opacity: 0, scale: 1});
        gsap.to('#hamburgericon', {duration: 1.5, rotation: "0deg", ease: "elastic",  color: "#EAEAEA"});
        open=false;
    }
}

function navClose() {
    gsap.to(navlist, {duration: 0.1, opacity: 0, ease: "linear"});
    setTimeout(() => {
        gsap.to(navlist, {display: "none"});
    }, 150);
    gsap.set('.navphone ul', {opacity: 0});
    gsap.to('#hamburgericon', {duration: 1.5, rotation: "0deg", ease: "elastic",  color: "#EAEAEA"});
    open=false;
}

function makeAlert(alertmessage, postcodeOrNot) {
    gsap.set('.alertContainer', {opacity:0, y: -100});
    document.querySelector('.alertContainer').style.display = "block";
    document.querySelector('.alertMessage').innerHTML = alertmessage;
    gsap.to('.alertContainer', {opacity: 1, duration: 0.3, y: 0});

    if (postcodeOrNot==true) {
        document.querySelector('.postcode-entrybox').display = "block";
        document.querySelector('.btnok').style.display="none";
        document.querySelector('.forPostcode').style.display="flex";
    } else {
        document.querySelector('.btnok').style.display="flex";
        document.querySelector('.forPostcode').style.display="none";
    }
}

function postcodeShow() {
    makeAlert('Please enter your postcode:', true)
}

function hideAlert(isPostcode) {
    if (isPostcode == true) {
        const postcodeEntryBox = document.getElementById('postcode-box').value;
        if (postCodeCheck(postcodeEntryBox)!=false) {
            postCodeLocate(postCodeCheck(postcodeEntryBox));
            document.querySelector('.postcode-error').style.display = "none";
            gsap.to('.alertContainer', {opacity: 0, duration: 0.1, y:-100});
            setTimeout(() => {
                document.querySelector('.alertContainer').style.display = "none";
            }, 500);
        } else {
            document.querySelector('.postcode-error').style.display = "block";
            //document.querySelector('.postcode-error').style.animationName = "shake";
            setTimeout(() => {
                window.scrollTo(0,0,);
            }, 2);
            
        };
    }
}

function loadShow() {
    document.querySelector('.loadicon').style.display = "block";
    document.querySelector('.loadicon').style.transform = "translateZ(200px)";
}

function loadHide() {
    document.querySelector('.loadicon').style.display = "none";
}

window.addEventListener('resize' , e => {
    button = document.querySelector("button")
    if (/Android|webOS|iPhone|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        button.style.display = "block"
        if (window.innerWidth > window.innerHeight) {
            document.querySelector('body *').display = "none";
            document.querySelector('.portrait-mode').display = "block";
        } else {

            document.querySelector('.portrait-mode').display = "none";
            button.style.display = "block";
            
        }
    } else {

        document.querySelector('.portrait-mode').display = "none";
        button.style.display = "none";

    }
});

window.addEventListener("orientationchange", checkPhone);

function checkPhone() {
    switch(window.orientation) {  
        case -90: case 90:
            document.querySelector('body *').style.display = "none";
            document.querySelector('.portrait-mode').style.display = "block";
            document.querySelector('body').style.overflow = 'hidden';
            break; 
        default:
            document.querySelector('.portrait-mode').style.display = "none";
            document.querySelector('body').style.overflow = 'auto';
            break; 
    }
}
