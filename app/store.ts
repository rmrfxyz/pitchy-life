import { configureStore } from "@reduxjs/toolkit";

import lifeReducer from "@features/life/slice";

export const store = configureStore({
    reducer: {
        life: lifeReducer,
        // ctrlPanel: ctrlPanelReducer,
        // perfPanel: perfPanelReducer,  
    },

});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;