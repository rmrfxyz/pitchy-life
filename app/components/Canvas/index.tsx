// import * as React from "react";
import React, { useState, useRef, useEffect, useLayoutEffect, useContext } from "react";
import {drawCells, drawGrid, renderLoop} from "./logic";

import {CanvasContext} from "@contexts/canvasContext";

export default function Canvas(props:any) {
    
    const canvasRef = useRef(null);
    let [willStop, setWillStop] = useState(true);

    let canvasContext = useContext(CanvasContext);

    let animId = null;
    useLayoutEffect(() => {
      if(!willStop){

        const renderLoop = () => {
          canvasContext.universe.tick();
          animId = requestAnimationFrame(renderLoop)
        };

        animId = requestAnimationFrame(renderLoop)
        return () => cancelAnimationFrame(animId);
      }
    }, [canvasContext, willStop]);
    
    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');  
      
      canvas.width = (canvasContext.cell.size + canvasContext.borderWidth) * canvasContext.universe.width() + canvasContext.borderWidth
      canvas.height = (canvasContext.cell.size + canvasContext.borderWidth) * canvasContext.universe.height() + canvasContext.borderWidth
   

    }, [canvasContext]);

    return <canvas ref={canvasRef} {...props}/>
};
