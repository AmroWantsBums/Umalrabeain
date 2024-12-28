const mainContent = document.querySelector("#main-content");
const aside = document.querySelector("aside");
const sections = mainContent.querySelectorAll("h1");
const asideItems = aside.querySelectorAll("li");

function updateFontSize() {
    sections.forEach((section, index) => {
        const sectionRect = section.getBoundingClientRect();
        
        if (sectionRect.top <= window.innerHeight && sectionRect.bottom >= 0) {
            asideItems[index].style.fontSize = "150%";
        } else {
            asideItems[index].style.fontSize = "120%"; 
        }
    });
}

function scrollToSection(event) {
    const clickedIndex = Array.from(asideItems).indexOf(event.target);
    
    if (clickedIndex >= 0 && clickedIndex < sections.length) {
        sections[clickedIndex].scrollIntoView({
            behavior: "smooth",
            block: "start"       
        });
    }
}

asideItems.forEach(item => {
    item.addEventListener("click", scrollToSection);
});

asideItems.forEach(item => {
    item.addEventListener("mouseover", function(){
        item.style.fontSize = "160%"
    })
})

asideItems.forEach(item => {
    item.addEventListener("mouseleave", function(){
        item.style.fontSize = "120%"
        updateFontSize();
    })
})

window.addEventListener("scroll", updateFontSize);

updateFontSize();

