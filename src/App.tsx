import { Provider } from "react-redux";
import "./App.css";
import AddTodoForm from "./Components/AddTodoForm";
import TodoList from "./Components/TodoList";
import store from "./Features/Store";

const App = () => {
  return (
    <Provider store={store}>
      <div className="px-1 md:px-10">
        <h1 className="text-center font-bold text-5xl my-5 md:text-left">
          RTK - TODO App
        </h1>
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="w-full md:w-9/12">
            <AddTodoForm />
          </div>
          <div className="w-full md:w-3/12">
            <TodoList />
          </div>
        </div>
      </div>
    </Provider>
  );
};

export default App;
