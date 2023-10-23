import { useRef } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../Features/todo/todoSlice";
import Button from "./Shared/Button";

const AddTodoForm = () => {
  const dispatch = useDispatch();
  const todoTitleInputRef = useRef<HTMLInputElement>(null);
  return (
    <form
      className={`mt-3 mb-4 `}
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(addTodo(todoTitleInputRef.current?.value));
        if (todoTitleInputRef.current) todoTitleInputRef.current.value = "";
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
        className="border border-text-400 w-full my-4 h-9 rounded-lg px-2 md:w-11/12"
        ref={todoTitleInputRef}
      />
      <br />
      <Button
        type="submit"
        className="bg-primary-700 text-text-100 w-full md:w-11/12"
      >
        Submit
      </Button>
    </form>
  );
};

export default AddTodoForm;
