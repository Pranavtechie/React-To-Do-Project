import React, { useState, useCallback } from "react";

// TODO : add Ctrl + K hotkey to set the focus to the input field to create a new task
// TODO: persist tasks in local storage.
export default function Todos({
  id,
  text,
  deleteTodo,
  updateTodo,
  currentChecked,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isChecked, setIsChecked] = useState(currentChecked);
  const [todoText, setTodoText] = useState(text);

  const focusInput = useCallback((inputElement) => {
    if (inputElement) {
      inputElement.focus();
      // for setting the cursor to the end of the current text in the input field
      inputElement.selectionStart = todoText.length;
      inputElement.selectionEnd = todoText.length;
    }
  });

  function sendTodoUpdate(e) {
    e?.preventDefault();
    setIsEditing(false);
    updateTodo(id, todoText, isChecked);
  }

  return (
    <>
      <div key={id} style={{ display: "flex" }}>
        <input type="checkbox" onChange={() => setIsChecked((cur) => !cur)} />
        <form onSubmit={sendTodoUpdate}>
          <input
            type="text"
            disabled={isEditing ? false : true}
            ref={focusInput}
            onChange={(e) => setTodoText(e.target.value)}
            style={isChecked ? { textDecoration: "line-through" } : {}}
            value={todoText}
          />
        </form>
      </div>
      <div>
        {isChecked ? (
          ""
        ) : (
          <>
            {isEditing ? (
              ""
            ) : (
              <button onClick={() => setIsEditing(true)}>Edit</button>
            )}
            {isEditing ? (
              <button
                onClick={() => {
                  sendTodoUpdate();
                }}
              >
                Save Changes
              </button>
            ) : (
              ""
            )}
            <button onClick={() => deleteTodo(id)}>Delete</button>
          </>
        )}
      </div>
    </>
  );
}
