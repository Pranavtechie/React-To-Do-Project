import React, { useState } from "react";

export default function Todos({
  id,
  text,
  deleteTodo,
  updateTodo,
  currentChecked,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isChecked, setIsChecked] = useState(currentChecked);

  return (
    <>
      <div key={id} style={{ display: "flex" }}>
        <input type="checkbox" onChange={() => setIsChecked((cur) => !cur)} />
        <p
          contentEditable={isEditing ? true : false}
          style={isChecked ? { textDecoration: "line-through" } : {}}
        >
          {text}&nbsp;&nbsp;&nbsp;
        </p>
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
                  setIsEditing(false);
                  updateTodo(id, text, isChecked);
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
