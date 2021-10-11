import React, { useState, useRef, useEffect } from "react";
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

  const [list, setList] = useState(todos);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    setList(todos);
  }, [setList, todos]);

  const dragItem = useRef();
  const dragItemNode = useRef();

  const handletDragStart = (e, item) => {
    console.log("Starting to drag", item);

    dragItemNode.current = e.target;
    dragItemNode.current.addEventListener("dragend", handleDragEnd);
    dragItem.current = item;

    setTimeout(() => {
      setDragging(true);
    }, 0);
  };
  const handleDragEnter = (e, targetItem) => {
    console.log("Entering a drag target", targetItem);
    if (dragItemNode.current !== e.target) {
      console.log("Target is NOT the same as dragged item");
      setTodos((oldList) => {
        let newList = JSON.parse(JSON.stringify(oldList));

        newList.splice(targetItem, 0, newList.splice(dragItem.current, 1)[0]);
        dragItem.current = targetItem;
        console.log(newList);
        // localStorage.setItem("List", JSON.stringify(newList));
        return newList;
      });
    }
  };
  const handleDragEnd = (e) => {
    setDragging(false);
    dragItem.current = null;
    dragItemNode.current.removeEventListener("dragend", handleDragEnd);
    dragItemNode.current = null;
  };
  const getStyles = (item) => {
    if (dragItem.current === item) {
      return "todo__item current";
    }
    return "todo__item";
  };

  if (list) {
    return (
      <div className="list__container">
        {todos.filter(FILTER_MAP[filter]).map((todo, todoI) => {
          return (
            <Todo
              key={todo.id}
              todo={todo}
              todoI={todoI}
              toggleTodo={toggleTodo}
              setTodos={setTodos}
              dragging={dragging}
              handletDragStart={handletDragStart}
              getStyles={getStyles}
              handleDragEnd={handleDragEnd}
              handleDragEnter={handleDragEnter}
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
      </div>
    );
  } else {
    return null;
  }
}
