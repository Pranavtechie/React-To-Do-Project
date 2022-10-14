import { useState, useCallback, useRef } from "react";
import "./App.css";
import Todo from "./components/Todo";
import { useHotkeys } from "react-hotkeys-hook";
function App() {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");

  const focusInputField = useRef(null);
  const setFocusInput = (event) => {
    event.preventDefault();
    focusInputField.current.focus();
    //TODO : understand why element is re-rendering immediately, figure out how to implement this with useCallBack
    // if (document.activeElement.id === "todo-input") {
    //   focusInputField.current.blur();
    // }
  };

  useHotkeys("ctrl+k, ctrl+K, command+k, command+K", setFocusInput, {
    filterPreventDefault: true,
    enableOnTags: ["INPUT"],
  });

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
          ref={focusInputField}
          type="text"
          id="todo-input"
          value={todoInput}
          autoComplete="off"
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
