const visionSection = document.querySelector("#vision-section");
const whySection = document.querySelector("#why-section");
const doSection = document.querySelector("#do-section");

let image;
let p;

let scrollArray = [visionSection, whySection, doSection];

window.addEventListener("scroll", function () {

    scrollArray.forEach(element => {
        const sectionRect = element.getBoundingClientRect();
        const p = element.querySelector("p");
        const image = element.querySelector("img");

        if (sectionRect.top * 3.5  < window.innerHeight && sectionRect.bottom > 0) {
            p.style.opacity = "1";
            image.style.left = "0vw";
        } else {
            p.style.opacity = "0";
            image.style.left = "15vw";
        }
    });
});

const scrollText = document.querySelector("#scroll-text");

setInterval(function () {
    scrollText.style.transform = "translateY(30%)";
    setTimeout(function () {
        scrollText.style.transform = "translateY(0%)";
    }, 400);
}, 800);
