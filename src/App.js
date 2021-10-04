import React, { useState, useRef, useEffect } from "react";
import "./css/App.css";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";
import FilterButton from "./FilterButton";

const LOCAL_STORAGE_KEY = "todoApp.todos";
const FILTER_MAP = {
  All: () => true,
  Active: (todo) => !todo.complete,
  Completed: (todo) => todo.complete,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

export default function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();
  const [filter, setFilter] = useState("All");
  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  const useMatchMedia = (mediaQuery, initialValue) => {
    const [isMatching, setIsMatching] = useState(initialValue);
    useEffect(() => {
      const watcher = window.matchMedia(mediaQuery);
      setIsMatching(watcher.matches);
      const listener = (matches) => {
        setIsMatching(matches.matches);
      };
      if (watcher.addEventListener) {
        watcher.addEventListener("change", listener);
      } else {
        watcher.addListener(listener);
      }
      return () => {
        if (watcher.removeEventListener) {
          return watcher.removeEventListener("change", listener);
        } else {
          return watcher.removeListener(listener);
        }
      };
    }, [mediaQuery]);

    return isMatching;
  };

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedItems) {
      setTodos(storedItems);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleNewTodo(e) {
    e.preventDefault();
    const name = todoNameRef.current.value;
    if (name === "") return;

    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }];
    });

    todoNameRef.current.value = null;
  }

  const isMobileResolution = useMatchMedia("(max-width:665px)", true);

  return (
    <main>
      <div className="App">
        <h1 className="header">TODO</h1>
        <form className="new__todo" onSubmit={handleNewTodo}>
          <label htmlFor="newTodo" className="input__div">
            <span id="newCheck" className="custom__checkbox"></span>
            <input
              id="newTodo"
              ref={todoNameRef}
              type="text"
              placeholder="Create a new todo..."
            />
          </label>
        </form>
        <div className="list__container">
          <TodoList
            FILTER_MAP={FILTER_MAP}
            useMatchMedia={useMatchMedia}
            filter={filter}
            setFilter={setFilter}
            filterList={filterList}
            todos={todos}
            setTodos={setTodos}
            toggleTodo={toggleTodo}
          />
        </div>
        {isMobileResolution && (
          <div className="controls filters">{filterList}</div>
        )}
      </div>
    </main>
  );
}
