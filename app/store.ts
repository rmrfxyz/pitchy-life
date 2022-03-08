import { configureStore } from "@reduxjs/toolkit";
import { createListenerMiddleware } from "@rtk-incubator/action-listener-middleware";

import lifeReducer from "@features/life/slice";

const listenerMiddleware = createListenerMiddleware();

export const store = configureStore({
    reducer: {
        life: lifeReducer,
        // ctrlPanel: ctrlPanelReducer,
        // perfPanel: perfPanelReducer,  
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().prepend(listenerMiddleware.middleware)
    },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;
