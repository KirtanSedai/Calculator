// Get references to the HTML elements
const screen = document.getElementById("screen");
const buttons = document.querySelectorAll(".btn");
const powerButton = document.getElementById("power");

// Variable to keep track of the calculator's power state
let isOn = false;

// Function to handle button clicks
function handleButtonClick(e) {
  const value = e.target.textContent;
  // Clear the screen
  if (value === "CL") {
    screen.value = "";
  }
  // Evaluate the expression
  else if (value === "=") {
    try {
      screen.value = eval(screen.value);
    } catch (error) {
      screen.value = "Error";
    }
  }
  // Toggle power state
  else if (value === "ON" || value === "OFF") {
    togglePower();
  }
  // Append button value to the screen if calculator is on
  else {
    if (isOn) {
      screen.value += value;
    }
  }
}

// Function to toggle power state
function togglePower() {
  isOn = !isOn;
  powerButton.textContent = isOn ? "ON" : "OFF";
  powerButton.style.backgroundColor = isOn ? "green" : "red";
  screen.value = "";
  screen.readOnly = !isOn; // Set the readOnly attribute based on the power state
}

// Function to handle keyboard input
function handleKeyboardInput(e) {
  const key = e.key;

  // Prevent input when calculator is off
  if (!isOn) return;

  // Append key value to the screen if calculator is on and key is a single digit or operator
  if (
    (key >= "0" && key <= "9") ||
    key === "/" ||
    key === "*" ||
    key === "-" ||
    key === "+" ||
    key === "."
  ) {
    screen.value += key;
  }
  // Evaluate the expression
  else if (key === "Enter") {
    try {
      screen.value = eval(screen.value);
    } catch (error) {
      screen.value = "Error";
    }
  }
  // Remove the last character from the screen
  else if (key === "Backspace") {
    screen.value = screen.value.slice(0, -1);
  }
  // Clear the screen
  else if (key === "Escape") {
    screen.value = "";
  }
}

// Add event listeners for button clicks
buttons.forEach((button) => {
  button.addEventListener("click", handleButtonClick);
});

// Add event listener for keyboard input
document.addEventListener("keydown", handleKeyboardInput);

// Set initial power state
togglePower();
