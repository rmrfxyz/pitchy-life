// import * as React from "react";
import React, { 
  useState, 
  useRef,
  useLayoutEffect,
  useContext
} from "react";

import { memory } from "pitchy-life/index_bg.wasm";

import {CanvasContext} from "@contexts/canvasContext";
let ctxCanv = null as any; //useContext(CanvasContext);
let ctx2d = null as any;
let uniW = 0 as number;
let uniH = 0 as number;


const applyFillRect = (row:number, col:number) => {
  ctx2d.fillRect(
    col * (ctxCanv.cell.size + ctxCanv.grid.borderWidth) + ctxCanv.grid.borderWidth,
    row * (ctxCanv.cell.size + ctxCanv.grid.borderWidth) + ctxCanv.grid.borderWidth,
    ctxCanv.cell.size,
    ctxCanv.cell.size
  )
};

const getIndex = (row:number, column:number) => {
  return row * uniW + column;
};

const drawCells = () => {
  const cellsPtr = ctxCanv.universe.cells();
  const cells = new Uint8Array(memory.buffer, cellsPtr, uniW * uniH);


  ctx2d.beginPath();
  // ctx.fillStyle = bitIsSet(idx, cells)
  //     ? ALIVE_COLOR
  //     : DEAD_COLOR;

  // ctx.fillStyle = cells[idx] === Cell.Alive
  //     ? ALIVE_COLOR
  //     : DEAD_COLOR


  ctx2d.fillStyle = ctxCanv.theme.aliveColor;
  for (let row = 0; row < uniH; row++){
      for (let col = 0; col < uniW; col++){
          const idx = getIndex(row, col);  
          if (cells[idx] !== ctxCanv.cell.Alive) {
            continue;
          }
          applyFillRect(row, col);
      }
  }


  ctx2d.fillStyle = ctxCanv.theme.deadColor;
  for (let row = 0; row < uniH; row++){
      for (let col = 0; col < uniW; col++){
          const idx = getIndex(row, col);  
          if (cells[idx] !== ctxCanv.cell.Dead) {
              continue;
          }
          applyFillRect(row, col);
      }
  }
}

const drawGrid = () => {
  ctx2d.beginPath();
  ctx2d.strokeStyle = ctxCanv.grid.color;

  let bw = ctxCanv.grid.borderWidth;
  let cs = ctxCanv.cell.size;

  for (let i = 0; i <= uniW; i++){
    ctx2d.moveTo(i * (cs + bw) + bw, 0);
    ctx2d.lineTo(i * (cs + bw) + bw, (cs + bw) * uniH + bw);
  }

  for (let j = 0; j <= uniH; j++){
    ctx2d.moveTo(0, j * (cs + bw) + bw);
    ctx2d.lineTo((cs + bw) * uniW + bw, j * (cs + bw) + bw);
  }

  ctx2d.stroke();
}

export default function Canvas(props:any) {
  ctxCanv = useContext(CanvasContext);
  
  // conveninece
  uniW = ctxCanv.universe.width();
  uniH = ctxCanv.universe.height();

  const canvasRef = useRef(null);
  let [willStop, setWillStop] = useState(false);

  let animId = null as number;
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    ctx2d = canvas.getContext('2d');  

    canvas.width = ctxCanv.width;
    canvas.height = ctxCanv.height;

    drawGrid();
    drawCells();

    if(!willStop){

      const renderLoop = () => {
        ctxCanv.universe.tick();

        drawGrid();
        drawCells();

        animId = requestAnimationFrame(renderLoop);
      };

      animId = requestAnimationFrame(renderLoop)
      return () => cancelAnimationFrame(animId);
    }
  }, [ctx2d, ctxCanv, willStop]);
  
  return <canvas ref={canvasRef} {...props}/>
};
