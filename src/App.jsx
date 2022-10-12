import { useState } from "react";
import "./App.css";
import Todo from "./components/Todo";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");

  function handleNewTodo(e) {
    e.preventDefault();
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text: todoInput, isChecked: false },
    ]);
    setTodoInput("");
  }

  function deleteTodo(id) {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  }

  function updateTodo(id, text, isChecked) {
    setTodos([
      { id, text, isChecked },
      ...todos.filter((todo) => todo.id !== id),
    ]);
  }

  return (
    <div>
      <form onSubmit={handleNewTodo}>
        <input
          type="text"
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
        />
      </form>

      {todos.map(({ id, text, isChecked }) => {
        return (
          <Todo
            key={id}
            id={id}
            text={text}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
            currentChecked={isChecked}
          />
        );
      })}
    </div>
  );
}

export default App;
