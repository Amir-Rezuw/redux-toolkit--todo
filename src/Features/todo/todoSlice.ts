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
  (payload: { data: ITodo[]; currentlyAdded: ITodo }, { fulfillWithValue }) => {
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
export const deleteTodo = createAsyncThunk(
  "todoList/delete",
  async (
    payload: { stringId: string; removedItemIndex: number },
    { getState, fulfillWithValue }
  ) => {
    try {
      const arrayWithoutDeletedItem = (
        getState() as ITodoSlice
      ).todoList.filter((todo) => todo.id !== payload.stringId);

      set(ref(db), {
        data: arrayWithoutDeletedItem,
      });
      return fulfillWithValue(arrayWithoutDeletedItem);
    } catch (error) {
      toast.error("Error removing data");
    }
  }
);
export const toggleTodoCompletion = createAsyncThunk(
  "todoList/toggleCompletion",
  async (payload: { data: ITodo[]; toggledTodoId: string }, {}) => {
    // const toggledList = state.todoList.map((todo) => {
    //   if (todo.id === payload.id) {

    //   }
    //   return todo;
    // });
    const toggledList = payload.data.map((todo) => {
      if (todo.id === payload.toggledTodoId) {
        todo.isCompleted = !todo.isCompleted;
      }
      return todo;
    });
    // const updates = {};
    // update(ref(db), updates);
  }
);
const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
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
      state.todoList = [...action.payload.currentData];
    },

    [deleteTodo.pending.toString()]: (state) => {
      state.isLoading = true;
    },
    [deleteTodo.fulfilled.toString()]: (state, action) => {
      state.isLoading = false;
      state.todoList = action.payload;
    },
  },
});
export default todoSlice.reducer;
interface ITodoSlice {
  todoList: ITodo[];
  isLoading: boolean;
  error: string | null;
}
