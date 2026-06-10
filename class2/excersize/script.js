/**
* Exercise
*/

// 1. load in DOM elements

// nameinput
const nameInput = document.getElementById("name-input");


// greet button
const greetButton = document.getElementById("greet-button");

// output
const output = document.getElementById("output");

// 2. add an event listener to the button
greetButton.addEventListener("click", function () {

    // 1. take the input value and trim it
    const value = nameInput.value.trim();

    // 2. validate that the input is not an empty string
    if (value === "") {
        output.textContent = "Please enter something";
        return;
    }

    // 3. after 1000ms, update the output
    setTimeout(function () {
        output.textContent = "Hello, " + value;
    }, 1000);
});
