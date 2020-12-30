gsap.registerPlugin(ScrollTrigger);

gsap.from('#mh1', {duration: 1, y:-50, opacity:0, delay: 0.25, ease: "expo.out"});
gsap.from('#mp', {duration: 0.5, opacity: 0, delay: 0.5});
gsap.from('#learnbtn', {duration: 1, opacity: 0, delay: 1, ease: 'power1.out'});
gsap.from('.or-enter-manually', {duration: 1, opacity: 0, delay: 1.3, ease: 'power1.out'});


var learnbtn = document.querySelector('#learnbtn');

function parallaxIt(e, target, movement = 1) {
  var boundingRect = learnbtn.getBoundingClientRect();
  var relX = e.pageX - boundingRect.left;
  var relY = e.pageY - boundingRect.top;
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  gsap.to(target, {
    x: (relX - boundingRect.width/2) * movement,
    y: (relY - boundingRect.height/2 - scrollTop) * movement,
    ease: "power1",
    duration: 0.6
  });
}

function callParallax(e){
  parallaxIt(e, '#learnbtn');
}


function animateBoxes(delayTime){
  gsap.from('.start-times-container', {duration: 1, y:-100 ,x:100, opacity:0, delay: delayTime, ease: "expo.in"});
  gsap.from('.horizontal-scroll', {duration: 1, x:-50, opacity:0, delay: delayTime+0.5, ease: "expo.in"});
  gsap.from('.jamat-times-container', {duration: 1, y:-100, x:100, opacity:0, delay: delayTime, ease: "expo.in"});

}
animateBoxes(0.5)


learnbtn.addEventListener('mousemove', function(e){
  if (window.innerWidth > 700) {callParallax(e)}
});

learnbtn.addEventListener('mouseleave', function(e){
  gsap.to('#learnbtn', {
    scale:1,
    x: 0,
    y: 0,
    ease: "elastic",
    duration: 1
  });
});

const jamatContainer = document.querySelector('.jamat-times-container');
const title = document.querySelector('.jamat-times-title');
const dropdown = document.querySelector('.mosque-select-container');
const times1 = document.querySelector('.mosque-1');
const times2 = document.querySelector('.mosque-2');
const times3 = document.querySelector('.mosque-3');
const times4 = document.querySelector('.mosque-4');
const mosque1title = document.querySelector('#mosque-1-title');
const mosque2title = document.querySelector('#mosque-2-title');
const mosque3title = document.querySelector('#mosque-3-title');
const mosque4title = document.querySelector('#mosque-4-title');


jamatContainer.addEventListener("mousemove", e => {
  if (window.innerWidth > 700) {
    let xAxis = ((window.innerWidth / 2) - e.pageX) / 50;
    let yAxis = ((window.innerHeight / 2) - e.pageY  + 100) / 50;
    jamatContainer.style.transform = `rotateX(${yAxis}deg) rotateY(${xAxis}deg)`;

    jamatContainer.style.transition = "all 1s ease"
    title.style.transition = "all 1s ease";
    dropdown.style.transition = "all 1s ease";
    jamatContainer.style.transition = "all 0.3s ease"
    times1.style.transition = "all 0.3s ease";
    times2.style.transition = "all 0.3s ease";
    times3.style.transition = "all 0.3s ease";
    times4.style.transition = "all 0.3s ease";
    mosque1title.style.transition = "all 0.3s ease";
    mosque2title.style.transition = "all 0.3s ease";
    mosque3title.style.transition = "all 0.3s ease";
    mosque4title.style.transition = "all 0.3s ease";

    jamatContainer.style.transform = "translateZ(50px)";
    title.style.transform = 'translateZ(50px)';
    title.style.fontSize = '1.3em';
    dropdown.style.transform = 'translateZ(150px)';
    //dropdown.style.boxShadow = `15px 15px 25px rgba(0,0,0,0.3)`;
    times1.style.transform = 'translateZ(20px)';
    times2.style.transform = 'translateZ(20px)';
    times3.style.transform = 'translateZ(20px)';
    times4.style.transform = 'translateZ(20px)';
    mosque1title.style.transform = 'translateZ(40px)';
    mosque2title.style.transform = 'translateZ(40px)';
    mosque3title.style.transform = 'translateZ(40px)';
    mosque4title.style.transform = 'translateZ(40px)';
  }
});

jamatContainer.addEventListener("mouseenter", e => {
  jamatContainer.style.transition = "all 0.1s ease";
});

jamatContainer.addEventListener("mouseleave", e => {
  if (window.innerWidth > 700) {
    jamatContainer.style.transition = "all 1s ease";
    jamatContainer.style.transform = "rotateX(0deg) rotateY(0deg)"
    title.style.transform = 'translateZ(0px)';
    title.style.fontSize = '1.1em';
    dropdown.style.transform = 'translateZ(0px)';
    dropdown.style.boxShadow = 'none';
    times1.style.transform = 'translateZ(0px)';
    times2.style.transform = 'translateZ(0px)';
    times3.style.transform = 'translateZ(0px)';
    times4.style.transform = 'translateZ(0px)';
    mosque1title.style.transform = 'translateZ(0px)';
    mosque2title.style.transform = 'translateZ(0px)';
    mosque3title.style.transform = 'translateZ(0px)';
    mosque4title.style.transform = 'translateZ(0px)';
  } else {
    dropdown.style.transform = 'translateZ(100px)';
  }
});