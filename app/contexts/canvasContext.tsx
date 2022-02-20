import React from "react";
import {Universe, Cell} from "pitchy-life";

const universe = Universe.new();

// console.dir(universe);

export const themes = {
    light: {
        aliveColor: "#fff",
        deadColor: "#000",
    },
    dark: {
        aliveColor: "#000",
        deadColor: "#fff",
    }
};

let defaultCell = {
    ...Cell,
    size: 5
};

let defaultGrid = {
    borderWidth: 1,
    color: "#ccc",
};

const getCanvasWidth = () => {
    return (defaultCell.size + defaultGrid.borderWidth) * universe.width() + defaultGrid.borderWidth;
}

const getCanvasHeight = () => {
    return (defaultCell.size + defaultGrid.borderWidth) * universe.height() + defaultGrid.borderWidth;
}

let defaultCanvas = {
    cell: defaultCell,
    grid: defaultGrid,
    height: getCanvasHeight(),
    theme: themes.dark,
    universe: universe,
    width: getCanvasWidth(),
}

export const CanvasContext = React.createContext(defaultCanvas);