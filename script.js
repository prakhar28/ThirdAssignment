// Get references to HTML elements
const gridContainer = document.getElementById('grid');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const clearButton = document.getElementById('clearButton');
const widthInput = document.getElementById('widthInput');
const heightInput = document.getElementById('heightInput');
const resizeButton = document.getElementById('resizeButton');

// Initial grid size and game state
let gridSize = { width: 20, height: 20 };
let grid = createGrid(gridSize.width, gridSize.height);
let isRunning = false;
let intervalId;
const MaxHeight = MaxWidth = 1000; // Maximum allowed width and height

// Initialize the grid
initializeGrid();

// Check for URL query parameters and update grid size
const urlParams = new URLSearchParams(window.location.search);
const urlWidth = urlParams.get('width');
const urlHeight = urlParams.get('height');

if (urlWidth && urlHeight) {
    // Update grid size from URL parameters
    gridSize = { width: parseInt(urlWidth), height: parseInt(urlHeight) };
    widthInput.value = gridSize.width;
    heightInput.value = gridSize.height;
    grid = createGrid(gridSize.width, gridSize.height);
    renderGrid();
    updateURL();
}

// Function to initialize the grid
function initializeGrid() {
    gridContainer.style.setProperty('--width', gridSize.width);
    renderGrid();
}

// Function to update URL query parameters
function updateURL() {
    const newWidth = widthInput.value;
    const newHeight = heightInput.value;

    if (!isNaN(newWidth) && !isNaN(newHeight) && newWidth >= 0 && newHeight >= 0 && newWidth <= MaxWidth && newHeight <= MaxHeight) {
        // Ensure non-negative values and limit the size (adjust the limits as needed)

        // Update URL query parameters
        const newURL = new URL(window.location);
        newURL.searchParams.set('width', newWidth);
        newURL.searchParams.set('height', newHeight);
        history.pushState({}, '', newURL);

        // If the game is running, pause it
        if (isRunning) {
            pauseGame();
        }
    } else {
        // Reset input values to current grid size for invalid input
        widthInput.value = gridSize.width;
        heightInput.value = gridSize.height;
    }
}

// Event handlers for button clicks
startButton.addEventListener('click', startGame);
pauseButton.addEventListener('click', pauseGame);
clearButton.addEventListener('click', clearGrid);
resizeButton.addEventListener('click', resizeGrid);

// Event handler for grid cell clicks
gridContainer.addEventListener('click', (e) => {
    if (!isRunning) {
        const cell = e.target;
        toggleCell(cell);
    }
});

// Function to create an empty grid
function createGrid(width, height) {
    const newGrid = [];
    for (let y = 0; y < height; y++) {
        const row = [];
        for (let x = 0; x < width; x++) {
            row.push(false); // Initially, all cells are dead
        }
        newGrid.push(row);
    }
    return newGrid;
}

// Function to render the grid in the UI
function renderGrid() {
    gridContainer.style.setProperty('--width', gridSize.width);
    gridContainer.innerHTML = '';

    for (let y = 0; y < gridSize.height; y++) {
        for (let x = 0; x < gridSize.width; x++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            if (grid[y][x]) {
                cell.style.backgroundColor = 'black'; // Alive
            }
            gridContainer.appendChild(cell);
        }
    }
}

// Function to toggle the state of a grid cell (alive/dead)
function toggleCell(cell) {
    const index = Array.from(cell.parentNode.children).indexOf(cell);
    const y = Math.floor(index / gridSize.width);
    const x = index % gridSize.width;
    grid[y][x] = !grid[y][x];
    cell.style.backgroundColor = grid[y][x] ? 'black' : 'white';
}

// Function to start the game
function startGame() {
    isRunning = true;
    startButton.disabled = true;
    pauseButton.disabled = false;
    clearButton.disabled = true;
    intervalId = setInterval(updateGrid, 1000);
}

// Function to pause the game
function pauseGame() {
    isRunning = false;
    startButton.disabled = false;
    pauseButton.disabled = true;
    clearButton.disabled = false;
    clearInterval(intervalId);
}

// Function to clear the grid
function clearGrid() {
    grid = createGrid(gridSize.width, gridSize.height);
    renderGrid();
}

// Function to resize the grid
function resizeGrid() {
    const newWidth = parseInt(widthInput.value);
    const newHeight = parseInt(heightInput.value);

    if (!isNaN(newWidth) && !isNaN(newHeight) && newWidth >= 0 && newHeight >= 0 && newWidth <= MaxWidth && newHeight <= MaxHeight) {
        gridSize = { width: newWidth, height: newHeight };
        grid = createGrid(newWidth, newHeight);
        renderGrid();
        updateURL();
    } else {
        // Reset input values to current grid size for invalid input
        widthInput.value = gridSize.width;
        heightInput.value = gridSize.height;
    }
}

// Function to update the grid based on Conway's Game of Life rules
function updateGrid() {
    const newGrid = createGrid(gridSize.width, gridSize.height);

    for (let y = 0; y < gridSize.height; y++) {
        for (let x = 0; x < gridSize.width; x++) {
            const neighbors = countLiveNeighbors(x, y);
            if (grid[y][x]) {
                // Cell is alive
                if (neighbors === 2 || neighbors === 3) {
                    newGrid[y][x] = true;
                }
            } else {
                // Cell is dead
                if (neighbors === 3) {
                    newGrid[y][x] = true;
                }
            }
        }
    }

    grid = newGrid;
    renderGrid();
}

// Function to count the number of live neighbors for a cell
function countLiveNeighbors(x, y) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const newX = x + i;
            const newY = y + j;

            if (i === 0 && j === 0) continue;
            if (newX >= 0 && newX < gridSize.width && newY >= 0 && newY < gridSize.height) {
                if (grid[newY][newX]) {
                    count++;
                }
            }
        }
    }
    return count;
}
