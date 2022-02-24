import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "app/store";
import { Universe, Cell } from "pitchy-life";

interface LifeState {
    evolving: boolean,
    universe: any, // TODO: type
    cellBase: any, // TODO: type
    gridBase: any, // TODO: type
}

const universe = Universe.new();

let defaultCell = {
    ...Cell,
    size: 5,
    aliveColor: "#fff",
    deadColor: "#000",
};

let defaultGrid = {
    borderWidth: 1,
    color: "#ccc",
};

const initialState: LifeState = {
    evolving: false,
    cellBase: defaultCell,
    gridBase: defaultGrid,
    universe: universe,
}

export const lifeSlice = createSlice({
    name: 'life',
    initialState,
    reducers: {
        toggleEvolve: (state) => {
            state.evolving = !state.evolving;
        },
        uniTick: (state) => {
          // this does not actually change the state, 
          // since the cells are read straight from 
          // wasm shared memory. 
          // Should probably move it somewhere else.
          // state.universe.tick();
        }
    }
});

export const { 
  toggleEvolve,
  uniTick,
} = lifeSlice.actions;

export const selectIsEvolving = (state: RootState) => {
  return state.life.evolving
};

export const selectUniverseXY = (state: RootState) => {
  return {
    x: state.life.universe.width,
    y: state.life.universe.height
  }
};
export const selectUniverseCells = (state: RootState) => {
  return state.life.universe.cells();
};

export const selectCellBase = (state: RootState) => {
  return state.life.cellBase;
};
export const selectGridBase = (state: RootState) => {
  return state.life.cellBase;
};


export default lifeSlice.reducer;

