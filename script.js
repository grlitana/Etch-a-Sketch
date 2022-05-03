// Default Values
const defaultSize = "50";
const defaultColor = "rgb(0,0,0)";
const defaultBGColor = "rgb(255,255,255)";
const defaultMode = "normalPen";

// Initial Values
let currentSize = defaultSize;
let currentColor = defaultColor;
let currentBGColor = defaultBGColor;
let currentMode = defaultMode;
let mouseDown = false;

// Set element variables
const grid = document.getElementById("grid");
const colorSelect = document.getElementById("colorSelect");
const bgColorSelect = document.getElementById("bgColorSelect");
const normalPenBtn = document.getElementById("normalPenBtn");
const eraserBtn = document.getElementById("eraserBtn");
const rainbowBtn = document.getElementById("rainbowBtn");
const clearBtn = document.getElementById("clearBtn");
const sizeSlider = document.getElementById("sizeSlider");
const gridSizeVal = document.getElementById("gridSize");

// Event listeners
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

colorSelect.onchange = (e) => changeColor(e.target.value);
bgColorSelect.onchange = (e) => changeBGColor(e.target.value);
normalPenBtn.onclick = () => setCurrentMode("normalPen");
eraserBtn.onclick = () => setCurrentMode("eraser");
rainbowBtn.onclick = () => setCurrentMode("rainbow");
clearBtn.onclick = () => clearGrid();
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);
sizeSlider.onchange = (e) => changeGridSize(e.target.value);

// On Initialize
window.onload = () => {
  setGrid(defaultSize);
  updateSizeValue(defaultSize);
  changeBGColor(defaultBGColor);
  toggleActiveMode(defaultMode);
};

// SETTING UP GRID //
function setGrid(size) {
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const gridElement = document.createElement("div");
    gridElement.classList.add("grid-element");
    gridElement.style.backgroundColor = currentBGColor;
    gridElement.addEventListener("mouseover", setColor);
    gridElement.addEventListener("mousedown", setColor);
    grid.appendChild(gridElement);
  }
}

function setColor(e) {
  if (e.type === "mouseover" && !mouseDown) return;

  switch (currentMode) {
    case "normalPen":
      e.target.style.backgroundColor = currentColor;
      break;
    case "eraser":
      e.target.style.backgroundColor = currentBGColor;
      break;
    case "rainbow":
      const randomR = Math.floor(Math.random() * 256);
      const randomG = Math.floor(Math.random() * 256);
      const randomB = Math.floor(Math.random() * 256);
      e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
      break;
  }
}

function clearGrid() {
  grid.innerHTML = "";
  setGrid(currentSize);
}

function changeGridSize(size) {
  currentSize = size;
  clearGrid();
}

function updateSizeValue(size) {
  gridSizeVal.textContent = "Grid Size: " + size + " x " + size;
}


// COLOR PALETTE //
function changeColor(color) {
  currentColor = color;
  setCurrentMode("normalPen");
}

function changeBGColor(color) {
  const gridElement = document.querySelectorAll(".grid-element");
  gridElement.forEach((element) => {
    if (rgb2hex(element.style.backgroundColor) == currentBGColor) {
      element.style.backgroundColor = `${color}`;
    }
  });
  currentBGColor = rgb2hex(color);
}

//converts rgb to hexadecimal
function rgb2hex(rgb) {
  if (/^#[0-9A-F]{6}$/i.test(rgb)) return rgb;

  rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  function hex(x) {
    return ("0" + parseInt(x).toString(16)).slice(-2);
  }
  return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}


// MODES //
function setCurrentMode(newMode) {
  toggleActiveMode(newMode);
  currentMode = newMode;
}

function toggleActiveMode(newMode) {
  switch (currentMode) {
    case "normalPen":
      normalPenBtn.classList.remove("active");
      break;
    case "eraser":
      eraserBtn.classList.remove("active");
      break;
    case "rainbow":
      rainbowBtn.classList.remove("active");
      break;
  }

  switch (newMode) {
    case "normalPen":
      normalPenBtn.classList.add("active");
      break;
    case "eraser":
      eraserBtn.classList.add("active");
      break;
    case "rainbow":
      rainbowBtn.classList.add("active");
      break;
  }
}
