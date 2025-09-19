import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./redux/modalSlice";
import tasksReducer from "./redux/tasksSlice";
export const store = configureStore({
  reducer: {
    modal: modalReducer,
    task: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
