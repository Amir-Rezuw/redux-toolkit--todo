import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { child, get, ref, set } from "firebase/database";
import { toast } from "react-toastify";
import { db } from "../../Env/firebase";
import { ITodo } from "../../Types/Common";
const initialState: ITodoSlice = {
  todoList: [],
  isLoading: false,
  error: null,
};
export const getTodoList = createAsyncThunk(
  "todoList/get",
  async (_, { fulfillWithValue }) => {
    try {
      const dbRef = ref(db);
      const data = get(child(dbRef, `data`)).then((snapshot) => {
        return snapshot.val();
      });
      return fulfillWithValue(await data);
    } catch (error) {
      toast.error((error as AxiosError).message);
    }
  }
);
export const addToDbTodoList = createAsyncThunk(
  "todoList/add",
  async (
    payload: { data: ITodo[]; currentlyAdded: ITodo },
    { fulfillWithValue }
  ) => {
    try {
      set(ref(db), {
        data: payload.data,
      });
      return fulfillWithValue({
        currentData: payload.data,
        newTodo: payload.currentlyAdded,
      });
    } catch (error) {
      toast.error((error as AxiosError).message);
    }
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    toggleCompletion: (state, action) => {
      const selectedTodo = state.todoList.find(
        (todo) => todo.id === action.payload
      );

      if (selectedTodo) {
        selectedTodo.isCompleted = !selectedTodo?.isCompleted;
      }
    },
    deleteTodo: (state, action) => {
      state.todoList = state.todoList.filter(
        (todo) => todo.id !== action.payload
      );
    },
  },
  extraReducers: {
    [getTodoList.pending.toString()]: (state) => {
      state.error = null;
      state.isLoading = true;
      state.todoList = [];
    },
    [getTodoList.fulfilled.toString()]: (state, action) => {
      state.error = null;
      state.isLoading = false;
      state.todoList = action.payload;
    },
    [getTodoList.rejected.toString()]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.todoList = [];
    },
    [addToDbTodoList.pending.toString()]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [addToDbTodoList.fulfilled.toString()]: (state, action) => {
      state.isLoading = false;
      state.error = null;
      console.log(action.payload);

      state.todoList = [...action.payload.currentData];
    },
  },
});
export const { deleteTodo, toggleCompletion } = todoSlice.actions;
export default todoSlice.reducer;
interface ITodoSlice {
  todoList: ITodo[];
  isLoading: boolean;
  error: string | null;
}
