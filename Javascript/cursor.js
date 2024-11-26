const TAIL_LENGTH = 20;

const cursor = document.getElementById('cursor');
let mouseX = 0;
let mouseY = 0;

let cursorCircles;
let cursorHistory = Array(TAIL_LENGTH).fill({ x: 0, y: 0 });

let isHoveringImage = false;  // Flag to check if the mouse is over the image

function onMouseMove(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
}

function initCursor() {
  for (let i = 0; i < TAIL_LENGTH; i++) {
    let div = document.createElement('div');
    div.classList.add('cursor-circle');
    cursor.append(div);
  }
  cursorCircles = Array.from(document.querySelectorAll('.cursor-circle'));
}

function updateCursor() {
  cursorHistory.shift();
  cursorHistory.push({ x: mouseX, y: mouseY });

  for (let i = 0; i < TAIL_LENGTH; i++) {
    let current = cursorHistory[i];
    let next = cursorHistory[i + 1] || cursorHistory[TAIL_LENGTH - 1];

    let xDiff = next.x - current.x;
    let yDiff = next.y - current.y;

    current.x += xDiff * 0.35;
    current.y += yDiff * 0.35;

    // Calculate base scale from the tail length
    let scale = i / TAIL_LENGTH;

    // Apply hover effect scale if hovering over the image
    if (isHoveringImage) {
      scale *= 2.5;  
    }

    cursorCircles[i].style.transform = `translate(${current.x}px, ${current.y}px) scale(${scale})`;
  }

  requestAnimationFrame(updateCursor);
}

document.addEventListener('mousemove', onMouseMove, false);

initCursor();
updateCursor();

let currentUrl = window.location.href;
let pageName = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
const nameIcon = document.querySelector("#name-logo");
if (pageName != "index.html"){
  nameIcon.addEventListener("click", function(){
    window.location.href = "../Home/homePage.html";
  })
  nameIcon.addEventListener("mouseenter", function(){
    nameIcon.style.fontSize = "2.2vw";
    
  })
  nameIcon.addEventListener("mouseleave", function(){
    nameIcon.style.fontSize = "2vw";
  })
}


