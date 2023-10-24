import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { env } from "../../Env/env";
import { _API } from "../../Service/API";
import { ITodo } from "../../Types/Common";
const initialState: ITodoSlice = {
  todoList: [],
  isLoading: false,
  error: null,
};
export const getTodoList = createAsyncThunk(
  "todoList/get",
  async (_, { rejectWithValue }) => {
    try {
      return (await axios.get(`${env.baseUrl}todoList.json`)).data;
    } catch (error) {
      toast.error((error as AxiosError).message);
      return rejectWithValue(error);
    }
  }
);
export const addToDbTodoList = createAsyncThunk(
  "todoList/add",
  async (payload: { data: ITodo[] }, { fulfillWithValue }) => {
    try {
      await _API({
        url: "todoList.json",
        data: JSON.stringify(payload),
        method: "post",
      });
      return fulfillWithValue(payload.data);
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
      const arrData = [];
      for (const key in action.payload) {
        arrData.push(...action.payload[key].data);
      }
      state.todoList = arrData;
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
      state.todoList = [...state.todoList, ...action.payload];
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
