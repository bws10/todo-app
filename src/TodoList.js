import React, { useState } from "react";
import Todo from "./Todo";
import FilterButton from "./FilterButton";

const FILTER_MAP = {
  All: () => true,
  Active: (todo) => !todo.complete,
  Completed: (todo) => todo.complete,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

export default function TodoList({ todos, toggleTodo, setTodos }) {
  const [filter, setFilter] = useState("All");
  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  function handleClearCompleted() {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
    setFilter("All");
  }

  return (
    <>
      <ul>
        {todos.filter(FILTER_MAP[filter]).map((todo) => {
          return (
            <li key={todo.id}>
              <Todo todo={todo} toggleTodo={toggleTodo} setTodos={setTodos} />
            </li>
          );
        })}
      </ul>
      <div className="items__left">
        {todos.filter((todo) => !todo.complete).length} items left
      </div>
      {filterList}
      <button className="btn__clear" onClick={handleClearCompleted}>
        Clear Completed
      </button>
    </>
  );
}
