// Array to hold navigation page details with names and links
const navPages = [
    {name: "Home" , href: '/Umalrabeain/index.html'},
    {name: "Our Work" , href: '/Umalrabeain/General Trade/generalTrade.html'},
    {name: "Meet Umalrabeain" , href: '/Umalrabeain/About Me/About-Me.html'},
    {name: "Contact" , href: '/Umalrabeain/About Me/About-Me.html'}
];

// Function to load the navbar based on the current page name
export function loadNavbar(CurrentPageName){
    const nav = document.querySelector("#nav-bar"); // Get the nav element in the header
    const ul = document.createElement("ul"); // Create a new unordered list for nav items

    // Loop through each page in the navPages array
    for(let page of navPages){
        const li = document.createElement("li"); // Create a list item for each page
        li.classList.add("navBarOption"); // Add a class to the list item
        
        // Check if the current page is not the one being looped over
        if (CurrentPageName != page.name){
            const a = document.createElement("a"); // Create an anchor tag for the link
            a.innerText = page.name; // Set the text of the link to the page name
            a.setAttribute("href", page.href); // Set the href attribute to the page's link
            li.appendChild(a); // Append the anchor to the list item            
            // if (page.name == "Our Work"){
            //     let dropdown = document.createElement("div");
            //     dropdown.id = "work-dropdown";
            //     dropdown.innerHTML = `
            //             <a href="#" class="dropdown-option">Medical Equipment</a>
            //             <a href="#" class="dropdown-option">Perfume</a>
            //             <a href="#" class="dropdown-option">General Trade</a>
            //     `;
            //     li.appendChild(dropdown);
            //     li.addEventListener("mouseover", function(){
            //         dropdown.style.opacity = "1";
            //     })
            //     li.addEventListener("mouseleave", function(){
            //         dropdown.style.opacity = "0";
            //     })
            // }
        } 
        else {
            // If it's the current page, just display the name
            li.innerText = page.name; 
            li.style.color = "black"; 
            li.style.textDecoration = "underline"; // Underline the current page name for emphasis
        }
        ul.appendChild(li); // Append the list item to the unordered list        
    }
    nav.appendChild(ul); // Finally, append the ul to the nav element
}

