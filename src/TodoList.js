import React from "react";
import Todo from "./Todo";

export default function TodoList({
  todos,
  toggleTodo,
  setTodos,
  filter,
  setFilter,
  filterList,
  useMatchMedia,
  FILTER_MAP,
}) {
  const isDesktopResolution = useMatchMedia("(min-width:665px)", true);

  function handleClearCompleted() {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
    setFilter("All");
  }

  return (
    <>
      {todos.filter(FILTER_MAP[filter]).map((todo) => {
        return (
          <Todo
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            setTodos={setTodos}
          />
        );
      })}

      <div className="controls">
        <div className="items__left">
          {todos.filter((todo) => !todo.complete).length} items left
        </div>
        {isDesktopResolution && filterList}
        <button className="btn btn--clear" onClick={handleClearCompleted}>
          Clear Completed
        </button>
      </div>
    </>
  );
}
