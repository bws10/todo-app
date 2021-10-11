import React from "react";

export default function Todo(props) {
  function handleTodoCheck() {
    props.toggleTodo(props.todo.id);
  }
  return (
    <div
      onClick={handleTodoCheck}
      draggable
      key={props.todo.id}
      onDragStart={(e) => props.handletDragStart(e, props.todoI)}
      onDragEnter={
        props.dragging
          ? (e) => {
              props.handleDragEnter(e, props.todoI);
            }
          : null
      }
      className={props.dragging ? props.getStyles(props.todoI) : "todo__item"}
    >
      {/* {console.log(props.todoI)} */}
      <input
        type="checkbox"
        id={props.todo.id}
        checked={props.todo.complete}
        onChange={handleTodoCheck}
      />
      <label>
        <span htmlFor={props.todo.id} className="custom__checkbox"></span>
        {props.todo.name}
      </label>
    </div>
  );
}
