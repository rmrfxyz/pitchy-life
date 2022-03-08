import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "app/store";
import { Universe, Cell } from "pitchy-life";

// universe is not serializable so 
// it cannot be part of the slice
// TODO: find a better way to handle it
const universe = Universe.new();

interface LifeState {
  evolving: boolean,
  cellBase: any, // TODO: type
  gridBase: any, // TODO: type
}

let defaultCell = {
  ...Cell,
  size: 5,
  aliveColor: "#000",
  deadColor: "#fff",
};

let defaultGrid = {
  borderWidth: 1,
  color: "#ccc",
};

const initialState: LifeState = {
  evolving: false,
  cellBase: defaultCell,
  gridBase: defaultGrid,
}

export const lifeSlice = createSlice({
  name: 'life',
  initialState,
  reducers: {
    startEvolve: (state) => {
      console.dir('startEvolve ', state)
      state.evolving = true;
    },
    stopEvolve: (state) => {
      console.dir('stopEvolve ', state)
      state.evolving = false;
    },
    shuffle: () => {
      universe.shuffle();
    },
    uniTick: (state) => {
      // this does not actually change the state, 
      // since the cells are read straight from 
      // wasm shared memory. 
      // Should probably move it somewhere else.
      universe.tick();
    }
  },
});

export const { 
  shuffle,
  startEvolve,
  stopEvolve,
  uniTick,
} = lifeSlice.actions;

export const selectIsEvolving = (state: RootState) => {
  return state.life.evolving
};

export const selectUniverseXY = (state: RootState) => {
  return {
    x: universe.width(),
    y: universe.height()
  }
};
export const selectUniverseCells = () => {
  // should this be a selector? Maybe move
  return universe.cells();
};

export const selectCellBase = (state: RootState) => {
  return state.life.cellBase;
};
export const selectGridBase = (state: RootState) => {
  return state.life.gridBase;
};

export default lifeSlice.reducer;

