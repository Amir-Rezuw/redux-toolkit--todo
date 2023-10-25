import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Features/Store";
import { deleteTodo, toggleTodoCompletion } from "../Features/todo/todoSlice";
import Button from "./Shared/Button";

interface IProps {
  id: string;
  title: string;
  isCompleted: boolean;
  index: number;
}
const TodoItem: FC<IProps> = ({ id, title, isCompleted, index }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, data } = useSelector((state: RootState) => ({
    isLoading: state.isLoading,
    data: state.todoList,
  }));
  return (
    <li
      className={`border-b border-text-400 py-2 first:pt-0 last:border-none last:pb-0`}
    >
      <div className="flex justify-between px-2">
        <div className="flex items-center ">
          <input
            onChange={() =>
              dispatch(toggleTodoCompletion({ data, toggledTodoId: id }))
            }
            type="checkbox"
            className="mr-3"
          />
          <span className={`${isCompleted && "line-through"}`}>{title}</span>
        </div>
        <div className="text-text-100">
          <Button
            className={`bg-danger text-text-100${isLoading && "opacity-50"}`}
            type="button"
            onClick={() => {
              dispatch(deleteTodo({ stringId: id, removedItemIndex: index }));
            }}
            disabled={isLoading}
          >
            Delete
          </Button>
          <Button
            className={`bg-warning text-text-100 m-1 ${
              isLoading && "opacity-50"
            }`}
            type="button"
            disabled={isLoading}
          >
            Edit
          </Button>
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
