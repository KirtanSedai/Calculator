// Hide welcome message when any button is clicked
let welcomeMessage = document.getElementById('welcome-message');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        welcomeMessage.style.display = 'none';
    });
});

// Calculator functionality
let screen = document.getElementById('screen');
let buttons = document.querySelectorAll('.btn'); // Moved declaration up
let screenvalue = '';

for (item of buttons) {
    item.addEventListener('click', (e) => {
        let buttonText = e.target.innerText;
        // Perform calculations/handle special cases
        if (buttonText == '=') {
            screen.value = eval(screenvalue);
        } else if (buttonText == 'CL') {
            // Clear screen
            screenvalue = '';
            screen.value = screenvalue;
        } else if (buttonText == "ON") {
            // Clear screen when power button pressed
            screenvalue = '';
            screen.value = screenvalue;
        } else {
            // Append button text to screen input
            screenvalue += buttonText;
            screen.value = screenvalue;
        }
    });
}

// Keyboard input handling
screen.addEventListener('keyup', (e) => {
    if (e.ctrlKey && e.key.toLowerCase() === 'a') {
        // Select all text on Ctrl+A
        screen.select();
        e.preventDefault();
    } else if (e.key === 'Backspace' && window.getSelection().toString() === screen.value) {
        // Clear screen on Backspace when everything is selected
        screenvalue = '';
        screen.value = screenvalue;
        e.preventDefault();
    } else if ('0123456789+-*/.%'.includes(e.key)) {
        // Append valid characters to screen input
        screenvalue += e.key;
        screen.value = screenvalue;
    } else if (e.key === 'Enter') {
        // Perform calculation on Enter key
        try {
            screen.value = eval(screenvalue);
            screenvalue = screen.value;
        } catch (error) {
            // Display error if calculation fails
            screen.value = 'Error';
            screenvalue = '';
        }
        e.preventDefault();
    }

    // Prevent arrow key default actions
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
    }
});
