import React, { useState, useEffect } from "react";
import Header from "./Header";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import Footer from "./Footer";

function App() {
  const [todos, setTodos] = useState([]);
  const [theme, setTheme] = useState("light");

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    const savedTheme = localStorage.getItem("theme");

    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    } else {
      // Initialize with sample data
      const sampleTodos = [
        { id: 1, text: "Learn React Hooks", completed: false },
        { id: 2, text: "Build Todo App", completed: true },
        { id: 3, text: "Master Node.js", completed: false }
      ];
      setTodos(sampleTodos);
      localStorage.setItem("todos", JSON.stringify(sampleTodos));
    }

    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Apply theme to body
  useEffect(() => {
    document.body.className = theme === "dark" ? "dark" : "";
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const editTodo = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const moveTodo = (dragIndex, hoverIndex) => {
    const draggedTodo = todos[dragIndex];
    const newTodos = [...todos];
    newTodos.splice(dragIndex, 1);
    newTodos.splice(hoverIndex, 0, draggedTodo);
    setTodos(newTodos);
  };

  return (
    <div>
      <Header theme={theme} onThemeToggle={toggleTheme} />
      <TodoForm onAddTodo={addTodo} />
      <TodoList 
        todos={todos}
        onToggleTodo={toggleTodo}
        onEditTodo={editTodo}
        onDeleteTodo={deleteTodo}
        onMoveTodo={moveTodo}
      />
      <Footer />
    </div>
  );
}

export default App;