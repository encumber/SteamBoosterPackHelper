// ==UserScript==
// @name         Booster Pack link to badge of booster pack
// @namespace    https://github.com/encumber
// @version      2024-02-10
// @description  used to easily go to steam trading cards for a given badge when in the booster pack creator
// @author       Nitoned
// @match        https://steamcommunity.com/tradingcards//boostercreator/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=steamcommunity.com
// @grant        none
// ==/UserScript==

// Define an array to store processed game values
var processedGameValues = [];

// Define a function to execute the script
function executeScript() {
    // Find the selected option within the select element with id "booster_game_selector"
    var selectElement = document.getElementById("booster_game_selector");
    if (!selectElement) return; // Exit if select element not found
    var selectedOption = selectElement.options[selectElement.selectedIndex];

    // Pull the value and the game name from the selected option
    var gameValue = selectedOption.value;

    // Check if the game value has already been processed
    if (processedGameValues.includes(gameValue)) {
        return; // Exit the function if already processed
    }

    // Add the processed game value to the array
    processedGameValues.push(gameValue);

    var gameName = selectedOption.textContent;

    // Create the anchor element with the desired class and attributes
    var anchor = document.createElement("a");
    anchor.setAttribute("class", "ViewMarket");
    anchor.setAttribute("href", "https://steamcommunity.com/market/listings/753/" + gameValue + "-" + gameName + " Booster Pack");
    anchor.setAttribute("target", "_blank");
    anchor.setAttribute("data-processed", "true");

    // Construct the anchor element's text content with game name and value
    anchor.textContent = "View in Community Market";

    // Find the div element with class "booster_goo_cost"
    var divElement = document.querySelector(".booster_goo_cost");

    // Insert the anchor element before the div
    if (divElement) {
        divElement.parentNode.insertBefore(anchor, divElement);
    }

    // Call the function to create new buttons
    createNewButton(gameValue);
}

// Function to create new button
function createNewButton(gameValue) {
    // Find the div element with class "booster_goo_cost"
    var divElement = document.querySelector(".booster_goo_cost");

    // Create a new button element
    const newButton = document.createElement('button');
    // Set the onclick event to open the URL in a new tab
    newButton.onclick = function() {
        window.open(`https://steamcommunity.com/my/gamecards/${gameValue}`, '_blank');
    };
    // Set the text content of the new button
    newButton.textContent = 'Link to Game Cards'; // You can set your preferred text here
    // Apply CSS styles to the button
    newButton.style.padding = '5px'; // Add padding around the button
    newButton.style.marginBottom = '10px'; // Add margin below the button
    newButton.style.display = 'block'; // Make the button a block element
    newButton.style.width = 'fit-content'; // Set button width to fit content
    newButton.style.marginRight = 'auto'; // Center the button horizontally
    newButton.style.marginLeft = 'auto'; // Center the button horizontally
    newButton.style.background = 'linear-gradient( to bottom, rgba(47,137,188,1) 5%, rgba(23,67,92,1) 95%)'; // Apply linear gradient background
    newButton.style.color = '#ffffff'; // Set text color to white
    newButton.style.border = 'none'; // Remove button border
    newButton.style.borderRadius = '5px'; // Apply border radius
    // Add hover effect
    newButton.style.transition = 'background-color 0.3s'; // Smooth transition for hover effect
    newButton.addEventListener('mouseenter', function() {
        newButton.style.background = 'linear-gradient( to bottom, rgba(67,167,218,1) 5%, rgba(33,87,122,1) 95%)'; // Brighter gradient on hover
    });
    newButton.addEventListener('mouseleave', function() {
        newButton.style.background = 'linear-gradient( to bottom, rgba(47,137,188,1) 5%, rgba(23,67,92,1) 95%)'; // Original gradient on mouse leave
    });
    // Append the new button before the div
    if (divElement) {
        divElement.parentNode.insertBefore(newButton, divElement);
    }
}

// Function to run the script
function runScript() {
    executeScript();
}

// Call the function initially
executeScript();

// Run the script whenever the hash of the URL changes
window.onhashchange = runScript;

var styleTag = document.createElement("style");
styleTag.textContent = ".booster_option .ViewMarket { white-space: nowrap; }";
document.head.appendChild(styleTag);
