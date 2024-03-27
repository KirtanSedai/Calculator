// Get references to the HTML elements
const screen = document.getElementById('screen');
const buttons = document.querySelectorAll('.btn');
const powerButton = document.getElementById('on');

// Variable to keep track of the calculator's power state
let isOn = false;

// Function to handle button clicks
function handleButtonClick(e) {
 const value = e.target.textContent;

 // Clear the screen
 if (value === 'CL') {
   screen.value = '';
 }
 // Evaluate the expression
 else if (value === '=') {
   try {
     screen.value = eval(screen.value);
   } catch (error) {
     screen.value = 'Error';
   }
 }
 // Toggle power state
 else if (value === 'ON') {
   isOn = !isOn;
   powerButton.style.backgroundColor = isOn ? 'red' : 'green';
   screen.value = '';
 }
 // Append button value to the screen if calculator is on
 else {
   if (isOn) {
     screen.value += value;
   }
 }
}

let screenvalue = '';
for(item of buttons) {
 item.addEventListener('click', (e) =>{
   let buttonText = e.target.innerText;

   // Evaluate the expression
   if(buttonText== "="){
     screen.value =eval(screenvalue);
   }
   // Clear the screen
   else if (buttonText== 'CL'){
     screenvalue= '';
     screen.value = screenvalue;
   }
   // Toggle power state
   else if (buttonText == 'ON'){
     screenvalue= '';
     screen.value = screenvalue;
   }
   // Append button value to the screen
   else{
     screenvalue += buttonText;
     screen.value = screenvalue;
   }
 });
}

// Function to handle keyboard input
function handleKeyboardInput(e) {
 const key = e.key;

 // Append key value to the screen if calculator is on and key is a digit or operator
 if (key >= '0' && key <= '9' || key === '/' || key === '*' || key === '-' || key === '+' || key === '.') {
   if (isOn) {
     screen.value += key;
   }
 }
 // Evaluate the expression
 else if (key === 'Enter') {
   try {
     screen.value = eval(screen.value);
   } catch (error) {
     screen.value = 'Error';
   }
 }
 // Remove the last character from the screen
 else if (key === 'Backspace') {
   screen.value = screen.value.slice(0, -1);
 }
 // Clear the screen
 else if (key === 'Escape') {
   screen.value = '';
 }
}

// Add event listeners to buttons
buttons.forEach(button => {
 button.addEventListener('click', handleButtonClick);
});

// Add event listener to keyboard input
document.addEventListener('keydown', handleKeyboardInput);

// Set initial power state
powerButton.style.backgroundColor = 'green';
