// default setting
const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = "#000000";

// UI variables
const canvas = document.querySelector("#canvas");
const sizeDisplay = document.querySelector(".canvasSize");
const sliderValue = document.querySelector("#sizeSlider");

// UI logic
sliderValue.onmousemove = (e) => updateSizeDisplay(e.target.value);

function updateSizeDisplay (value) {
    sizeDisplay.textContent = `${value} x ${value}`;
};

function setupCanvas (canvasSize) {
    canvas.style.gridTemplateColumns = `repeat(${canvasSize}, 1fr)`;
    canvas.style.gridTemplateRows = `repeat(${canvasSize}, 1fr)`;
};


window.onload = () => {
    setupCanvas(DEFAULT_SIZE);
    sizeDisplay.textContent = `${DEFAULT_SIZE} x ${DEFAULT_SIZE}`;
};