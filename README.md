# Conway's Game of Life

Conway's Game of Life is a cellular automaton devised by mathematician John Conway. It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. The game simulates the life and death of cells on a grid, creating intricate patterns and behaviors.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Acknowledgments](#acknowledgments)

## Introduction

This web-based implementation of Conway's Game of Life allows you to explore the fascinating world of cellular automata. Watch as patterns emerge, evolve, and interact with one another in a dynamic simulation.

## Features

- **Interactive Grid**: Toggle the state of cells by clicking on them.
- **Start and Pause**: Control the simulation with Start and Pause buttons.
- **Clear Grid**: Clear the grid and start with a blank canvas.
- **Grid Resizing**: Change the grid size using input fields (only when the game is paused).
- **URL Parameters**: Customize the initial grid size by adding parameters to the URL.

## Getting Started

1. Clone this repository to your local machine.
2. Open the `index.html` file in a web browser to start the application.
3. Use the provided buttons and grid to interact with the Game of Life.

### URL Parameters

You can specify the initial grid size by adding parameters to the URL. For example, `http://localhost:3000/?width=20&height=20` will set the initial grid size to 32 columns and 48 rows.

## Usage

- Click the "Start" button to begin the simulation. The grid will automatically update according to the rules of Conway's Game of Life.
- Click the "Pause" button to pause the simulation.
- Click the "Clear" button to clear the grid and reset all cells to the dead state.
- Use the input fields to set the width and height of the grid, then click the "Resize" button to apply the changes (only when the game is paused).
- Click on cells in the grid to manually toggle their life state while the game is paused.


## Acknowledgments

- Conway's Game of Life: [Wikipedia](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)