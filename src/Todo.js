import React from "react";

export default function Todo({ todo, toggleTodo }) {
  function handleTodoCheck() {
    toggleTodo(todo.id);
  }
  return (
    <div className="todo__item">
      <label className="todo__label">
        <input
          className="todo__checkbox"
          type="checkbox"
          checked={todo.complete}
          onChange={handleTodoCheck}
        />
        {todo.name}
      </label>
    </div>
  );
}
