// Get references to the HTML elements
const screen = document.getElementById('screen'); // Reference to the screen element
const buttons = document.querySelectorAll('.btn'); // References to all calculator buttons
const powerButton = document.getElementById('on'); // Reference to the power button

// Variable to keep track of the calculator's power state
let isOn = false; // Initialized as off

// Function to handle button clicks
function handleButtonClick(e) { // Event handler for button clicks
  const value = e.target.textContent; // Value of the clicked button
  if (value === 'CL') { // Clear button
    screen.value = ''; // Clear the screen
  } else if (value === '=') { // Equals button
    try {
      screen.value = eval(screen.value); // Evaluate the expression
    } catch (error) {
      screen.value = 'Error'; // Display error if evaluation fails
    }
  } else if (value === 'ON') { // Power button
    isOn = !isOn; // Toggle power state
    powerButton.style.backgroundColor = isOn ? 'red' : 'green'; // Change button color based on power state
    screen.value = ''; // Clear the screen
  } else { // Any other button
    if (isOn) { // If the calculator is on
      screen.value += value; // Append the button value to the screen
    }
  }
}

// Add event listeners to buttons
buttons.forEach(button => {
  button.addEventListener('click', handleButtonClick); // Click event listener for each button
});

// Function to handle keyboard input
function handleKeyboardInput(e) { // Event handler for keyboard input
  const key = e.key; // Pressed key
  if (key >= '0' && key <= '9' || key === '/' || key === '*' || key === '-' || key === '+' || key === '.') {
    if (isOn) {
      screen.value += key; // Append valid keys to the screen if the calculator is on
    }
  } else if (key === 'Enter') { // Enter key
    try {
      screen.value = eval(screen.value); // Evaluate the expression
    } catch (error) {
      screen.value = 'Error'; // Display error if evaluation fails
    }
  } else if (key === 'Backspace') { // Backspace key
    screen.value = screen.value.slice(0, -1); // Remove last character from the screen
  } else if (key === 'Escape') { // Escape key
    screen.value = ''; // Clear the screen
  }
}

// Add event listener to keyboard input
document.addEventListener('keydown', handleKeyboardInput); // Keyboard input event listener

// Set initial power state
powerButton.style.backgroundColor = 'green'; // Initially set the power button color to green
