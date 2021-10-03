import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";

const LOCAL_STORAGE_KEY = "todoApp.todos";

export default function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

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

  return (
    <div className="App">
      <h1 className="header">TODO</h1>
      <form className="new__todo" onSubmit={handleNewTodo}>
        <input ref={todoNameRef} type="text" placeholder="Create new todo" />
      </form>
      <TodoList todos={todos} setTodos={setTodos} toggleTodo={toggleTodo} />
    </div>
  );
}