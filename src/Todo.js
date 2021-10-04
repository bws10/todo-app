import React from "react";

export default function Todo({ todo, toggleTodo }) {
  function handleTodoCheck() {
    toggleTodo(todo.id);
  }
  return (
    <div onClick={handleTodoCheck} className="todo__item">
      <input
        type="checkbox"
        id={todo.id}
        checked={todo.complete}
        onChange={handleTodoCheck}
      />
      <label>
        <span htmlFor={todo.id} className="custom__checkbox"></span>
        {todo.name}
      </label>
    </div>
  );
}
