import { FC } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, toggleCompletion } from "../Features/todo/todoSlice";
import Button from "./Shared/Button";

interface IProps {
  id: string;
  title: string;
  isCompleted: boolean;
}
const TodoItem: FC<IProps> = ({ id, title, isCompleted }) => {
  const dispatch = useDispatch();
  return (
    <li
      className={`border-b border-text-400 py-2 first:pt-0 last:border-none last:pb-0`}
    >
      <div className="flex justify-between px-2">
        <div className="flex items-center ">
          <input
            onChange={() => dispatch(toggleCompletion(id))}
            type="checkbox"
            className="mr-3"
          />
          <span className={`${isCompleted && "line-through"}`}>{title}</span>
        </div>

        <Button
          className="bg-danger text-text-100 w-5/12 "
          type="button"
          onClick={() => {
            dispatch(deleteTodo(id));
          }}
        >
          Delete
        </Button>
      </div>
    </li>
  );
};

export default TodoItem;
