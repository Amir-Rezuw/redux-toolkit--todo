import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Features/Store";

import { getTodoList } from "../Features/todo/todoSlice";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const { todoList } = useSelector((state: RootState) => state);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getTodoList());
  }, [dispatch]);
  if (!todoList?.length)
    return <h2>Wow! You've completed all your tasks 😍</h2>;
  return (
    <div>
      <h2 className="mb-4">TodoList</h2>
      <ul className="border py-5 rounded-xl border-text-400">
        {todoList.map((todo, index) => (
          <TodoItem
            key={todo.id}
            {...todo}
            index={index}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
