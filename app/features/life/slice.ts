import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "app/store";

interface LifeState {
    alive: boolean
}

const initialState: LifeState = {
    alive: false
}

export const lifeSlice = createSlice({
    name: 'life',
    initialState,
    reducers: {
        toggleStatus: (state) => {
            state.alive = !state.alive;
        }
    }
});

export const { toggleStatus } = lifeSlice.actions;

export const selectIsAlive = (state: RootState) => state.life.alive;

export default lifeSlice.reducer;

