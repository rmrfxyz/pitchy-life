import React, { useRef, useEffect } from 'react';

import Canvas from '../components/Canvas';

// console.dir(Canvas)

// import {Universe, Cell} from "wasm-game-of-life";
// import {memory} from "wasm-game-of-life/wasm_game_of_life_bg";

// const CELL_SIZE = 5;
// const GRID_COLOR = "#ccc";
// const DEAD_COLOR = "#fff";
// const ALIVE_COLOR = "#000";

// const universe = Universe.new();
// const width = universe.width();
// const height = universe.height();

// // const canvas = document.getElementById("game-of-life-canvas");
// // canvas.height = (CELL_SIZE + 1) * height + 1;
// // canvas.width = (CELL_SIZE + 1) * width + 1;

// // const ctx = canvas.getContext('2d');

// const playPauseButton = document.getElementById("play-pause");
// const shuffleButton = document.getElementById("shuffle-btn");
// const clearButton = document.getElementById("clear-btn");
// const ticksPerFrameHTML = document.getElementById("ticks-per-frame");
// let animationId = null;

// const bitIsSet = (n, arr) => {
//     const byte = Math.floor(n / 8);
//     const mask = 1 << (n % 8);
//     return (arr[byte] & mask) === mask;
// }

// const getIndex = (row, column) => {
//     return row * width + column;
// };

// const drawCells = (ctx) => {
//     const cellsPtr = universe.cells();
//     const cells = new Uint8Array(memory.buffer, cellsPtr, width * height);

//     ctx.beginPath();
//     // ctx.fillStyle = bitIsSet(idx, cells)
//     //     ? ALIVE_COLOR
//     //     : DEAD_COLOR;

//     // ctx.fillStyle = cells[idx] === Cell.Alive
//     //     ? ALIVE_COLOR
//     //     : DEAD_COLOR

//     ctx.fillStyle = ALIVE_COLOR;
//     for (let row = 0; row < height; row++){
//         for (let col = 0; col < width; col++){
//             const idx = getIndex(row, col);  
//             if (cells[idx] !== Cell.Alive) {
//                 continue;
//             }

//             ctx.fillRect(
//                 col * (CELL_SIZE + 1) + 1,
//                 row * (CELL_SIZE + 1) + 1,
//                 CELL_SIZE,
//                 CELL_SIZE
//             )
//         }
//     }

//     ctx.fillStyle = DEAD_COLOR;
//     for (let row = 0; row < height; row++){
//         for (let col = 0; col < width; col++){
//             const idx = getIndex(row, col);  
//             if (cells[idx] !== Cell.Dead) {
//                 continue;
//             }

//             ctx.fillRect(
//                 col * (CELL_SIZE + 1) + 1,
//                 row * (CELL_SIZE + 1) + 1,
//                 CELL_SIZE,
//                 CELL_SIZE
//             )
//         }
//     }

// }

// const drawGrid = () => {
//     ctx.beginPath();
//     ctx.strokeStyle = GRID_COLOR;

//     for (let i = 0; i <= width; i++){
//         ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);
//         ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);
//     }

//     for (let j = 0; j <= height; j++){
//         ctx.moveTo(0, j * (CELL_SIZE + 1) + 1);
//         ctx.lineTo((CELL_SIZE +   1) * width +   1, j * (CELL_SIZE + 1) + 1);
//     }

//     ctx.stroke();
// }

// const renderLoop = () => {
//     fps.render();

//     for(let i=0;i<ticksPerFrameHTML.value;i++){
//         universe.tick();
//     }

//     drawGrid();
//     drawCells();

//     animationId = requestAnimationFrame(renderLoop);
// };

// const isPaused = () => {
//     return animationId === null;
// };

// const play = () => {
//     playPauseButton.textContent = "⏸";
//     renderLoop();
// }

// const pause = () => {
//     playPauseButton.textContent = "▶";
//     cancelAnimationFrame(animationId);
//     animationId = null;
// };

// playPauseButton.addEventListener("click", (evt) => {
//     if(isPaused()){
//         play();
//     }else{
//         pause();
//     }
// });

// canvas.addEventListener("click", (evt) => {
//     const boundingRect = canvas.getBoundingClientRect();

//     const scaleX = canvas.width / boundingRect.width;
//     const scaleY = canvas.height / boundingRect.height;

//     const canvasLeft = (evt.clientX - boundingRect.left) * scaleX;
//     const canvasTop = (evt.clientY - boundingRect.top) * scaleY;

//     const row = Math.min(Math.floor(canvasTop / (CELL_SIZE + 1)), height - 1);
//     const col = Math.min(Math.floor(canvasLeft / (CELL_SIZE + 1)), width - 1);

//     universe.toggle_cell(row, col);

//     drawGrid();
//     drawCells();
// });

// clearButton.addEventListener("click", (evt) => {
//     universe.set_width(universe.width());
//     drawGrid();
//     drawCells();
// });

// shuffleButton.addEventListener("click", (evt) => {
//     universe.shuffle();
//     drawGrid();
//     drawCells();
// });

// drawGrid();
// drawCells();

// playPauseButton.textContent = "▶";

// // const fps = new class {
// //     constructor() {
// //         this.fps = document.getElementById("fps");
// //         this.frames = [];
// //         this.lastFrameTimeStamp = performance.now();
// //     }

// //     render() {
// //         const now = performance.now();
// //         const delta = now - this.lastFrameTimeStamp;
// //         this.lastFrameTimeStamp = now;
// //         const fps = 1 / delta * 1000;

// //         this.frames.push(fps);
// //         if(this.frames.length > 100) {
// //             this.frames.shift();
// //         }

// //         let min = Infinity;
// //         let max = -Infinity;
// //         let sum = 0;
// //         for (let i=0; i< this.frames.length; i++){
// //             sum += this.frames[i];
// //             min = Math.min(this.frames[i], min);
// //             max = Math.max(this.frames[i], max);
// //         }
// //         let mean = sum /this.frames.length;

// //         this.fps.textContent = `
// //         Frames per second:
// //                  latest = ${Math.round(fps)}
// //         avg of last 100 = ${Math.round(mean)}
// //         min of last 100 = ${Math.round(min)}
// //         max of last 100 = ${Math.round(max)}
// //         `.trim();
// //     }
// // };


// const Canvas = props => {
//     const canvasRef = useRef(null)

//     useEffect(() => {
//         const canvas = canvasRef.current
//         const context = canvas.getContext('2d');

//         canvas.height = (CELL_SIZE + 1) * height + 1;
//         canvas.width = (CELL_SIZE + 1) * width + 1;



//     }, [])

//     return <canvas ref={canvasRef} {...props}/>
// }

// export default Canvas

    
// <button id="play-pause"></button>
// <button id="shuffle-btn">shuffle</button>
// <button id="clear-btn">clear</button>
// <input id="ticks-per-frame" type="range" min="1" max="10" step="1" value="1" />
// <div id="fps"></div>

// <canvas id="game-of-life-canvas"></canvas>
