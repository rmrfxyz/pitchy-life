import React from "react";
import {Universe, Cell} from "pitchy-life";

const universe = Universe.new();

// console.dir(universe);

export const themes = {
    light: {
        borderWidth: 1,
        gridColor: "#ccc",
        aliveColor: "#fff",
        deadColor: "#000",
    },
    dark: {
        borderWidth: 1,
        gridColor: "#ccc",
        aliveColor: "#000",
        deadColor: "#fff",
    }
};

export const CanvasContext = React.createContext({
    universe: universe,
    cell: {
        base: Cell,
        size: 5
    },
    theme: themes.dark,
});