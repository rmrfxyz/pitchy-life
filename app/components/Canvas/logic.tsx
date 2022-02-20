import { useState, useEffect } from "react";
import { memory } from "pitchy-life/index_bg";

// import { adapters } from "adapters/life";
// import { CanvasContext } from "app/contexts/canvasContext";

export const drawCells = (ctx) => {
    const cellsPtr = universe.cells();
    const cells = new Uint8Array(memory.buffer, cellsPtr, width * height);

    ctx.beginPath();
    // ctx.fillStyle = bitIsSet(idx, cells)
    //     ? ALIVE_COLOR
    //     : DEAD_COLOR;

    // ctx.fillStyle = cells[idx] === Cell.Alive
    //     ? ALIVE_COLOR
    //     : DEAD_COLOR

    ctx.fillStyle = ALIVE_COLOR;
    for (let row = 0; row < height; row++){
        for (let col = 0; col < width; col++){
            const idx = getIndex(row, col);  
            if (cells[idx] !== Cell.Alive) {
                continue;
            }

            ctx.fillRect(
                col * (CELL_SIZE + 1) + 1,
                row * (CELL_SIZE + 1) + 1,
                CELL_SIZE,
                CELL_SIZE
            )
        }
    }

    ctx.fillStyle = DEAD_COLOR;
    for (let row = 0; row < height; row++){
        for (let col = 0; col < width; col++){
            const idx = getIndex(row, col);  
            if (cells[idx] !== Cell.Dead) {
                continue;
            }

            ctx.fillRect(
                col * (CELL_SIZE + 1) + 1,
                row * (CELL_SIZE + 1) + 1,
                CELL_SIZE,
                CELL_SIZE
            )
        }
    }
}

export const drawGrid = (ctx, ) => {
    ctx.beginPath();
    ctx.strokeStyle = GRID_COLOR;

    for (let i = 0; i <= width; i++){
        ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);
        ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);
    }

    for (let j = 0; j <= height; j++){
        ctx.moveTo(0, j * (CELL_SIZE + 1) + 1);
        ctx.lineTo((CELL_SIZE +   1) * width +   1, j * (CELL_SIZE + 1) + 1);
    }

    ctx.stroke();
}

