import { useSelector } from "react-redux";
import { RootState } from "../Features/Store";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const todos = useSelector((state: RootState) => state.todos);

  if (!todos.length) return <h2>Wow! You've completed all your tasks 😍</h2>;
  return (
    <div>
      <h2 className="mb-4">TodoList</h2>

      <ul className="border py-5 rounded-xl border-text-400">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            {...todo}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
