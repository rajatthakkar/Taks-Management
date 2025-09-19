import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchTasks } from "./tasksThunks";
import {
  loadTasksFromLocalStorage,
  saveTasksToLocalStorage,
} from "../utils/localStorageUtils";
export interface Task {
  id: number;
  title: string;
  priority: string;
  assignee: string;
  description: string;
  status: "To Do" | "In Progress" | "Done";
}

interface TasksState {
  items: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  items: loadTasksFromLocalStorage(),
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.items.push(action.payload);
      saveTasksToLocalStorage(state.items);
    },

    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.items.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
        saveTasksToLocalStorage(state.items);
      }
    },

    deleteTask: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
      saveTasksToLocalStorage(state.items);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        const localTasks = loadTasksFromLocalStorage();
        state.items = localTasks.length > 0 ? localTasks : action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to load tasks";
      });
  },
});

export const { addTask, updateTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
