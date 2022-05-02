const grid = document.getElementById("grid");
currentColor = 'black'

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)


function setGrid(size) {
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const gridElement = document.createElement("div");
    gridElement.classList.add("grid-element");
    gridElement.addEventListener('mouseover', setColor)
    gridElement.addEventListener('mousedown', setColor)
    grid.appendChild(gridElement);
  }
}

setGrid("16");

function setColor(e){
    if (e.type === 'mouseover' && !mouseDown) return
    e.target.style.backgroundColor = currentColor
}
