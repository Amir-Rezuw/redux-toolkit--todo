import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { ITodos } from "../../Types/Common";
const initialState: ITodoSlice = {
  todos: [],
};
const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo: ITodos = {
        id: uuid(),
        title: action.payload,
        isCompleted: false,
      };
      state.todos.push(newTodo);
    },
    toggleCompletion: (state, action) => {
      const selectedTodo = state.todos.find(
        (todo) => todo.id === action.payload
      );

      if (selectedTodo) {
        selectedTodo.isCompleted = !selectedTodo?.isCompleted;
      }
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
  },
});
export const { addTodo, deleteTodo, toggleCompletion } = todoSlice.actions;
export default todoSlice.reducer;
interface ITodoSlice {
  todos: ITodos[];
}
