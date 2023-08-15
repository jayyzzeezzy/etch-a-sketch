// default setting
const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = "#000000";
const DEFAULT_MODE = 'color';

// UI variables
const canvas = document.querySelector("#canvas");
const sizeDisplay = document.querySelector(".canvasSize");
const sliderValue = document.querySelector("#sizeSlider");
const colorModeBtn = document.querySelector('#colorMode');
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
    currentMode = newMode;
};

function changeSize (canvasSize) {
    changeCurrentSize(canvasSize);
    updateSizeDisplay(canvasSize);
    resetCanvas();
};

function updateSizeDisplay (value) {
    sizeDisplay.textContent = `${value} x ${value}`;
};

function resetCanvas () {
    clearCanvas();
    setupCanvas(currentSize);
};

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

function changeColor (e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    if (currentMode === 'color') {
        e.target.style.backgroundColor = currentColor;
    } else if (currentMode === 'eraser') {
        e.target.style.backgroundColor = '#ffffff';
    };
};

window.onload = () => {
    setupCanvas(DEFAULT_SIZE);
    updateSizeDisplay(DEFAULT_SIZE);
};