import React from "react";

export default function Todo({ todo, toggleTodo }) {
  function handleTodoCheck() {
    toggleTodo(todo.id);
  }
  return (
    <div className="todo__item">
      <input
        type="checkbox"
        id={todo.id}
        checked={todo.complete}
        onChange={handleTodoCheck}
      />
      <label htmlFor={todo.id}>
        <span className="custom__checkbox"></span>
        {todo.name}
      </label>
    </div>
  );
}
