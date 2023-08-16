// default setting
const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = "#000000";
const DEFAULT_MODE = 'color';

// UI variables
const canvas = document.querySelector("#canvas");
const sizeDisplay = document.querySelector(".canvasSize");
const sliderValue = document.querySelector("#sizeSlider");
const colorModeBtn = document.querySelector('#colorMode');
const rainbowModeBtn = document.querySelector('#rainbowMode');
const eraserModeBtn = document.querySelector('#eraserMode');
const clearBtn = document.querySelector("#clearCanvas");
const colorPicker = document.querySelector('#colorPicker');

// UI logic
let currentSize = DEFAULT_SIZE;
let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

sliderValue.onmousemove = (e) => updateSizeDisplay(e.target.value);
sliderValue.onchange = (e) => changeSize(e.target.value);
colorModeBtn.onclick = () => changeCurrentMode('color');
rainbowModeBtn.onclick = () => changeCurrentMode('rainbow');
eraserModeBtn.onclick = () => changeCurrentMode('eraser');
clearBtn.onclick = () => resetCanvas();
colorPicker.oninput = (e) => changeCurrentColor(e.target.value);

function changeCurrentColor (newColor) {
    currentColor = newColor;
};

function changeCurrentSize (newSize) {
    currentSize = newSize;
};

function changeCurrentMode (newMode) {
    triggerButton(newMode);
    currentMode = newMode;
};

// handles all size changing events
function changeSize (canvasSize) {
    changeCurrentSize(canvasSize);
    updateSizeDisplay(canvasSize);
    resetCanvas();
};

// show user the size selection on canvas
function updateSizeDisplay (value) {
    sizeDisplay.textContent = `${value} x ${value}`;
};

// reset canvas size and return a new canvas
function resetCanvas () {
    clearCanvas();
    setupCanvas(currentSize);
};

// clear off everyting on canvas
function clearCanvas () {
    canvas.innerHTML = '';
};

// create grid tracks and add a class to each grid
function setupCanvas (canvasSize) {
    canvas.style.gridTemplateColumns = `repeat(${canvasSize}, 1fr)`;
    canvas.style.gridTemplateRows = `repeat(${canvasSize}, 1fr)`;

    for (let i = 0; i < canvasSize ** 2; i++) {
        const canvasElement = document.createElement('div');
        canvasElement.classList.add = ('canvasElement');
        canvasElement.addEventListener('mouseover', changeColor);
        canvasElement.addEventListener('mousedown', changeColor);
        canvas.appendChild(canvasElement);
    };
};

// change the color on brush
function changeColor (e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    if (currentMode === 'color') {
        e.target.style.backgroundColor = currentColor;
    } else if (currentMode === 'rainbow') {
        const randomR = Math.floor(Math.random() * 256);
        const randomG = Math.floor(Math.random() * 256);
        const randomB = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
    } else if (currentMode === 'eraser') {
        e.target.style.backgroundColor = '#ffffff';
    };
};

// Button animation after click
function triggerButton (newMode) {
    if (currentMode === 'color') {
        colorModeBtn.classList.remove('active');
    } else if (currentMode === 'rainbow') {
        rainbowModeBtn.classList.remove('active');
    } else if (currentMode === 'eraser') {
        eraserModeBtn.classList.remove('active');
    };

    if (newMode === 'color') {
        colorModeBtn.classList.add('active');
    } else if (newMode === 'rainbow') {
        rainbowModeBtn.classList.add('active');
    } else if (newMode === 'eraser') {
        eraserModeBtn.classList.add('active');
    };
};

// load up the default setting upon opening the page
window.onload = () => {
    setupCanvas(DEFAULT_SIZE);
    updateSizeDisplay(DEFAULT_SIZE);
    triggerButton(DEFAULT_MODE);
};