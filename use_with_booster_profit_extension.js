// ==UserScript==
// @name         Booster Pack link to badge of booster pack
// @namespace    https://github.com/encumber
// @version      2024-02-10
// @description  used to easily go to steam trading cards for a given badge when in the booster pack creator
// @author       Nitoned
// @match        https://steamcommunity.com/tradingcards/boostercreator/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=steamcommunity.com
// @grant        none
// ==/UserScript==

// Function to create and append new button
function createNewButton(link) {
    // Check if the link has already been processed
    if (link.dataset.processed === 'true') {
        return; // Exit function if the link has already been processed
    }

    // Extract the number after '/listings/753/' using regular expression
    const regex = /\/listings\/753\/(\d+)/;
    const match = regex.exec(link.href);
    if (match && match[1]) {
        const number = match[1];
        // Create a new button element
        const newButton = document.createElement('button');
        // Set the onclick event to open the URL in a new tab
        newButton.onclick = function() {
            window.open(`https://steamcommunity.com/my/gamecards/${number}`, '_blank');
        };
        // Set the text content of the new button
        newButton.textContent = 'Link to Game Cards'; // You can set your preferred text here
        // Apply CSS styles to the button
        newButton.style.padding = '5px 10px'; // Add padding around the button
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
        // Append a line break before the new button
        link.parentNode.insertBefore(document.createElement('br'), link.nextSibling);
        // Append the new button after the line break
        link.parentNode.insertBefore(newButton, link.nextSibling);
        // Mark the link as processed
        link.dataset.processed = 'true';
    }
}

// Function to run the script every 200 milliseconds
function runScript() {
    // Select all <a> tags with the class 'ViewMarket'
    const viewMarketLinks = document.querySelectorAll('a.ViewMarket:not([data-processed="true"])');
    // Iterate through each selected link
    viewMarketLinks.forEach(link => {
        createNewButton(link);
    });
}

// Run the script initially
runScript();

// Run the script every 200 milliseconds
setInterval(runScript, 200);
