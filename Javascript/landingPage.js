const logo = document.querySelector("#umalrabeain-logo");
const dot = document.querySelector("#pre-load-dot");

setTimeout(() => {
    dot.style.opacity = "1";
    setTimeout(() => {
        logo.style.opacity = "1";
        document.querySelector("body").style.backgroundColor = "#b0d0d3";
        // setTimeout(() => { 
        //     dot.style.opacity = "0";
        //     logo.style.opacity = "0";
        //     setTimeout(() => {  
        //         window.location.href = "./Home/homePage.html";
        //     }, 1000);
        // }, 2000);
    }, 1000);
}, 1000);
