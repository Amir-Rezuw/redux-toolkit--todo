import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";
import { AppDispatch, RootState } from "../Features/Store";
import { addToDbTodoList } from "../Features/todo/todoSlice";
import { ITodo } from "../Types/Common";
import Button from "./Shared/Button";

const AddTodoForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, currentData } = useSelector((state: RootState) => ({
    isLoading: state.isLoading,
    currentData: state.todoList,
  }));

  const todoTitleInputRef = useRef<HTMLInputElement>(null);
  return (
    <form
      className={`mt-3 mb-4 `}
      onSubmit={(e) => {
        e.preventDefault();
        if (!todoTitleInputRef.current?.value) {
          todoTitleInputRef.current?.classList.add("border-danger");
          toast.error("Please enter a title for your todo");
          return;
        }
        const newTodo: ITodo = {
          id: uuid(),
          isCompleted: false,
          title: todoTitleInputRef.current.value,
        };
        dispatch(
          addToDbTodoList({
            data: [...(currentData ?? []), newTodo],
            currentlyAdded: newTodo,
          })
        );
        todoTitleInputRef.current.value = "";
      }}
    >
      <label
        htmlFor="name"
        className="mb-1 text-text-700"
      >
        Name
      </label>
      <br />
      <input
        type="text"
        name="name"
        id="name"
        className="border border-text-400 w-full my-4 h-9 rounded-lg px-2 md:w-11/12 "
        ref={todoTitleInputRef}
      />
      <br />
      <Button
        disabled={isLoading}
        type="submit"
        className={`bg-primary-700 text-text-100 w-full md:w-11/12 ${
          isLoading && "opacity-50"
        }`}
      >
        Submit
      </Button>
    </form>
  );
};

export default AddTodoForm;
