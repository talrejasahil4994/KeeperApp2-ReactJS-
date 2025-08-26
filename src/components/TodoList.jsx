import React from "react";
import TodoItem from "./TodoItem";

function TodoList({ todos, onToggleTodo, onEditTodo, onDeleteTodo, onMoveTodo }) {
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const pendingTodos = totalTodos - completedTodos;

  return (
    <div className="todos-container">
      <div className="todo-stats">
        <span className="stat-item">
          <span>Total: </span>
          <span>{totalTodos}</span>
        </span>
        <span className="stat-item">
          <span>Completed: </span>
          <span>{completedTodos}</span>
        </span>
        <span className="stat-item">
          <span>Pending: </span>
          <span>{pendingTodos}</span>
        </span>
      </div>

      {todos.map((todo, index) => (
        <TodoItem
          key={todo.id}
          index={index}
          todo={todo}
          onToggle={onToggleTodo}
          onEdit={onEditTodo}
          onDelete={onDeleteTodo}
          onMove={onMoveTodo}
        />
      ))}
    </div>
  );
}

export default TodoList;