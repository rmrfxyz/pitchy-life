import React, { useEffect } from "react";

import { useAppSelector, useAppDispatch } from "@root/hooks";

import { selectIsEvolving } from "@features/life/slice";

export default function CtrlPanel (props: any) {
  
  const dispatch = useAppDispatch();

  const playPause = () => {
    dispatch({type: `life/${isEvolving ? 'stopEvolve' : 'startEvolve'}`});
  };

  const shuffle = () => {
    dispatch({type: "life/shuffle"})
  }

  let isEvolving = useAppSelector(selectIsEvolving);

  return (<div {...props}>
    <button className="playPause"
      onClick={playPause}
    >
      { isEvolving ? "pause ⏸" : "play ▶"}
    </button>

    <button className="shuffleBtn"
      onClick={shuffle}
    >
      shuffle
    </button>
    
    <button className="clearBtn">
      clear
    </button>
    
    <input className="ticksPerFrame"
      type="range" 
      min="1" 
      max="10" 
      step="1" 
      value="1" 
      onChange={(evt) => {console.dir(evt)}}
    />
    
  </div>);
}
