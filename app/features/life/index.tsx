// import * as React from "react";
import React, { 
  useState, 
  useRef,
  useLayoutEffect,
  // useContext
} from "react";

import { memory } from "pitchy-life/index_bg.wasm";
// import {CanvasContext} from "@contexts/canvasContext";

import { 
  toggleEvolve,
  uniTick,
  selectCellBase,
  selectGridBase,
  selectIsEvolving,
  selectUniverseCells,
  selectUniverseXY,
} from "./slice";
import { 
    useAppDispatch, 
    useAppSelector 
} from "@root/hooks";

let dispatch: any = null;// useAppDispatch();

let cellBase: any = null; // useAppSelector(selectCellBase);
let gridBase: any = null; // useAppSelector(selectGridBase);
let uniXY: any = null; // useAppSelector(selectUniverseXY);

// let ctxCanv = null as any; //useContext(CanvasContext);
let ctx2d = null as any; // TODO: type
// let uniW = 0 as number;
// let uniH = 0 as number;

let uniCells:any;

const applyFillRect = (row:number, col:number) => {
  ctx2d.fillRect(
    col * (cellBase.size + gridBase.borderWidth) + gridBase.borderWidth,
    row * (cellBase.size + gridBase.borderWidth) + gridBase.borderWidth,
    cellBase.size,
    cellBase.size
  )
};

const getIndex = (row:number, column:number) => {
  return row * uniXY.x + column;
};

const drawCells = () => {
  uniCells = selectUniverseCells()
  const cells = new Uint8Array(memory.buffer, uniCells, uniXY.x * uniXY.y);

  ctx2d.beginPath();

  ctx2d.fillStyle = cellBase.aliveColor;
  for (let row = 0; row < uniXY.y; row++){
      for (let col = 0; col < uniXY.x; col++){
          const idx = getIndex(row, col);  
          if (cells[idx] !== cellBase.Alive) {
            continue;
          }
          applyFillRect(row, col);
      }
  }


  ctx2d.fillStyle = cellBase.deadColor;
  for (let row = 0; row < uniXY.y; row++){
      for (let col = 0; col < uniXY.x; col++){
          const idx = getIndex(row, col);  
          if (cells[idx] !== cellBase.Dead) {
              continue;
          }
          applyFillRect(row, col);
      }
  }
}

const drawGrid = () => {
  ctx2d.beginPath();
  ctx2d.strokeStyle = gridBase.color;

  let bw = gridBase.borderWidth;
  let cs = cellBase.size;

  for (let i = 0; i <= uniXY.x; i++){
    ctx2d.moveTo(i * (cs + bw) + bw, 0);
    ctx2d.lineTo(i * (cs + bw) + bw, (cs + bw) * uniXY.y + bw);
  }

  for (let j = 0; j <= uniXY.y; j++){
    ctx2d.moveTo(0, j * (cs + bw) + bw);
    ctx2d.lineTo((cs + bw) * uniXY.x + bw, j * (cs + bw) + bw);
  }

  ctx2d.stroke();
}

const getCanvasWidth = () => {
  return (cellBase.size + gridBase.borderWidth) * uniXY.x + gridBase.borderWidth;
}

const getCanvasHeight = () => {
  return (cellBase.size + gridBase.borderWidth) * uniXY.y + gridBase.borderWidth;
}

export default function LifeCanvas(props:any) {
  const canvasRef = useRef(null);

  dispatch = useAppDispatch();
  cellBase = useAppSelector(selectCellBase);
  gridBase = useAppSelector(selectGridBase);
  uniXY = useAppSelector(selectUniverseXY);

  let [willStop, setWillStop] = useState(false);

  let animId = null as number;
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    ctx2d = canvas.getContext('2d');  

    canvas.width = getCanvasWidth();
    canvas.height = getCanvasHeight();

    drawGrid();
    drawCells();

    if(!willStop){

      const renderLoop = () => {
        dispatch(uniTick());

        drawGrid();
        drawCells();

        animId = requestAnimationFrame(renderLoop);
      };

      animId = requestAnimationFrame(renderLoop)
      return () => cancelAnimationFrame(animId);
    }
  }, [ctx2d, willStop]);
  
  return <canvas ref={canvasRef} {...props}/>
};
