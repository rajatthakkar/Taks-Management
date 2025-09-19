import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Task } from "./tasksSlice";

export const fetchTasks = createAsyncThunk<Task[]>(
  "tasks/fetchTasks",
  async () => {
    const response = await axios.get<Task[]>("/tasks.json");
    return response.data;
  }
);
