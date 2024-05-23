import { createSlice, nanoid } from "@reduxjs/toolkit";

const isLocalStorageAvailable = typeof localStorage !== "undefined";

const storedTasks = isLocalStorageAvailable
  ? JSON.parse(localStorage.getItem("tasks"))
  : [];

const initialState = {
  tasks: storedTasks || [
    {
      id: 1,
      title: "Task 1",
      description: "Learn more about Next.js",
    },
  ],
  selectedTaskId: null,
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    readTask: (state, action) => {
      state.tasks = action.payload;
    },
    addTask: (state, action) => {
      try {
        const { title, description } = action.payload;
        const task = {
          id: nanoid(),
          title,
          description,
        };
        state.tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      } catch (error) {
        console.error("Error adding task:", error);
      }
    },
    updateTask: (state, action) => {
      try {
        const { id, title, description } = action.payload;
        const index = state.tasks.findIndex((task) => task.id === id);

        if (index !== -1) {
          state.tasks[index] = { id, title, description };
          localStorage.setItem("tasks", JSON.stringify(state.tasks));
        }
      } catch (error) {
        console.error("Error updating task:", error);
      }
    },
    deleteTask: (state, action) => {
      try {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    },
    selectTask: (state, action) => {
      state.selectedTaskId = action.payload;
    },
  },
});

export const { readTask, addTask, updateTask, deleteTask, selectTask } =
  taskSlice.actions;

export default taskSlice.reducer;
