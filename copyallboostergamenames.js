// ==UserScript==
// @name         Copy Game Names
// @namespace    https://github.com/encumber
// @version      2024-02-10
// @description  try to take over the world!
// @author       Nitoned
// @match        https://steamcommunity.com/tradingcards//boostercreator/
// @match        https://steamcommunity.com/tradingcards/boostercreator/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=steamcommunity.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function copyGameNamesToClipboard() {
    // Find select element with id "booster_game_selector"
    const selectElement = document.querySelector('#booster_game_selector');

    if (selectElement) {
        const gameNames = [];
        // Extract text from options
        selectElement.querySelectorAll('option').forEach(option => {
            gameNames.push(option.textContent.trim());
        });

        // Join game names with new lines
        const gameNamesText = gameNames.join('\n');

        // Create a temporary textarea element to copy text to clipboard
        const tempTextArea = document.createElement('textarea');
        tempTextArea.value = gameNamesText;

        // Append the textarea to the document
        document.body.appendChild(tempTextArea);

        // Select the text within the textarea
        tempTextArea.select();
        // Copy text to clipboard
        document.execCommand('copy');

        // Remove the temporary textarea
        document.body.removeChild(tempTextArea);

        console.log("Game names copied to clipboard successfully.");
    } else {
        console.log("No select element with id 'booster_game_selector' found.");
    }
}

// Create a button element
const copyButton = document.createElement('button');
copyButton.textContent = 'Copy Game Names';
copyButton.style.marginLeft = '10px'; // Add some margin to separate from the select element

// Find the div with class "booster_creator_left"
const boosterCreatorLeft = document.querySelector('.booster_creator_left');

// Find the initial h3 tag within boosterCreatorLeft
const initialH3Tag = boosterCreatorLeft.querySelector('h3');

// Create a new container div
const containerDiv = document.createElement('div');

// Append the initial h3 tag content to the container div
containerDiv.appendChild(document.createTextNode(initialH3Tag.textContent + ' '));

// Append the button to the container div
containerDiv.appendChild(copyButton);

// Replace the initial h3 tag content with the container div
initialH3Tag.innerHTML = '';
initialH3Tag.appendChild(containerDiv);

// Add click event listener to the button
copyButton.addEventListener('click', copyGameNamesToClipboard);

})();
